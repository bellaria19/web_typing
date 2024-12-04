export interface UploadFormData {
  content: string;
  description: string;
  type: UploadType;
  category: Category | undefined;
}

export interface CategoryLabel {
  ko: string;
  en: string;
}

export interface Category {
  value: string;
  label: CategoryLabel;
}

export interface UploadType {
  value: string;
  label: string;
}
