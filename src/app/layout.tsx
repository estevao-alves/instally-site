import type {Metadata} from 'next'
import {Poppins} from 'next/font/google'

import GlobalStyle from '@/styles/globals'
import StyledComponentsRegistry from '@/styles/styleRegistry'
import ApplicationProvider from '@/context/ApplicationContext';
import {GoogleAnalytics, GoogleTagManager} from '@next/third-parties/google'
import Head from "next/head";

const font = Poppins({
    subsets: ["latin"],
    weight: ["300", "500", "700", "900"],
    variable: "--font-family"
});

export const metadata: Metadata = {
    title: 'Instally',
    description: 'Instally is a GUI interface for WinGet designed to simplify the application installation process.',
}

export default function RootLayout({children,} : {children: React.ReactNode;}) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={`${font.className} ${font.variable}`}>
                <StyledComponentsRegistry>
                    <ApplicationProvider>
                        {children}
                        <GlobalStyle />
                    </ApplicationProvider>
                </StyledComponentsRegistry>

                <GoogleAnalytics gaId="G-9NX7LLG46T" />
                <GoogleTagManager gtmId="GTM-5KW5FQ7N" />
            </body>
        </html>
    );
}
