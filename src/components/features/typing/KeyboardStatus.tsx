import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { StatusItem } from "@/styles/typing.styles";

const KeyboardStatus = () => {
  const [isCapsLock, setIsCapsLock] = useState(false);
  const [isKorean, setIsKorean] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    const handleKeyEvent = (e: KeyboardEvent) => {
      if (e.getModifierState) {
        setIsCapsLock(e.getModifierState("CapsLock"));
      }
    };

    const handleLanguageChange = (e: InputEvent) => {
      const target = e.target as HTMLInputElement;
      setIsKorean(
        target.lang === "ko" ||
          /[\u3131-\u314e\u314f-\u3163\uac00-\ud7a3]/.test(target.value)
      );
    };

    const textInputs = document.querySelectorAll(
      'input[type="text"], textarea'
    );
    textInputs.forEach((input) => {
      input.addEventListener("input", handleLanguageChange as any);
    });

    window.addEventListener("keydown", handleKeyEvent);
    window.addEventListener("keyup", handleKeyEvent);

    return () => {
      textInputs.forEach((input) => {
        input.removeEventListener("input", handleLanguageChange as any);
      });
      window.removeEventListener("keydown", handleKeyEvent);
      window.removeEventListener("keyup", handleKeyEvent);
    };
  }, []);

  return (
    <div className="flex flex-col gap-2 my-4 items-centent">
      {/* <StatusItem $active={true}>
        {isKorean
          ? t("TYPING.KEYBOARD_LANGUAGE.KO")
          : t("TYPING.KEYBOARD_LANGUAGE.EN")}
      </StatusItem> */}
      <StatusItem
        $active={true}
        style={{ visibility: isCapsLock ? "visible" : "hidden" }}
      >
        {t("TYPING.CAPS_LOCK")}
      </StatusItem>
    </div>
  );
};

export default KeyboardStatus;
