import { HomeIcon, PackageIcon } from "lucide-react";
import Index from "./pages/Index.jsx";
import ManageProducts from "./pages/ManageProducts.jsx";

export const navItems = [
  {
    title: "หน้าหลัก",
    to: "/",
    icon: <HomeIcon className="h-4 w-4" />,
    page: <Index />,
  },
  {
    title: "จัดการสินค้า",
    to: "/manage",
    icon: <PackageIcon className="h-4 w-4" />,
    page: <ManageProducts />,
  },
];
