import { Input } from "@/styles/auth.styles";
import { Label } from "@/styles/common.styles";

interface EmailFieldProps {
  id?: string;
  name?: string;
  placeholder?: string;
  required?: boolean;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const EmailField = ({
  id = "loginEmail",
  name = "email",
  placeholder = "Email",
  required = true,
  value,
  onChange,
}: EmailFieldProps) => {
  return (
    <>
      <Label htmlFor={id}>Email</Label>
      <Input
        id={id}
        name={name}
        type="email"
        required={required}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </>
  );
};

export default EmailField;
