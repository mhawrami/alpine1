import { DM_Sans, DM_Serif_Display } from 'next/font/google';
import Global from '@/components/Global';
import { LanguageProvider } from '@/context/LanguageContext'; // Importiere LanguageProvider
import './globals.css';

export const metadata = {
  title: 'Alpine Development',
  description:
    'IT-Lösungen für Ihr Business – Von der Idee bis zur Umsetzung',
};

const fontHeading = DM_Serif_Display({
  weight: ['400'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-heading',
});

const fontBody = DM_Sans({
  weight: ['300', '500'],
  style: 'normal',
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-body',
});

export default function RootLayout({ children }) {
  return (
    <html lang='en' className='hide-scrollbar'>
      <body
        className={`${fontHeading.variable} ${fontBody.variable} antialiased`}
      >
        <LanguageProvider> {/* Umhülle den gesamten Inhalt */}
          <Global />
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
