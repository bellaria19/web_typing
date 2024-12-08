import { useEffect } from "react";
import TextDisplay from "./TextDisplay";
import TestInput from "./TestInput";
import { useTypingStore } from "@/store/typingStore";
import { useTranslation } from "react-i18next";

const TypingContainer = () => {
  const { loadContent, reset } = useTypingStore();
  const { i18n } = useTranslation();

  useEffect(() => {
    const initializeContent = async () => {
      await loadContent(i18n.language);
    };

    initializeContent();
    return () => reset();
  }, [i18n.language, loadContent, reset]);

  return (
    <>
      <TextDisplay />
      <TestInput />
    </>
  );
};

export default TypingContainer;
