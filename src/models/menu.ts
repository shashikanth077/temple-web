export interface Menu {
    menuId:number;
    link: string;
    title: string;
    isDropdown:boolean;
    dropdownItem:[{
        link: string;
        title:string;
    }]
  }

export type AdminMenuItemTypes = {
    key: string;
    label: string;
    isTitle?: boolean;
    roles:string[];
    icon?: string;
    url?: string;
    badge?: {
        variant: string;
        text: string;
    };
    parentKey?: string;
    target?: string;
    children?: AdminMenuItemTypes[];
};
