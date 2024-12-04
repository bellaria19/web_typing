import { Input } from "@/styles/auth.styles";
import { Label } from "@/styles/common.styles";

interface PasswordInputProps {
  id?: string;
  name?: string;
  placeholder?: string;
  required?: boolean;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const PasswordField = ({
  id = "loginPassword",
  name = "password",
  placeholder = "Password",
  required = true,
  value,
  onChange,
}: PasswordInputProps) => {
  return (
    <div>
      <Label htmlFor={id}>Password</Label>
      <Input
        id={id}
        name={name}
        type="password"
        required={required}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default PasswordField;
