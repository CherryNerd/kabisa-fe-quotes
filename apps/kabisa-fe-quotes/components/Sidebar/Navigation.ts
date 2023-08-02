import {NextNavigation} from "@kabisa-assessment/types";
import {HomeIcon, TrophyIcon} from "@heroicons/react/24/outline";

export const navigation: NextNavigation[] = [
  {name: 'Home', href: '/', icon: HomeIcon, current: true},
  {name: 'Top10', href: '/top10', icon: TrophyIcon, current: false},
]
