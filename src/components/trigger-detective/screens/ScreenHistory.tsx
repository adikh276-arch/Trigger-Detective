import { useEffect, useState } from "react";
import ScreenLayout from "../ScreenLayout";
import PrimaryButton from "../PrimaryButton";
import type { TriggerEntry } from "../triggerStorage";
import { getEntries } from "../triggerStorage";

interface Props {
  onBack: () => void;
}

const ScreenHistory = ({ onBack }: Props) => {
  const [entries, setEntries] = useState<TriggerEntry[]>([]);

  useEffect(() => {
    setEntries(getEntries().reverse());
  }, []);

  return (
    <ScreenLayout onBack={onBack} title="Your Log History">
      {entries.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center text-center py-12">
          <span className="text-5xl mb-4">🔍</span>
          <p className="font-body text-muted-foreground text-sm">No entries yet. Complete an investigation to see your history here.</p>
        </div>
      ) : (
        <div className="space-y-4 mb-6">
          {entries.map((entry, i) => (
            <div key={i} className="bg-card rounded-xl shadow-md p-4 space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-heading font-bold text-sm text-foreground">
                  Entry #{entries.length - i}
                </span>
                <span className="font-body text-xs text-muted-foreground">
                  {new Date(entry.timestamp).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-sm font-body">
                <div>
                  <span className="text-muted-foreground text-xs">Urge Level</span>
                  <p className="font-heading font-bold text-foreground">{entry.urgeLevel}/10</p>
                </div>
                <div>
                  <span className="text-muted-foreground text-xs">Location</span>
                  <p className="text-foreground">{entry.location || "—"}</p>
                </div>
              </div>

              {entry.triggers.length > 0 && (
                <div>
                  <span className="text-muted-foreground text-xs font-body">Triggers</span>
                  <div className="flex flex-wrap gap-1.5 mt-1">
                    {entry.triggers.map((t) => (
                      <span key={t} className="px-2.5 py-1 rounded-full bg-secondary/30 text-xs font-body text-foreground">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {entry.emotions.length > 0 && (
                <div>
                  <span className="text-muted-foreground text-xs font-body">Mood</span>
                  <div className="flex flex-wrap gap-1.5 mt-1">
                    {entry.emotions.map((e) => (
                      <span key={e} className="px-2.5 py-1 rounded-full bg-accent text-xs font-body text-foreground">
                        {e}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {entry.activity && (
                <div>
                  <span className="text-muted-foreground text-xs font-body">Activity</span>
                  <p className="text-foreground text-sm font-body">{entry.activity}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      <div className="mt-auto pb-6">
        <PrimaryButton onClick={() => window.location.href = "/"}>Start New Investigation</PrimaryButton>
      </div>
    </ScreenLayout>
  );
};

export default ScreenHistory;
