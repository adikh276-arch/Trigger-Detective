import ScreenLayout from "../ScreenLayout";
import PrimaryButton from "../PrimaryButton";
import detectiveIcon from "@/assets/detective-icon-v2.png";

interface Props {
  onNext: () => void;
  onBack: () => void;
}

const ScreenIntro = ({ onNext, onBack }: Props) => {
  return (
    <ScreenLayout onBack={onBack} title="Trigger Detective">
      <p className="text-base text-muted-foreground font-body mb-4">
        Every craving leaves a clue.
      </p>

      <div className="flex justify-center my-4">
        <img src={detectiveIcon} alt="Detective magnifying glass" className="w-24 h-24" />
      </div>

      <div className="text-justified text-foreground font-body text-[15px] leading-relaxed space-y-3 mb-8">
        <p>Cravings sometimes feel random. But most of the time, something quietly triggers them.</p>
        <p>A mood, a place, a habit, or even a moment of boredom.</p>
        <p>Let's investigate and see what might be behind this one.</p>
      </div>

      <div className="mt-auto pb-6">
        <PrimaryButton onClick={onNext}>Start Investigation</PrimaryButton>
      </div>
    </ScreenLayout>
  );
};

export default ScreenIntro;
