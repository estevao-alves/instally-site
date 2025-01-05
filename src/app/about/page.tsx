'use client'

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Section1 from "@/sections/sobre/Section1";
import Section2 from "@/sections/sobre/Section2";
import Section3 from "@/sections/sobre/Section3";
import Head from "next/head";

export default function Sobre() {
    return (
        <>
            {/* Google Tag Manager (gtag.js) */}
            <Head>
                <script async src="https://www.googletagmanager.com/gtag/js?id=G-W739EE488P"></script>
                <script>
                    {`
                        window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments);}
                        gtag('js', new Date());
                        gtag('config', 'G-W739EE488P');
                    `}
                </script>
            </Head>

            <Header/>
            <Section1/>
            <Section2/>
            <Section3/>
            <Footer/>
        </>
    )
};