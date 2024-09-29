'use client'
import { PUBLIC_ASSETS } from "@/config/common.config";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import LanguageDropdown from "./LanguageDropdown";
import Menu from "./Menu";
import MobileMenu from "./MobileMenu";


export default function Header() {
    const [isSidebar, setIsSidebar] = useState(false);
    const environment = process.env.NODE_ENV;


    const handleSidebar = () => {
        setIsSidebar(!isSidebar);
    };

    useEffect(() => {
        console.log(`Running in ${environment} mode`);
        console.log(`App version: 1.0.3`);
    }, [environment]);


    return (
        <header className="header-area" id="#top">
            <div className="container lg container_menu">
                <div className="row g-3 align-items-center">
                    <div className="header__wrap d-flex d-md-none">
                        <div className="bar d-flex d-md-none">
                            <button className="bar-icon siteBar-btn" aria-label="Toggle Sidebar"
                                onClick={() => handleSidebar()}
                            >
                                <span></span>
                            </button>
                        </div>
                        <div className="logo-area">
                            <Link href="/">
                                <Image
                                    src={PUBLIC_ASSETS.logo}
                                    alt="logo"
                                    className="logo-mobile"
                                    priority={true}
                                    width={121}
                                    height={43}
                                    placeholder="blur"
                                    blurDataURL="LABM_P~qIUt74nM{t7WB00D%t7WB"

                                />
                            </Link>
                        </div>
                        <div className="header__right">
                            <LanguageDropdown />
                        </div>
                    </div>
                    <div className="col-lg-2 col-md-3 col-6 d-none d-md-block">
                        <div className="logo-area">
                            <Link href="/">
                                <Image
                                    src={PUBLIC_ASSETS.logo}
                                    alt="logo"
                                    className="lazy"
                                    priority={true}
                                    width={187}
                                    height={67}
                                    placeholder="blur"
                                    blurDataURL="LABM_P~qIUt74nM{t7WB00D%t7WB" // BlurHash string
                                />
                            </Link>
                        </div>
                    </div>
                    <div className="col-lg-8 col-md-7  d-none d-md-block text-right">
                        <div className="menu-area">
                            <nav>
                                <Menu />
                            </nav>
                        </div>
                    </div>
                    <div className="col-4 col-lg-2 col-md-2 d-none d-md-block">
                        <div className="header__right">
                            <LanguageDropdown />
                        </div>
                    </div>
                </div>
            </div>

            <MobileMenu
                isSidebar={isSidebar}
                handleSidebar={handleSidebar} />
        </header>
    );
}
