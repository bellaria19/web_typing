import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { StatusItem } from "@/styles/typing.styles";

const KeyboardStatus = () => {
  const [isCapsLock, setIsCapsLock] = useState(false);
  const { i18n, t } = useTranslation();

  useEffect(() => {
    const handleKeyEvent = (e: KeyboardEvent) => {
      if (e.getModifierState) {
        setIsCapsLock(e.getModifierState("CapsLock"));
      }
    };

    window.addEventListener("keydown", handleKeyEvent);
    window.addEventListener("keyup", handleKeyEvent);

    return () => {
      window.removeEventListener("keydown", handleKeyEvent);
      window.removeEventListener("keyup", handleKeyEvent);
    };
  }, []);

  return (
    <div className="flex flex-col gap-2 my-4 items-centent">
      <StatusItem $active={true}>
        {i18n.language === "ko"
          ? t("TYPING.KEYBOARD_LANGUAGE.KO")
          : t("TYPING.KEYBOARD_LANGUAGE.EN")}
      </StatusItem>
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
