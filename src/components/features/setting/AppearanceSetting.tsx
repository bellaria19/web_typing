import { useSettingStore } from "@/store/settingStore";
import { useThemeStore } from "@/store/themeStore";
import { Container, Title } from "@/styles/common.styles";
import {
  OptionGrid,
  OptionLabel,
  OptionDescription,
  ThemeOptionGrid,
  ThemeGrid,
  ThemeButton,
  SizeInput,
} from "@/styles/setting.styles";
import themes from "@/assets/_theme.json";
import { useTranslation } from "react-i18next";

export const AppearanceSetting = () => {
  const { t } = useTranslation();
  const { settings, updateAppearance } = useSettingStore();
  const { currentTheme, setTheme } = useThemeStore();

  return (
    <Container>
      <Title>{t("SETTINGS.SECTIONS.APPEARANCE")}</Title>

      <OptionGrid>
        <div>
          <OptionLabel>{t("SETTINGS.OPTIONS.FONT_SIZE.LABEL")}</OptionLabel>
          <OptionDescription>
            {t("SETTINGS.OPTIONS.FONT_SIZE.DESCRIPTION")}
          </OptionDescription>
        </div>
        <div className="flex items-center gap-2">
          <SizeInput
            type="number"
            value={settings.appearance.fontSize}
            onChange={(e) => {
              const value = Number(e.target.value);
              if (value >= 0.5 && value <= 3) {
                updateAppearance("fontSize", value);
                document.documentElement.style.setProperty(
                  "--font-scale",
                  String(value)
                );
              }
            }}
            min={0.5}
            max={3}
            step={0.1}
          />
        </div>
      </OptionGrid>

      <ThemeOptionGrid>
        <div>
          <OptionLabel>{t("SETTINGS.OPTIONS.THEME.LABEL")}</OptionLabel>
          <OptionDescription>
            {t("SETTINGS.OPTIONS.THEME.DESCRIPTION")}
          </OptionDescription>
          <ThemeGrid>
            {themes.map((theme) => (
              <ThemeButton
                key={theme.name}
                $bgColor={theme.bgColor}
                $textColor={theme.mainColor}
                $isSelected={currentTheme.name === theme.name}
                onClick={() => setTheme(theme.name)}
              >
                {theme.name}
              </ThemeButton>
            ))}
          </ThemeGrid>
        </div>
      </ThemeOptionGrid>
    </Container>
  );
};