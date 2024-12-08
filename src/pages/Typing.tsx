import AccuracyDisplay from "@/components/features/typing/AccDisplay";
import DifficultySelector from "@/components/features/typing/DifficultySelector";
import WpmCpmDisplay from "@/components/features/typing/WpmCpmDisplay";
import TimeSelector from "@/components/features/typing/TimeSelector";
import TypeSelector from "@/components/features/typing/TypeSelector";
import TypingContainer from "@/components/features/typing/TypingContainer";
import { Wrapper } from "@/styles/common.styles";
import WpmDisplay from "@/components/features/typing/WpmDisplay";
import CpmDisplay from "@/components/features/typing/CpmDisplay";
import RestartBtn from "@/components/features/typing/RestartBtn";
import { useTypingStore } from "@/store/typingStore";
import { useEffect } from "react";

const Typing = () => {
  const { wpm, cpm, accuracy, calculate } = useTypingStore();

  useEffect(() => {
    const intervalId = setInterval(() => {
      calculate();
    }, 500);

    return () => clearInterval(intervalId);
  }, [calculate]);

  return (
    <Wrapper>
      <div className="flex flex-row items-center justify-center gap-2 my-4">
        <TypeSelector />
        <TimeSelector />
        <DifficultySelector />
      </div>
      <div className="flex items-center justify-center gap-4">
        <WpmCpmDisplay wpm={wpm} cpm={cpm} />
        <WpmDisplay wpm={wpm} />
        <CpmDisplay cpm={cpm} />
        <AccuracyDisplay accuracy={accuracy} />
        <RestartBtn />
      </div>
      <TypingContainer />
    </Wrapper>
  );
};

export default Typing;
