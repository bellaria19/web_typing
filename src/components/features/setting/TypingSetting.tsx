import { SettingButton } from "@/components/features/setting/SettingButton";
import { Container, Title } from "@/styles/common.styles";
import {
  OptionGrid,
  OptionLabel,
  OptionDescription,
  ButtonGroup,
} from "@/styles/setting.styles";
import { useTranslation } from "react-i18next";
import { useSettingStore } from "@/store/settingStore";
import { useAuth } from "@/hooks/useAuth";
import { TypingSettings } from "@/types/setting";

export const TypingSetting = () => {
  const { settings, updateSettings } = useSettingStore();
  const { t } = useTranslation();
  const { user } = useAuth();

  const handleUpdateSettings = <K extends keyof TypingSettings>(
    key: K,
    value: TypingSettings[K]
  ) => {
    updateSettings(key, value, user?.id);
  };

  return (
    <Container>
      <Title>{t("SETTINGS.SECTIONS.TYPING")}</Title>

      <OptionGrid>
        <div>
          <OptionLabel>{t("SETTINGS.OPTIONS.BLIND_MODE.LABEL")}</OptionLabel>
          <OptionDescription>
            {t("SETTINGS.OPTIONS.BLIND_MODE.DESCRIPTION")}
          </OptionDescription>
        </div>
        <ButtonGroup>
          <SettingButton
            $isSelected={!settings.blindMode}
            onClick={() => handleUpdateSettings("blindMode", false)}
          >
            {t("SETTINGS.OPTIONS.BLIND_MODE.BUTTONS.OFF")}
          </SettingButton>
          <SettingButton
            $isSelected={settings.blindMode}
            onClick={() => handleUpdateSettings("blindMode", true)}
          >
            {t("SETTINGS.OPTIONS.BLIND_MODE.BUTTONS.ON")}
          </SettingButton>
        </ButtonGroup>
      </OptionGrid>

      <OptionGrid>
        <div>
          <OptionLabel>{t("SETTINGS.OPTIONS.QUICK_RESTART.LABEL")}</OptionLabel>
          <OptionDescription>
            {t("SETTINGS.OPTIONS.QUICK_RESTART.DESCRIPTION")}
          </OptionDescription>
        </div>
        <ButtonGroup>
          <SettingButton
            $isSelected={settings.quickRestart === "off"}
            onClick={() => handleUpdateSettings("quickRestart", "off")}
          >
            {t("SETTINGS.OPTIONS.QUICK_RESTART.BUTTONS.OFF")}
          </SettingButton>
          <SettingButton
            $isSelected={settings.quickRestart === "tab"}
            onClick={() => handleUpdateSettings("quickRestart", "tab")}
          >
            {t("SETTINGS.OPTIONS.QUICK_RESTART.BUTTONS.TAB")}
          </SettingButton>
          <SettingButton
            $isSelected={settings.quickRestart === "esc"}
            onClick={() => handleUpdateSettings("quickRestart", "esc")}
          >
            {t("SETTINGS.OPTIONS.QUICK_RESTART.BUTTONS.ESC")}
          </SettingButton>
          <SettingButton
            $isSelected={settings.quickRestart === "enter"}
            onClick={() => handleUpdateSettings("quickRestart", "enter")}
          >
            {t("SETTINGS.OPTIONS.QUICK_RESTART.BUTTONS.ENTER")}
          </SettingButton>
        </ButtonGroup>
      </OptionGrid>
    </Container>
  );
};
