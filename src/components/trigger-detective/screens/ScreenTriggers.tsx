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

const TRIGGER_OPTIONS = [
  "Stress", "Boredom", "Loneliness", "Anxiety", "Social pressure",
  "Routine / habit", "Celebration", "Seeing someone else do it",
  "Specific place", "Specific time of day",
];

const ScreenTriggers = ({ data, updateData, onNext, onBack }: Props) => {
  const [selected, setSelected] = useState<string[]>(data.triggers);

  const toggle = (option: string) => {
    setSelected((prev) =>
      prev.includes(option) ? prev.filter((o) => o !== option) : [...prev, option]
    );
  };

  const addCustom = (value: string) => {
    if (value.trim() && !selected.includes(value.trim())) {
      setSelected((prev) => [...prev, value.trim()]);
    }
  };

  const handleNext = () => {
    updateData({ triggers: selected });
    onNext();
  };

  return (
    <ScreenLayout onBack={onBack} title="What might have triggered this?">
      <div className="text-justified text-foreground font-body text-[15px] leading-relaxed space-y-2 mb-6">
        <p>Most cravings are connected to something happening around us or within us.</p>
        <p>Select anything that feels relevant.</p>
      </div>

      <ChipSelector
        options={TRIGGER_OPTIONS}
        selected={selected}
        onToggle={toggle}
        allowCustom
        onAddCustom={addCustom}
      />

      <div className="mt-auto pb-6 pt-6">
        <PrimaryButton onClick={handleNext}>Next</PrimaryButton>
      </div>
    </ScreenLayout>
  );
};

export default ScreenTriggers;
