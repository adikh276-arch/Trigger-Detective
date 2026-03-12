import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import ScreenIntro from "./screens/ScreenIntro";
import ScreenUrgeLevel from "./screens/ScreenUrgeLevel";
import ScreenTriggers from "./screens/ScreenTriggers";
import ScreenContext from "./screens/ScreenContext";
import ScreenEmotion from "./screens/ScreenEmotion";
import ScreenSummary from "./screens/ScreenSummary";
import ScreenPatterns from "./screens/ScreenPatterns";

export interface TriggerData {
  urgeLevel: number;
  triggers: string[];
  location: string;
  activity: string;
  emotions: string[];
}

const TriggerDetective = () => {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<TriggerData>({
    urgeLevel: 5,
    triggers: [],
    location: "",
    activity: "",
    emotions: [],
  });

  const next = () => setStep((s) => s + 1);
  const back = () => setStep((s) => Math.max(0, s - 1));

  const updateData = (partial: Partial<TriggerData>) => {
    setData((prev) => ({ ...prev, ...partial }));
  };

  const screens = [
    <ScreenIntro key="intro" onNext={next} onBack={back} />,
    <ScreenUrgeLevel key="urge" data={data} updateData={updateData} onNext={next} onBack={back} />,
    <ScreenTriggers key="triggers" data={data} updateData={updateData} onNext={next} onBack={back} />,
    <ScreenContext key="context" data={data} updateData={updateData} onNext={next} onBack={back} />,
    <ScreenEmotion key="emotion" data={data} updateData={updateData} onNext={next} onBack={back} />,
    <ScreenSummary key="summary" data={data} onNext={next} onBack={back} />,
    <ScreenPatterns key="patterns" data={data} onBack={back} />,
  ];

  return (
    <div className="min-h-screen bg-background">
      <AnimatePresence mode="wait">
        {screens[step]}
      </AnimatePresence>
    </div>
  );
};

export default TriggerDetective;
