import { useEffect, useState } from "react";
import TextDisplay from "./TextDisplay";
import TestInput from "./TestInput";
import { useTypingStore } from "@/store/typingStore";
import { useTranslation } from "react-i18next";
import { BlurOverlay, TypingContainerWrapper } from "@/styles/typing.styles";

const TypingContainer = () => {
  const { loadContent, reset, isFinished, wpm, cpm, accuracy } =
    useTypingStore();
  const { t, i18n } = useTranslation();
  const [isBlurred, setIsBlurred] = useState(true);

  useEffect(() => {
    const initializeContent = async () => {
      await loadContent(i18n.language);
    };

    initializeContent();
    return () => reset();
  }, [i18n.language, loadContent, reset]);

  const handleContainerClick = () => {
    setIsBlurred(false);
  };

  if (isFinished) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 p-8">
        <h2 className="text-2xl font-bold">{t("TYPING.TEST_COMPLETE")}</h2>
        <div className="flex gap-8">
          <div>
            <div className="text-sm">{t("TYPING.WPM")}</div>
            <div className="text-3xl font-bold">{wpm}</div>
          </div>
          <div>
            <div className="text-sm">{t("TYPING.CPM")}</div>
            <div className="text-3xl font-bold">{cpm}</div>
          </div>
          <div>
            <div className="text-sm">{t("TYPING.ACCURACY")}</div>
            <div className="text-3xl font-bold">{accuracy}%</div>
          </div>
        </div>
        <button
          className="px-4 py-2 mt-4 text-sm font-medium rounded bg-primary"
          onClick={() => {
            reset();
            loadContent(i18n.language);
          }}
        >
          {t("TYPING.TRY_AGAIN")}
        </button>
      </div>
    );
  }

  return (
    <TypingContainerWrapper onClick={handleContainerClick}>
      {isBlurred && <BlurOverlay>{t("TYPING.FOCUS_GUIDE")}</BlurOverlay>}
      <div style={{ filter: isBlurred ? "blur(5px)" : "none" }}>
        <TextDisplay />
        <TestInput isBlurred={isBlurred} />
      </div>
    </TypingContainerWrapper>
  );
};

export default TypingContainer;
