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

const LOCATION_OPTIONS = ["Home", "Work", "Outside", "Social setting", "Alone", "With friends"];

const ScreenContext = ({ data, updateData, onNext, onBack }: Props) => {
  const [location, setLocation] = useState(data.location);
  const [activity, setActivity] = useState(data.activity);

  const handleNext = () => {
    updateData({ location, activity });
    onNext();
  };

  return (
    <ScreenLayout onBack={onBack} title="Where are you right now?">
      <ChipSelector
        options={LOCATION_OPTIONS}
        selected={location ? [location] : []}
        onToggle={(opt) => setLocation(opt === location ? "" : opt)}
      />

      <div className="mt-6 mb-2">
        <p className="text-justified text-foreground font-body text-[15px] leading-relaxed">
          What were you doing just before the urge appeared?
        </p>
      </div>

      <input
        type="text"
        placeholder="Example: scrolling, relaxing, working…"
        value={activity}
        onChange={(e) => setActivity(e.target.value)}
        className="w-full px-4 py-3.5 rounded-lg border border-input bg-card text-foreground font-body text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/30 mb-6"
      />

      <div className="mt-auto pb-6">
        <PrimaryButton onClick={handleNext}>Next</PrimaryButton>
      </div>
    </ScreenLayout>
  );
};

export default ScreenContext;
