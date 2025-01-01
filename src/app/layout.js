import { DM_Sans, DM_Serif_Display } from 'next/font/google';
import Global from '@/components/Global';
import { LanguageProvider, useLanguage } from '@/context/LanguageContext'; // Importiere LanguageProvider und Hook
import dataDe from '@/data.de.json';
import dataEn from '@/data.en.json'; // Importiere die lokalisierten Daten
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

// Komponente zur Bereitstellung von lokalisierten Daten
function LocalizationProvider({ children }) {
  const { language } = useLanguage(); // Aktuelle Sprache aus dem Kontext
  const localizedData = language === 'de' ? dataDe : dataEn;

  return (
    <LocalizedDataContext.Provider value={localizedData}>
      {children}
    </LocalizedDataContext.Provider>
  );
}

export default function RootLayout({ children }) {
  return (
    <html lang='en' className='hide-scrollbar'>
      <body
        className={`${fontHeading.variable} ${fontBody.variable} antialiased`}
      >
        <LanguageProvider> {/* Umhülle den gesamten Inhalt mit LanguageProvider */}
          <LocalizationProvider> {/* Umhülle mit LocalizationProvider */}
            <Global />
            {children}
          </LocalizationProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
