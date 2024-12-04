// import { useLanguageStore } from "@/store/languageStore";
// import { useText } from "@/hooks/useText";
import { Container, Label } from "@/styles/common.styles";
import { Category } from "@/types/upload";
import { TYPING_CATEGORIES, getCategoryLabel } from "@/constants/categories";
import { CategoryWrapper, CategoryBtn } from "@/styles/upload.styles";

interface CategoryFieldProps {
  selectedCategory: Category | undefined;
  onCategoryClick: (category: Category) => void;
}

const CategoryField = ({
  selectedCategory,
  onCategoryClick,
}: CategoryFieldProps) => {
  const language = "ko";
  // const { language } = useLanguageStore();
  // const text = useText();

  return (
    <Container>
      {/* <Label>{text.UPLOAD.CATEGORY}</Label> */}
      <Label>Category</Label>
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
