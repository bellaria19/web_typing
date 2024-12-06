import { useSettingStore } from "@/store/settingStore";
import { SelectorButton, SelectorContainer } from "@/styles/typing.styles";
import { Difficulty } from "@/types/typing";

const DifficultySelector = () => {
  const { settings, updateBehavior } = useSettingStore();

  const difficulties: Difficulty[] = ["normal", "expert", "master"];

  return (
    <SelectorContainer>
      <div className="flex items-center gap-2">
        {difficulties.map((difficulty) => (
          <SelectorButton
            key={difficulty}
            $isSelected={settings.behavior.difficulty === difficulty}
            onClick={() => updateBehavior("difficulty", difficulty)}
          >
            {difficulty}
          </SelectorButton>
        ))}
      </div>
    </SelectorContainer>
  );
};

export default DifficultySelector;
