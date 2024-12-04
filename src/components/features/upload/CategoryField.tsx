import { useTranslation } from "react-i18next";
import { Container, Label } from "@/styles/common.styles";
import { Category } from "@/types/upload";
import { TYPING_CATEGORIES, getCategoryLabel } from "@/constants/categories";
import { CategoryWrapper, CategoryBtn } from "@/styles/upload.styles";
import { Language } from "@/types/language";

interface CategoryFieldProps {
  selectedCategory: Category | undefined;
  onCategoryClick: (category: Category) => void;
}

const CategoryField = ({
  selectedCategory,
  onCategoryClick,
}: CategoryFieldProps) => {
  const { t, i18n } = useTranslation();
  const language = i18n.language as Language;

  return (
    <Container>
      <Label htmlFor="category">{t("UPLOAD.CATEGORY")} </Label>
      <CategoryWrapper>
        {TYPING_CATEGORIES.map((category) => (
          <CategoryBtn
            key={category.value}
            $isSelected={selectedCategory?.value === category.value}
            onClick={() => onCategoryClick(category)}
          >
            {getCategoryLabel(category, language)}
          </CategoryBtn>
        ))}
      </CategoryWrapper>
    </Container>
  );
};

export default CategoryField;
