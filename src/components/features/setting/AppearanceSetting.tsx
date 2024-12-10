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
import { useAuth } from "@/hooks/useAuth";
import { TypingSettings } from "@/types/setting";

// 화면 설정을 관리하는 컴포넌트
// - 폰트 크기 조절 (0.5~3.0)
// - 테마 선택
export const AppearanceSetting = () => {
  const { t } = useTranslation();
  const { settings, updateSettings } = useSettingStore();
  const { currentTheme, setTheme } = useThemeStore();
  const { user } = useAuth();

  // 설정 업데이트 핸들러 - 로그인된 사용자의 경우 DB에도 저장
  const handleUpdateSettings = <K extends keyof TypingSettings>(
    key: K,
    value: TypingSettings[K]
  ) => {
    updateSettings(key, value, user?.id);
  };

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
            value={settings.fontSize}
            onChange={(e) => {
              const value = Number(e.target.value);
              if (value >= 0.5 && value <= 3) {
                handleUpdateSettings("fontSize", value);
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
