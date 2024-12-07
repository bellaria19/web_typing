import { useSettingStore } from "@/store/settingStore";
import { Container, Title } from "@/styles/common.styles";
import { SettingButton } from "@/components/features/setting/SettingButton";
import {
  OptionGrid,
  OptionLabel,
  OptionDescription,
  ButtonGroup,
} from "@/styles/setting.styles";
import { useTranslation } from "react-i18next";
import { TypingSettings } from "@/types/setting";
import { useAuth } from "@/hooks/useAuth";

export const BasicSetting = () => {
  const { settings, updateSettings } = useSettingStore();
  const { t, i18n } = useTranslation();
  const { user } = useAuth();

  const changeLanguage = (language: string) => {
    i18n.changeLanguage(language);
  };

  const handleSettingUpdate = <K extends keyof TypingSettings>(
    key: K,
    value: TypingSettings[K]
  ) => {
    updateSettings(key, value, user?.id);
  };

  return (
    <Container>
      <Title>{t("SETTINGS.SECTIONS.BASIC")}</Title>

      <OptionGrid>
        <div>
          <OptionLabel>{t("SETTINGS.OPTIONS.LANGUAGE.LABEL")}</OptionLabel>
          <OptionDescription>
            {t("SETTINGS.OPTIONS.LANGUAGE.DESCRIPTION")}
          </OptionDescription>
        </div>
        <ButtonGroup>
          <SettingButton
            $isSelected={i18n.language === "ko"}
            onClick={() => changeLanguage("ko")}
          >
            {t("SETTINGS.OPTIONS.LANGUAGE.BUTTONS.KO")}
          </SettingButton>
          <SettingButton
            $isSelected={i18n.language === "en"}
            onClick={() => changeLanguage("en")}
          >
            {t("SETTINGS.OPTIONS.LANGUAGE.BUTTONS.EN")}
          </SettingButton>
        </ButtonGroup>
      </OptionGrid>

      <OptionGrid>
        <div>
          <OptionLabel>{t("SETTINGS.OPTIONS.DIFFICULTY.LABEL")}</OptionLabel>
          <OptionDescription>
            {t("SETTINGS.OPTIONS.DIFFICULTY.DESCRIPTION.NORMAL")}
            <br />
            {t("SETTINGS.OPTIONS.DIFFICULTY.DESCRIPTION.EXPERT")}
            <br />
            {t("SETTINGS.OPTIONS.DIFFICULTY.DESCRIPTION.MASTER")}
          </OptionDescription>
        </div>
        <ButtonGroup>
          <SettingButton
            $isSelected={settings.difficulty === "normal"}
            onClick={() => handleSettingUpdate("difficulty", "normal")}
          >
            {t("SETTINGS.OPTIONS.DIFFICULTY.BUTTONS.NORMAL")}
          </SettingButton>
          <SettingButton
            $isSelected={settings.difficulty === "expert"}
            onClick={() => handleSettingUpdate("difficulty", "expert")}
          >
            {t("SETTINGS.OPTIONS.DIFFICULTY.BUTTONS.EXPERT")}
          </SettingButton>
          <SettingButton
            $isSelected={settings.difficulty === "master"}
            onClick={() => handleSettingUpdate("difficulty", "master")}
          >
            {t("SETTINGS.OPTIONS.DIFFICULTY.BUTTONS.MASTER")}
          </SettingButton>
        </ButtonGroup>
      </OptionGrid>
    </Container>
  );
};
