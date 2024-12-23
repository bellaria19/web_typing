import { createBrowserRouter, Navigate } from "react-router-dom";
import Root from "./Root.tsx";
import Typing from "@/pages/Typing.tsx";
import Account from "@/pages/Account.tsx";
import Login from "@/pages/Auth.tsx";
// import Settings from "@/pages/Setting.tsx";
// import Upload from "@/pages/Upload.tsx";
import ProtectedSettings from "@/components/protected/ProtectedSettings";
import ProtectedUpload from "@/components/protected/ProtectedUpload";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <Navigate to="/typing" replace />,
      },
      {
        path: "typing",
        element: <Typing />,
      },
      {
        path: "settings",
        element: <ProtectedSettings />,
        // element: <Settings />,
      },
      {
        path: "upload",
        element: <ProtectedUpload />,
        // element: <Upload />,
      },
      {
        path: "account",
        element: <Account />,
      },
      {
        path: "login",
        element: <Login />,
      },
    ],
  },
]);

export default router;
