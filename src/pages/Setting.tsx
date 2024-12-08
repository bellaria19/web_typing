import { useEffect } from "react";
import { AppearanceSetting } from "@/components/features/setting/AppearanceSetting";
import { BasicSetting } from "@/components/features/setting/BasicSetting";
import { TypingSetting } from "@/components/features/setting/TypingSetting";
import { Wrapper, Title } from "@/styles/common.styles";
import { useSettingStore } from "@/store/settingStore";
import { useTranslation } from "react-i18next";
import { useAuth } from "@/hooks/useAuth";

const Setting = () => {
  const { t } = useTranslation();
  const { isLoaded, loadUserSettings } = useSettingStore();
  const { user } = useAuth();

  useEffect(() => {
    if (user?.id) {
      loadUserSettings(user.id);
    }
  }, [user, loadUserSettings]);

  if (!isLoaded) {
    return <div>{t("COMMON.LOADING")}</div>;
  }

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
