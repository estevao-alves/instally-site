import type {Metadata} from 'next'
import {Poppins} from 'next/font/google'

import GlobalStyle from '@/styles/globals'
import StyledComponentsRegistry from '@/styles/styleRegistry'
import ApplicationProvider from '@/context/ApplicationContext';
import Head from "next/head";

const font = Poppins({
    subsets: ["latin"],
    weight: ["300", "500", "700", "900"],
    variable: "--font-family"
});

export const metadata: Metadata = {
    title: 'Instally',
}

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
        <Head>
            <script
                async
                dangerouslySetInnerHTML={{
                    __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                        })(window,document,'script','dataLayer','GTM-5KW5FQ7N');`,
                }}
            />
        </Head>
        <body className={font.className}>
        <noscript>
            <iframe
                src="https://www.googletagmanager.com/ns.html?id=GTM-5KW5FQ7N"
                height="0"
                width="0"
                style={{ display: 'none', visibility: 'hidden' }}
            ></iframe>
        </noscript>

        <StyledComponentsRegistry>
            <ApplicationProvider>
                {children}
                <GlobalStyle />
            </ApplicationProvider>
        </StyledComponentsRegistry>
        </body>
        </html>
    );
}
