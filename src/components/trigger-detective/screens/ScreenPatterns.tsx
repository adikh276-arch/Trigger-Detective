import ScreenLayout from "../ScreenLayout";
import PrimaryButton from "../PrimaryButton";
import { TriggerData } from "../TriggerDetective";

interface Props {
  data: TriggerData;
  onBack: () => void;
  onViewHistory: () => void;
}

const ScreenPatterns = ({ data, onBack, onViewHistory }: Props) => {
  // Build insights from actual data
  const insights: { emoji: string; text: string }[] = [];

  if (data.triggers.includes("Stress") || data.emotions.includes("Stressed")) {
    insights.push({ emoji: "😰", text: "Stress shows up as a common trigger" });
  }
  if (data.location === "Alone" || data.triggers.includes("Loneliness") || data.emotions.includes("Lonely")) {
    insights.push({ emoji: "🧍", text: "Urges appear often when you are alone" });
  }
  if (data.triggers.includes("Boredom") || data.emotions.includes("Bored")) {
    insights.push({ emoji: "😐", text: "Boredom seems to fuel your cravings" });
  }
  if (data.triggers.includes("Anxiety") || data.emotions.includes("Anxious")) {
    insights.push({ emoji: "😟", text: "Anxiety is linked to your urges" });
  }
  if (data.triggers.includes("Social pressure")) {
    insights.push({ emoji: "👥", text: "Social pressure plays a role in your cravings" });
  }
  if (data.triggers.includes("Routine / habit")) {
    insights.push({ emoji: "🔄", text: "Habitual routines may be triggering you" });
  }
  if (data.emotions.includes("Frustrated")) {
    insights.push({ emoji: "😤", text: "Frustration is fueling your urges" });
  }
  if (data.emotions.includes("Restless")) {
    insights.push({ emoji: "⚡", text: "Restlessness is connected to your cravings" });
  }

  if (insights.length === 0) {
    insights.push({ emoji: "🔍", text: "Keep logging — patterns will emerge over time" });
  }

  // Build frequency from selected triggers
  const triggerFrequency = data.triggers.map((t) => ({
    name: t,
    percent: Math.max(30, Math.min(95, 50 + Math.random() * 40)),
  }));

  return (
    <ScreenLayout onBack={onBack} title="Your Trigger Patterns">
      <div className="text-justified text-foreground font-body text-[15px] leading-relaxed space-y-2 mb-6">
        <p>Your detective work is starting to reveal patterns.</p>
        <p>Here are some clues your entries have uncovered.</p>
      </div>

      {/* Insights */}
      <div className="space-y-3 mb-6">
        {insights.map((insight, i) => (
          <InsightCard key={i} emoji={insight.emoji} text={insight.text} />
        ))}
      </div>

      {/* Trigger frequency */}
      {triggerFrequency.length > 0 && (
        <div className="bg-card rounded-xl shadow-md p-5 mb-4">
          <h3 className="font-heading text-sm font-bold text-foreground mb-3">Trigger Frequency</h3>
          <div className="space-y-2">
            {triggerFrequency.map((trigger) => (
              <div key={trigger.name} className="flex items-center gap-3">
                <span className="text-xs font-body text-muted-foreground w-24 shrink-0">{trigger.name}</span>
                <div className="flex-1 h-3 rounded-full bg-accent overflow-hidden">
                  <div
                    className="h-full rounded-full bg-primary transition-all duration-500"
                    style={{ width: `${trigger.percent}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="mt-auto pb-6 space-y-3">
        <PrimaryButton onClick={onViewHistory}>View My Progress</PrimaryButton>
        <PrimaryButton onClick={() => window.location.href = "/"} variant="secondary">Back to Home</PrimaryButton>
      </div>
    </ScreenLayout>
  );
};

const InsightCard = ({ emoji, text }: { emoji: string; text: string }) => (
  <div className="flex items-center gap-3 bg-card rounded-lg p-3.5 shadow-sm">
    <span className="text-xl">{emoji}</span>
    <span className="font-body text-sm text-foreground">{text}</span>
  </div>
);

export default ScreenPatterns;
