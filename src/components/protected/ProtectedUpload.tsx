import { withAuthProtection } from "@/components/common/withAuthProtection";
import Upload from "@/pages/Upload";

const ProtectedUpload = withAuthProtection(Upload);

export default ProtectedUpload;
