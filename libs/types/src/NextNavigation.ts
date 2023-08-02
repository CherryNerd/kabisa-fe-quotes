export interface NavigationItem {
  name: string;
  href: string;
  icon?: any;
}

export interface NextNavigation extends NavigationItem {
  current: boolean;
}
