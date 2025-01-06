'use client'

import Header from '@/components/Header'
import S1 from '@/sections/home/Section1'
import S2 from '@/sections/home/Section2'
import S3 from '@/sections/home/Section3'
import S4 from '@/sections/home/Section4'
import S5 from '@/sections/home/Section5'
import Footer from '@/components/Footer'
import {GoogleAnalytics} from "@next/third-parties/google";

export default function Home() {

    return (
        <>
            <Header/>
            <S1/>
            <S2/>
            <S3/>
            <S4/>
            <S5/>
            <Footer/>
        </>
    )
}