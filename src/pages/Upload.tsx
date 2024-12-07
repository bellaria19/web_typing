import CategoryField from "@/components/features/upload/CategoryField";
import ContentField from "@/components/features/upload/ContentField";
import DescriptionField from "@/components/features/upload/DescriptionField";
import TypeField from "@/components/features/upload/TypeField";
import UploadHeader from "@/components/features/upload/UploadHeader";
import { useAuth } from "@/hooks/useAuth";
import { Wrapper } from "@/styles/common.styles";
import { UploadBtn, UploadContainer } from "@/styles/upload.styles";
import { Category, UploadFormData, UploadType } from "@/types/upload";
import { ChangeEvent, FormEvent, useState } from "react";

const Upload = () => {
  const [uploadData, setUploadData] = useState<UploadFormData>({
    content: "",
    description: "",
    category: undefined,
    type: { value: "word", label: "Word" },
  });
  const [type, setType] = useState<UploadType>();
  const [category, setCategory] = useState<Category | undefined>();
  const { user } = useAuth();

  const handleUpload = async (e: FormEvent) => {
    e.preventDefault();
  };

  const handleCategory = (category: Category) => {
    setCategory(category);
  };

  const handleType = (type: UploadType) => {
    setType(type);
  };

  const handleContentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const content = e.target.value;
    if (content.length > 1000) return;
    setUploadData((prev) => ({ ...prev, content }));
  };

  const handleDescriptionChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const description = e.target.value;
    if (description.length > 1000) return;
    setUploadData((prev) => ({ ...prev, description }));
  };

  return (
    <Wrapper>
      <UploadHeader />
      <UploadContainer>
        <ContentField
          content={uploadData.content}
          onChange={handleContentChange}
        />
        <DescriptionField
          description={uploadData.description}
          onChange={handleDescriptionChange}
        />
        <CategoryField
          selectedCategory={category}
          onCategoryClick={handleCategory}
        />
        <TypeField selectedType={type} onTypeClick={handleType} />

        <UploadBtn onClick={handleUpload}>Upload</UploadBtn>
      </UploadContainer>
    </Wrapper>
  );
};

export default Upload;
