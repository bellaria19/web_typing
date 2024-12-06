import { useSettingStore } from "@/store/settingStore";
import { SelectorButton, SelectorContainer } from "@/styles/typing.styles";
import { Difficulty } from "@/types/typing";

const DifficultySelector = () => {
  const { settings, updateSettings } = useSettingStore();

  const difficulties: Difficulty[] = ["normal", "expert", "master"];

  return (
    <SelectorContainer>
      <div className="flex items-center gap-2">
        {difficulties.map((difficulty) => (
          <SelectorButton
            key={difficulty}
            $isSelected={settings.difficulty === difficulty}
            onClick={() => updateSettings("difficulty", difficulty)}
          >
            {difficulty}
          </SelectorButton>
        ))}
      </div>
    </SelectorContainer>
  );
};

export default DifficultySelector;
