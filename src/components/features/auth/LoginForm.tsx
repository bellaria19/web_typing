import EmailField from "@/components/features/auth/EmailField";
import PasswordField from "@/components/features/auth/PasswordField";
import { AuthTitle, Button } from "@/styles/auth.styles";
import { LoginFormData } from "@/types/auth";

interface LoginFormProps {
  formData: LoginFormData;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  error?: string;
}

const LoginForm = ({ formData, onChange, onSubmit, error }: LoginFormProps) => {
  return (
    <div className="p-8 space-y-8">
      <AuthTitle>Login</AuthTitle>
      <form onSubmit={onSubmit} className="mt-4 space-y-4">
        <EmailField value={formData.email} onChange={onChange} />
        <PasswordField value={formData.password} onChange={onChange} />
        {error && <div className="text-sm text-red-500">{error}</div>}
        <Button type="submit">Login</Button>
      </form>
    </div>
  );
};

export default LoginForm;
