import { useState } from "react";
import ScreenLayout from "../ScreenLayout";
import PrimaryButton from "../PrimaryButton";
import ChipSelector from "../ChipSelector";
import { TriggerData } from "../TriggerDetective";

interface Props {
  data: TriggerData;
  updateData: (d: Partial<TriggerData>) => void;
  onNext: () => void;
  onBack: () => void;
}

const EMOTION_OPTIONS = [
  "Stressed", "Bored", "Tired", "Anxious",
  "Frustrated", "Lonely", "Restless", "Happy",
];

const ScreenEmotion = ({ data, updateData, onNext, onBack }: Props) => {
  const [selected, setSelected] = useState<string[]>(data.emotions);

  const toggle = (option: string) => {
    setSelected((prev) =>
      prev.includes(option) ? prev.filter((o) => o !== option) : [...prev, option]
    );
  };

  const handleNext = () => {
    updateData({ emotions: selected });
    onNext();
  };

  return (
    <ScreenLayout onBack={onBack} title="How are you feeling?">
      <div className="text-justified text-foreground font-body text-[15px] leading-relaxed space-y-2 mb-6">
        <p>Our emotions often fuel cravings.</p>
        <p>Choose anything that matches your current mood.</p>
      </div>

      <ChipSelector
        options={EMOTION_OPTIONS}
        selected={selected}
        onToggle={toggle}
      />

      <div className="mt-auto pb-6 pt-6">
        <PrimaryButton onClick={handleNext}>Log Trigger</PrimaryButton>
      </div>
    </ScreenLayout>
  );
};

export default ScreenEmotion;
