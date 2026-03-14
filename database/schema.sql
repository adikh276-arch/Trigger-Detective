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

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_trigger_entries_user_id ON trigger_entries(user_id);
CREATE INDEX IF NOT EXISTS idx_entry_triggers_entry_id ON entry_triggers(entry_id);
CREATE INDEX IF NOT EXISTS idx_entry_emotions_entry_id ON entry_emotions(entry_id);
