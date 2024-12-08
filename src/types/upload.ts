export interface UploadFormData {
  content: string;
  description: string;
  category: Category | undefined;
  type: UploadType;
}

export interface UploadData extends UploadFormData {
  user_id: string;
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
