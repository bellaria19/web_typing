import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { StatusItem } from "@/styles/typing.styles";

const KeyboardStatus = () => {
  const [isCapsLock, setIsCapsLock] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    // CapsLock 상태 변경 감지 핸들러
    const handleKeyEvent = (e: KeyboardEvent) => {
      if (e.getModifierState) {
        setIsCapsLock(e.getModifierState("CapsLock"));
      }
    };

    // CapsLock 상태 감지를 위한 키보드 이벤트 리스너 등록
    window.addEventListener("keydown", handleKeyEvent);
    window.addEventListener("keyup", handleKeyEvent);

    // 컴포넌트 언마운트 시 이벤트 리스너 정리
    return () => {
      window.removeEventListener("keydown", handleKeyEvent);
      window.removeEventListener("keyup", handleKeyEvent);
    };
  }, []);

  return (
    <div className="flex flex-col gap-2 my-4 items-centent">
      {/* CapsLock 상태 표시 - CapsLock이 켜져있을 때만 보임 */}
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
