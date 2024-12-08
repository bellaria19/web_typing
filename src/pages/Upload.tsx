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
import { uploadService } from "@/services/uploadService";

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

    if (!user) {
      alert("로그인이 필요한 기능입니다.");
      return;
    }

    if (!uploadData.content || !uploadData.description || !category || !type) {
      alert("모든 필드를 입력해주세요.");
      return;
    }

    if (type.value !== "short" && type.value !== "long") {
      alert("현재 short와 long 타입만 업로드 가능합니다.");
      return;
    }

    const success = await uploadService.uploadContent({
      content: uploadData.content,
      description: uploadData.description,
      category: category,
      type: type,
      user_id: user.id,
    });

    if (success) {
      alert("업로드가 완료되었습니다.");
      // 입력 필드 초기화
      setUploadData({
        content: "",
        description: "",
        category: undefined,
        type: { value: "word", label: "Word" },
      });
      setCategory(undefined);
      setType(undefined);
    } else {
      alert("업로드 중 오류가 발생했습니다.");
    }
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
