import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'

import GlobalStyle from '@/styles/globals'
import StyledComponentsRegistry from '@/styles/styleRegistry'
import ApplicationProvider from '@/context/ApplicationContext';

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
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body rel='preload' className={font.className}>
        <StyledComponentsRegistry>
          <ApplicationProvider>
            {children}
            <GlobalStyle />
          </ApplicationProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  )
}
