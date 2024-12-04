import { AppearanceSetting } from "@/components/features/setting/AppearanceSetting";
import { BasicSetting } from "@/components/features/setting/BasicSetting";
import { TypingSetting } from "@/components/features/setting/TypingSetting";
import { Wrapper, Title } from "@/styles/common.styles";

const Setting = () => {
  return (
    <Wrapper>
      <Title>Setting</Title>
      <BasicSetting />
      <TypingSetting />
      <AppearanceSetting />
    </Wrapper>
  );
};

export default Setting;
