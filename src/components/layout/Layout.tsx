'use client'
import {ReactNode, useEffect } from "react";
import Aos from "aos";
import 'aos/dist/aos.css';
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";


interface LayoutProps {
children: ReactNode; 
}
    

const Layout: React.FC<LayoutProps> = ({ children }) => {
    useEffect(() => {
        Aos.init({ duration: 500 });
    }, []);

    return (
        <>
            <Header />
            {children}
            <Footer />
        </>
    )



}

export default Layout;