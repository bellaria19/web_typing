import AccuracyDisplay from "@/components/features/typing/AccDisplay";
import WpmCpmDisplay from "@/components/features/typing/pmDisplay";
import TimeSelector from "@/components/features/typing/TimeSelector";
import TypeSelector from "@/components/features/typing/TypeSelector";
import TypingContainer from "@/components/features/typing/TypingContainer";
import { Wrapper } from "@/styles/common.styles";
import { Container } from "@/styles/typing.styles";

const Typing = () => (
  <Wrapper>
    <Container>
      <TypeSelector />
      <TimeSelector />
    </Container>
    <Container>
      <WpmCpmDisplay wpm={0} cpm={0} />
      <AccuracyDisplay accuracy={0} />
    </Container>
    <TypingContainer />
  </Wrapper>
);

export default Typing;
