import EmailInput from "@/components/features/auth/EmailField";
import PasswordField from "@/components/features/auth/PasswordField";
import { AuthTitle, Button } from "@/styles/auth.styles";
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
      <AuthTitle>Sign Up</AuthTitle>
      <form onSubmit={onSubmit} className="mt-8 space-y-6">
        <div className="space-y-4">
          <EmailInput
            id="signupEmail"
            value={formData.email}
            onChange={onChange}
          />
          <PasswordField
            id="signupPassword"
            value={formData.password}
            onChange={onChange}
          />
          <PasswordField
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
