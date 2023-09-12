interface MenuEntry {
  key: string;
  label: string;
  icon: string;
  roles: string[];
  path?: string;
  children?: MenuEntry[];
}

export const findKeysForPath = (menus: MenuEntry[], targetPath: string): string[] => {
  for (let menu of menus) {
    if (menu.path === targetPath) {
      return [menu.key];
    }

    if (menu.children) {
      for (let child of menu.children) {
        if (child.path === targetPath) {
          return [menu.key, child.key];
        }
      }
    }
  }

  return [];
};

export const filterMenuByRole = (menuArray: MenuEntry[], role: string): MenuEntry[] => {
  if (!role) return menuArray;
  const filterChildren = (childrenList: MenuEntry[] | undefined): MenuEntry[] => {
    const filteredChildren: MenuEntry[] = [];
    if (childrenList) {
      for (const child of childrenList) {
        if (child.roles?.includes(role)) {
          if (child.children) {
            child.children = filterChildren(child.children);
          }
          filteredChildren.push(child);
        }
      }
    }
    return filteredChildren;
  };

  const filteredMenu: MenuEntry[] = [];
  for (const item of menuArray) {
    if (item.roles?.includes(role)) {
      if (item.children) {
        item.children = filterChildren(item.children);
      }
      filteredMenu.push(item);
    }
  }
  return filteredMenu;
};
