import EmailInput from "@/components/features/auth/EmailField";
import PasswordInput from "@/components/features/auth/PasswordField";
import { Title, Button } from "@/styles/auth.styles";
import { SignUpFormData } from "@/types/auth";

interface SignUpFormProps {
  formData: SignUpFormData;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  error?: string;
}

const SignUpForm = ({
  formData,
  onChange,
  onSubmit,
  error,
}: SignUpFormProps) => {
  return (
    <div className="p-8 space-y-8">
      <Title>Sign Up</Title>
      <form onSubmit={onSubmit} className="mt-8 space-y-6">
        <div className="space-y-4">
          <EmailInput
            id="signupEmail"
            value={formData.email}
            onChange={onChange}
          />
          <PasswordInput
            id="signupPassword"
            value={formData.password}
            onChange={onChange}
          />
          <PasswordInput
            id="confirmPassword"
            name="confirmPassword"
            placeholder="Password Confirm"
            value={formData.confirmPassword}
            onChange={onChange}
          />
        </div>
        {error && <div className="text-sm text-red-500">{error}</div>}
        <Button type="submit">Sign Up</Button>
      </form>
    </div>
  );
};

export default SignUpForm;
