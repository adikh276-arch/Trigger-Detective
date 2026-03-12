import ScreenLayout from "../ScreenLayout";
import PrimaryButton from "../PrimaryButton";
import { TriggerData } from "../TriggerDetective";

interface Props {
  data: TriggerData;
  onNext: () => void;
  onBack: () => void;
}

const ScreenSummary = ({ data, onNext, onBack }: Props) => {
  return (
    <ScreenLayout onBack={onBack} title="Nice work, detective 🕵️">
      <div className="text-justified text-foreground font-body text-[15px] leading-relaxed space-y-3 mb-6">
        <p>You just captured an important clue.</p>
        <p>The more triggers you notice, the easier it becomes to stay ahead of cravings.</p>
        <p>Awareness is your secret advantage.</p>
      </div>

      {/* Summary Card */}
      <div className="bg-card rounded-xl shadow-md p-5 space-y-3 mb-8">
        <div className="flex justify-between items-center border-b border-border pb-2">
          <span className="font-body font-medium text-sm text-foreground">Urge Level</span>
          <span className="font-heading font-bold text-lg text-foreground">{data.urgeLevel}</span>
        </div>
        <div className="flex justify-between items-center border-b border-border pb-2">
          <span className="font-body font-medium text-sm text-foreground">Triggers Logged</span>
          <span className="font-heading font-bold text-lg text-foreground">{data.triggers.length}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="font-body font-medium text-sm text-foreground">Mood Logged</span>
          <span className="font-body text-sm text-muted-foreground">
            {data.emotions.length > 0 ? data.emotions.join(", ") : "None"}
          </span>
        </div>
      </div>

      <div className="mt-auto pb-6 space-y-3">
        <PrimaryButton onClick={() => alert("Entry saved!")}>Save Entry</PrimaryButton>
        <PrimaryButton onClick={onNext} variant="secondary">Try Urge Shield</PrimaryButton>
      </div>
    </ScreenLayout>
  );
};

export default ScreenSummary;
