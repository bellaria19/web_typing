import { Input } from "@/styles/auth.styles";
import { Label } from "@/styles/common.styles";

interface UsernameFieldProps {
  id?: string;
  name?: string;
  placeholder?: string;
  required?: boolean;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const UsernameField = ({
  id = "username",
  name = "username",
  placeholder = "Username",
  required = true,
  value,
  onChange,
}: UsernameFieldProps) => {
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

export default UsernameField;
