'use client';

import { useState } from "react";
import { useTranslation } from 'next-i18next';

import Link from "next/link";

interface MenuItemProps {
  href: string;
  label: string;
  isActive: { key: string; };
  handleToggle: (key: string, subMenuKey?: string) => void;
  children?: React.ReactNode;
}
interface MenuItem {
  href: string;
  label: string;
  children?: MenuItem[];
}


interface SubMenuProps {
  items: MenuItem[];
  isActive: { key: string; };
  handleToggle: (key: string, subMenuKey?: string) => void;
}

interface MobileMenuProps {
  isSidebar: boolean;
  handleSidebar: () => void;
}

const MenuItem: React.FC<MenuItemProps> = ({ href, label, isActive, handleToggle, children }) => (
  <li className={isActive.key === href ? "dropdown current" : "dropdown"}>
    <Link href={href} onClick={() => handleToggle(href)}>{label}</Link>
    {children && <ul>{children}</ul>}
    <div className={"dropdown-btn"} onClick={() => handleToggle(href)}>
    </div>
  </li>
);

const SubMenu: React.FC<SubMenuProps> = ({ items, isActive, handleToggle }) => (
  <>
    {items.map((item, index) => (
      <MenuItem key={index} href={item.href} label={item.label} isActive={isActive} handleToggle={handleToggle}>
        {item.children && <SubMenu items={item.children} isActive={isActive} handleToggle={handleToggle} />}
      </MenuItem>
    ))}
  </>
);

const MobileMenu: React.FC<MobileMenuProps> = ({ isSidebar, handleSidebar }) => {
  const { t } = useTranslation('translation');

  const [isActive, setIsActive] = useState<{ status: boolean; key: string; subMenuKey: string; }>({
    status: false,
    key: "",
    subMenuKey: "",
  });

  const handleToggle = (key: string, subMenuKey: string = "") => {
    if (isActive.key === key && isActive.subMenuKey === subMenuKey) {
      setIsActive({
        status: false,
        key: "",
        subMenuKey: "",
      });
    } else {
      setIsActive({
        status: true,
        key,
        subMenuKey,
      });
    }
  };

  const menuItems = [
    {
      href: "#ticket",
      label: t("menu.opt_1") !== "menu.opt_1" ? t("menu.opt_1") : "",
    },
    {
      href: "#schedules",
      label: t("menu.opt_2") !== "menu.opt_2" ? t("menu.opt_2") : "",
    },
    {
      href: "#map",
      label: t("menu.opt_3") !== "menu.opt_3" ? t("menu.opt_3") : "",
    },
    {
      href: "#rules",
      label: t("menu.opt_4") !== "menu.opt_4" ? t("menu.opt_4") : "",
    },
  ];

  return (
    <>
      <div style={{ marginLeft: isSidebar ? '' : '-400px' }} className="mobile-menu">
        <span onClick={() => handleSidebar()}  className="bars siteBar-btn"><svg className="bi bi-x" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" d="M11.854 4.146a.5.5 0 010 .708l-7 7a.5.5 0 01-.708-.708l7-7a.5.5 0 01.708 0z" clipRule="evenodd" />
          <path fillRule="evenodd" d="M4.146 4.146a.5.5 0 000 .708l7 7a.5.5 0 00.708-.708l-7-7a.5.5 0 00-.708 0z" clipRule="evenodd" />
        </svg></span>
        <nav>
          <ul id="nav">
            <SubMenu items={menuItems} isActive={isActive} handleToggle={handleToggle} />
          </ul>
        </nav>
      </div>
      <div className="offcanvas-overlay"></div>
    </>
  );
};

export default MobileMenu;
