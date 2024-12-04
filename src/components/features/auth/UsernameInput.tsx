import { Input, Label } from "@/styles/auth.styles";

interface UsernameInputProps {
  id?: string;
  name?: string;
  placeholder?: string;
  required?: boolean;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const UsernameInput = ({
  id = "username",
  name = "username",
  placeholder = "Username",
  required = true,
  value,
  onChange,
}: UsernameInputProps) => {
  return (
    <div>
      <Label htmlFor={id}>Username</Label>
      <Input
        id={id}
        name={name}
        type="text"
        required={required}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default UsernameInput;
