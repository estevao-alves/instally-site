'use client'

import Header from "@/components/Header";
import SearchSection from "@/sections/search";
import Footer from "@/components/Footer";
import Head from "next/head";

export default function Search() {
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
            <SearchSection/>
            <Footer/>
        </>
    )
};