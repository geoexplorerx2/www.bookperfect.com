
export interface NavigationItemType {
  id: string;
  name: string;
  isNew?: boolean;
  href: string;
  targetBlank?: boolean;
  children?: NavigationItemType[];
  type?: "dropdown" | "none";
  icon?: any;
};
