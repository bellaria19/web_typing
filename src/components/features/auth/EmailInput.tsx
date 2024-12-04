import { Label, Input } from "@/styles/auth.styles";

interface EmailInputProps {
  id?: string;
  name?: string;
  placeholder?: string;
  required?: boolean;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const EmailInput = ({
  id = "loginEmail",
  name = "email",
  placeholder = "Email",
  required = true,
  value,
  onChange,
}: EmailInputProps) => {
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

export default EmailInput;
