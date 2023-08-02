import {usePathname} from "next/navigation";
import {navigation} from "../components/Sidebar/Navigation";
import {NavigationItem, NextNavigation} from "@kabisa-assessment/types";


export default function useNavigation() {
  const pathname = usePathname();

  return navigation.map((item: NavigationItem): NextNavigation => {

    return {
      ...item,
      current: pathname === item.href
    }
  });


}
