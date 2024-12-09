import { useEffect, useState } from "react";
import TextDisplay from "./TextDisplay";
import TestInput from "./TestInput";
import { useTypingStore } from "@/store/typingStore";
import { useTranslation } from "react-i18next";
import { BlurOverlay, TypingContainerWrapper } from "@/styles/typing.styles";

const TypingContainer = () => {
  const { loadContent, reset } = useTypingStore();
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
