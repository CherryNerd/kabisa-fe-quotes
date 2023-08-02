import classNames from "classnames";
import {FoldableSidebar} from "./Foldable";
import {navigation} from "./Navigation";
import {StaticSidebar} from "./Static";

interface SidebarProps {
  children: React.ReactNode
}

export function Sidebar({children}: SidebarProps) {

  return (
    <>
      <>
        <FoldableSidebar/>
        <StaticSidebar/>


        {children}
      </>
    </>
  )
}
