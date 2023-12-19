

import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Sidebar from "@/components/sidebar";
import Login from "@/pages/login";
import Angel from "@/pages/angel"
import Cat from "@/pages/cat"


const router = createBrowserRouter([
  {
    path: "/detail",
    element: <div className="grid grid-cols-10 gap-4"><Cat /></div>,
  },
  {
    path: "/",
    element: <div className="grid grid-cols-10 gap-4"><Angel /></div>,
  },
  
]);

// 4️⃣ RouterProvider added
const AppRoutes = () => <RouterProvider router={router} />;

export default AppRoutes;