import { withAuthProtection } from "@/components/common/withAuthProtection";
import Settings from "@/pages/Setting";

const ProtectedSettings = withAuthProtection(Settings);

export default ProtectedSettings;
