import { Language } from "@/types/language";
import { Category } from "@/types/upload";

export const TYPING_CATEGORIES: Category[] = [
  {
    value: "novel",
    label: {
      ko: "소설",
      en: "Novel",
    },
  },
  {
    value: "essay",
    label: {
      ko: "에세이",
      en: "Essay",
    },
  },
  {
    value: "humanities",
    label: {
      ko: "인문",
      en: "Humanities",
    },
  },
  {
    value: "science",
    label: {
      ko: "과학",
      en: "Science",
    },
  },
  {
    value: "social",
    label: {
      ko: "사회",
      en: "Social",
    },
  },
  {
    value: "art",
    label: {
      ko: "예술",
      en: "Art",
    },
  },
  {
    value: "lifestyle",
    label: {
      ko: "라이프스타일",
      en: "Lifestyle",
    },
  },
  {
    value: "business",
    label: {
      ko: "비즈니스",
      en: "Business",
    },
  },
  {
    value: "self_development",
    label: {
      ko: "자기계발",
      en: "Self Development",
    },
  },
  {
    value: "travel",
    label: {
      ko: "여행",
      en: "Travel",
    },
  },
  {
    value: "history",
    label: {
      ko: "역사",
      en: "History",
    },
  },
  {
    value: "philosophy",
    label: {
      ko: "철학",
      en: "Philosophy",
    },
  },
  {
    value: "psychology",
    label: {
      ko: "심리",
      en: "Psychology",
    },
  },
  {
    value: "technology",
    label: {
      ko: "기술",
      en: "Technology",
    },
  },
  {
    value: "health",
    label: {
      ko: "건강",
      en: "Health",
    },
  },
  {
    value: "education",
    label: {
      ko: "교육",
      en: "Education",
    },
  },
  {
    value: "environment",
    label: {
      ko: "환경",
      en: "Environment",
    },
  },
  {
    value: "food",
    label: {
      ko: "음식",
      en: "Food",
    },
  },
  {
    value: "sports",
    label: {
      ko: "스포츠",
      en: "Sports",
    },
  },
  {
    value: "entertainment",
    label: {
      ko: "엔터테인먼트",
      en: "Entertainment",
    },
  },
  {
    value: "culture",
    label: {
      ko: "문화",
      en: "Culture",
    },
  },
  {
    value: "religion",
    label: {
      ko: "종교",
      en: "Religion",
    },
  },
  {
    value: "politics",
    label: {
      ko: "정치",
      en: "Politics",
    },
  },
  {
    value: "economics",
    label: {
      ko: "경제",
      en: "Economics",
    },
  },
  {
    value: "medicine",
    label: {
      ko: "의학",
      en: "Medicine",
    },
  },
];

export const getCategoryLabel = (category: Category, language: Language) => {
  return category.label[language];
};
