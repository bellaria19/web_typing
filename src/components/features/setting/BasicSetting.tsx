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

export const BasicSetting = () => {
  const { t, i18n } = useTranslation();
  const { settings, updateBehavior } = useSettingStore();

  const changeLanguage = (language: string) => {
    i18n.changeLanguage(language);
  };

  return (
    <Container>
      <Title>
        <i className="fas fa-chevron-down" />
        {t("SETTINGS.SECTIONS.BASIC")}
      </Title>

      <OptionGrid>
        <div>
          <OptionLabel>
            <i className="fas fa-language" />
            {t("SETTINGS.OPTIONS.LANGUAGE.LABEL")}
          </OptionLabel>
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
          <OptionLabel>
            <i className="fas fa-star" />
            {t("SETTINGS.OPTIONS.DIFFICULTY.LABEL")}
          </OptionLabel>
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
            $isSelected={settings.behavior.difficulty === "normal"}
            onClick={() => updateBehavior("difficulty", "normal")}
          >
            {t("SETTINGS.OPTIONS.DIFFICULTY.BUTTONS.NORMAL")}
          </SettingButton>
          <SettingButton
            $isSelected={settings.behavior.difficulty === "expert"}
            onClick={() => updateBehavior("difficulty", "expert")}
          >
            {t("SETTINGS.OPTIONS.DIFFICULTY.BUTTONS.EXPERT")}
          </SettingButton>
          <SettingButton
            $isSelected={settings.behavior.difficulty === "master"}
            onClick={() => updateBehavior("difficulty", "master")}
          >
            {t("SETTINGS.OPTIONS.DIFFICULTY.BUTTONS.MASTER")}
          </SettingButton>
        </ButtonGroup>
      </OptionGrid>
    </Container>
  );
};
