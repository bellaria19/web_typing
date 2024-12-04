import { UploadType } from "@/types/upload";

export const UPLOAD_TYPES: UploadType[] = [
  { value: "word", label: "Word" },
  { value: "short", label: "Short" },
  { value: "long", label: "Long" },
  { value: "quote", label: "Quote" },
  { value: "proverb", label: "Proverb" },
];

export const getUploadTypeLabel = (type: UploadType) => {
  return type.label;
};
