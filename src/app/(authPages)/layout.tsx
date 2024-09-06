import SideMenu from "@/components/ui/SideMenu";
import { NavItemsProps } from "@/types";
import { ReactNode } from "react";
import { BiStar } from "react-icons/bi";
import { BsCardChecklist } from "react-icons/bs";

const navItems: NavItemsProps[] = [
  {
    href: "/panel/influencers",
    label: "Influenciadores",
    icon: <BsCardChecklist size={20} />
  },
  {
    href: "/panel/brands",
    label: "Marcas",
    icon: <BiStar size={20} />
  }
]

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <SideMenu items={navItems}>
      {children}
    </SideMenu>
  )
}