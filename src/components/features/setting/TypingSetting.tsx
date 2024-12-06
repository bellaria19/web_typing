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

export const TypingSetting = () => {
  const { settings, updateSettings } = useSettingStore();
  const { t } = useTranslation();

  return (
    <Container>
      <Title>
        <i className="fas fa-chevron-down" />
        {t("SETTINGS.SECTIONS.TYPING")}
      </Title>

      <OptionGrid>
        <div>
          <OptionLabel>
            <i className="fas fa-eye-slash" />
            {t("SETTINGS.OPTIONS.BLIND_MODE.LABEL")}
          </OptionLabel>
          <OptionDescription>
            {t("SETTINGS.OPTIONS.BLIND_MODE.DESCRIPTION")}
          </OptionDescription>
        </div>
        <ButtonGroup>
          <SettingButton
            $isSelected={!settings.blindMode}
            onClick={() => updateSettings("blindMode", false)}
          >
            {t("SETTINGS.OPTIONS.BLIND_MODE.BUTTONS.OFF")}
          </SettingButton>
          <SettingButton
            $isSelected={settings.blindMode}
            onClick={() => updateSettings("blindMode", true)}
          >
            {t("SETTINGS.OPTIONS.BLIND_MODE.BUTTONS.ON")}
          </SettingButton>
        </ButtonGroup>
      </OptionGrid>

      <OptionGrid>
        <div>
          <OptionLabel>
            <i className="fas fa-redo-alt" />
            {t("SETTINGS.OPTIONS.QUICK_RESTART.LABEL")}
          </OptionLabel>
          <OptionDescription>
            {t("SETTINGS.OPTIONS.QUICK_RESTART.DESCRIPTION")}
          </OptionDescription>
        </div>
        <ButtonGroup>
          <SettingButton
            $isSelected={settings.quickRestart === "off"}
            onClick={() => updateSettings("quickRestart", "off")}
          >
            {t("SETTINGS.OPTIONS.QUICK_RESTART.BUTTONS.OFF")}
          </SettingButton>
          <SettingButton
            $isSelected={settings.quickRestart === "tab"}
            onClick={() => updateSettings("quickRestart", "tab")}
          >
            {t("SETTINGS.OPTIONS.QUICK_RESTART.BUTTONS.TAB")}
          </SettingButton>
          <SettingButton
            $isSelected={settings.quickRestart === "esc"}
            onClick={() => updateSettings("quickRestart", "esc")}
          >
            {t("SETTINGS.OPTIONS.QUICK_RESTART.BUTTONS.ESC")}
          </SettingButton>
          <SettingButton
            $isSelected={settings.quickRestart === "enter"}
            onClick={() => updateSettings("quickRestart", "enter")}
          >
            {t("SETTINGS.OPTIONS.QUICK_RESTART.BUTTONS.ENTER")}
          </SettingButton>
        </ButtonGroup>
      </OptionGrid>
    </Container>
  );
};
