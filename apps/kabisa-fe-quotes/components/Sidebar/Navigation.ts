import {NavigationItem} from "@kabisa-assessment/types";
import {HashtagIcon, QueueListIcon, TrophyIcon} from "@heroicons/react/24/outline";

export const navigation: NavigationItem[] = [
  {name: 'Random', href: '/', icon: HashtagIcon},
  {name: 'Recent', href: '/recent', icon: QueueListIcon},
  {name: 'Top10', href: '/top10', icon: TrophyIcon},
]


