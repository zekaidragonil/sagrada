import { useTranslation } from 'next-i18next';
import Link from 'next/link';

interface MenuItemType {
    href: string;
    label: string;
    children?: MenuItemType[]; 
}

interface MenuItemProps {
    href: string;
    label: string;
    children?: React.ReactNode; 
}

const MenuItem = ({ href, label, children }: MenuItemProps) => (
    label !== "" && (
        <li className={children ? "dropdown" : ""}>
            <Link href={href}>{label}</Link>
            {children && <ul>{children}</ul>}
        </li>
    )
);

interface SubMenuProps {
    items: MenuItemType[]; 
}

const SubMenu = ({ items }: SubMenuProps) => (
    <>
        {items.map((item, index) => (
            <MenuItem key={index} href={item.href} label={item.label}>
                {item.children && <SubMenu items={item.children} />}
            </MenuItem>
        ))}
    </>
);

export default function Menu() {
    const { t } = useTranslation('translation');
    const menuItems: MenuItemType[] = [
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
        <ul className="navigation clearfix">
            <SubMenu items={menuItems} />
        </ul>
    );
}
