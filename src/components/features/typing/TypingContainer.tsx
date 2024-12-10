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
  // 사용자가 타이핑을 시작하기 전 집중을 위한 블러 상태 관리
  const [isBlurred, setIsBlurred] = useState(true);

  useEffect(() => {
    const initializeContent = async () => {
      await loadContent(i18n.language);
    };

    initializeContent();
    return () => reset();
  }, [i18n.language, loadContent, reset]);

  // 컨테이너 클릭 시 블러 효과 제거
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
      {/* 블러 상태일 때 오버레이를 표시하여 사용자에게 클릭 가이드 제공 */}
      {isBlurred && <BlurOverlay>{t("TYPING.FOCUS_GUIDE")}</BlurOverlay>}
      {/* 블러 효과를 CSS filter로 적용하여 타이핑 영역을 흐리게 표시 */}
      <div style={{ filter: isBlurred ? "blur(5px)" : "none" }}>
        <TextDisplay />
        <TestInput isBlurred={isBlurred} />
      </div>
    </TypingContainerWrapper>
  );
};

export default TypingContainer;
