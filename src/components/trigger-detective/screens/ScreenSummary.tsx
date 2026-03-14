import { useTranslation } from "react-i18next";
import ScreenLayout from "../ScreenLayout";
import PrimaryButton from "../PrimaryButton";
import { TriggerData } from "../TriggerDetective";

interface Props {
  data: TriggerData;
  onNext: () => void;
  onBack: () => void;
  onSave: () => void;
}

const ScreenSummary = ({ data, onNext, onBack, onSave }: Props) => {
  const { t } = useTranslation();
  const handleSave = () => {
    onSave();
    alert(t("summary_saved_msg"));
  };

  return (
    <ScreenLayout onBack={onBack} title={t("summary_title")}>
      <div className="text-justified text-foreground font-body text-[15px] leading-relaxed space-y-3 mb-6">
        <p>{t("summary_para1")}</p>
        <p>{t("summary_para2")}</p>
        <p>{t("summary_para3")}</p>
      </div>

      {/* Summary Card */}
      <div className="bg-card rounded-xl shadow-md p-5 space-y-3 mb-8">
        <div className="flex justify-between items-center border-b border-border pb-2">
          <span className="font-body font-medium text-sm text-foreground">{t("summary_urge_level")}</span>
          <span className="font-heading font-bold text-lg text-foreground">{data.urgeLevel}</span>
        </div>
        <div className="flex justify-between items-center border-b border-border pb-2">
          <span className="font-body font-medium text-sm text-foreground">{t("summary_triggers_logged")}</span>
          <span className="font-heading font-bold text-lg text-foreground">{data.triggers.length}</span>
        </div>
        <div className="flex justify-between items-center border-b border-border pb-2">
          <span className="font-body font-medium text-sm text-foreground">{t("summary_location")}</span>
          <span className="font-body text-sm text-muted-foreground">{data.location || "—"}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="font-body font-medium text-sm text-foreground">{t("summary_mood_logged")}</span>
          <span className="font-body text-sm text-muted-foreground">
            {data.emotions.length > 0 ? data.emotions.join(", ") : t("summary_none")}
          </span>
        </div>
      </div>

      <div className="mt-auto pb-6 space-y-3">
        <PrimaryButton onClick={handleSave}>{t("summary_save_btn")}</PrimaryButton>
        <PrimaryButton onClick={onNext} variant="secondary">{t("summary_view_patterns_btn")}</PrimaryButton>
      </div>
    </ScreenLayout>
  );
};

export default ScreenSummary;
