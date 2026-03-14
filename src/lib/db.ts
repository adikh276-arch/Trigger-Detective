import { neonConfig, Pool } from '@neondatabase/serverless';
import ws from 'ws';

// Set up WebSocket for use in specialized environments if needed
if (typeof window === 'undefined') {
  neonConfig.webSocketConstructor = ws;
}

// For Vite/browser, it replaces the entire string 'import.meta.env.VITE_DATABASE_URL'
// For Node.js (scripts), it uses process.env
const connectionString = 
  (import.meta.env && import.meta.env.VITE_DATABASE_URL) || 
  process.env.VITE_DATABASE_URL || 
  process.env.DATABASE_URL;

if (!connectionString) {
  console.warn("DATABASE_URL is not defined. Database operations will fail.");
}

export const pool = new Pool({
  connectionString,
});

export const query = async (text: string, params?: any[]) => {
  const client = await pool.connect();
  try {
    return await client.query(text, params);
  } finally {
    client.release();
  }
};

/**
 * Executes the schema SQL to ensure tables exist.
 * Should be called on application startup.
 */
export const initSchema = async () => {
  try {
    // In a real browser environment, we might fetch this file or bundle it.
    // Since we're in a buildable environment, let's just put the schema here or use a known location.
    // For simplicity, I'll use the SQL directly here as well to ensure it runs without external file dependencies in production.
    const schema = `
      CREATE TABLE IF NOT EXISTS users (
          id BIGINT PRIMARY KEY,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS trigger_entries (
          id SERIAL PRIMARY KEY,
          user_id BIGINT REFERENCES users(id) ON DELETE CASCADE,
          urge_level INTEGER NOT NULL,
          location TEXT,
          activity TEXT,
          timestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS entry_triggers (
          id SERIAL PRIMARY KEY,
          entry_id INTEGER REFERENCES trigger_entries(id) ON DELETE CASCADE,
          trigger_name TEXT NOT NULL
      );

      CREATE TABLE IF NOT EXISTS entry_emotions (
          id SERIAL PRIMARY KEY,
          entry_id INTEGER REFERENCES trigger_entries(id) ON DELETE CASCADE,
          emotion_name TEXT NOT NULL
      );

      CREATE INDEX IF NOT EXISTS idx_trigger_entries_user_id ON trigger_entries(user_id);
      CREATE INDEX IF NOT EXISTS idx_entry_triggers_entry_id ON entry_triggers(entry_id);
      CREATE INDEX IF NOT EXISTS idx_entry_emotions_entry_id ON entry_emotions(entry_id);
    `;
    await query(schema);
    console.log("Database schema initialized successfully.");
  } catch (error) {
    console.error("Failed to initialize database schema:", error);
  }
};
