import ScreenLayout from "../ScreenLayout";
import PrimaryButton from "../PrimaryButton";
import { TriggerData } from "../TriggerDetective";

interface Props {
  data: TriggerData;
  onBack: () => void;
}

const ScreenPatterns = ({ data, onBack }: Props) => {
  return (
    <ScreenLayout onBack={onBack} title="Your Trigger Patterns">
      <div className="text-justified text-foreground font-body text-[15px] leading-relaxed space-y-2 mb-6">
        <p>Your detective work is starting to reveal patterns.</p>
        <p>Here are some clues your entries have uncovered.</p>
      </div>

      {/* Insights */}
      <div className="space-y-3 mb-6">
        <InsightCard emoji="😰" text="Stress shows up as a common trigger" />
        <InsightCard emoji="🧍" text="Urges appear often when you are alone" />
      </div>

      {/* Trigger frequency */}
      <div className="bg-card rounded-xl shadow-md p-5 mb-4">
        <h3 className="font-heading text-sm font-bold text-foreground mb-3">Trigger Frequency</h3>
        <div className="space-y-2">
          {["Stress", "Boredom", "Loneliness", "Anxiety"].map((trigger, i) => (
            <div key={trigger} className="flex items-center gap-3">
              <span className="text-xs font-body text-muted-foreground w-20">{trigger}</span>
              <div className="flex-1 h-3 rounded-full bg-accent overflow-hidden">
                <div
                  className="h-full rounded-full bg-primary transition-all duration-500"
                  style={{ width: `${[75, 60, 40, 30][i]}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-auto pb-6 space-y-3">
        <PrimaryButton onClick={() => alert("View progress")}>View My Progress</PrimaryButton>
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
