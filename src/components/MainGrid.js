'use client';

import { useState, useRef } from 'react';
import About from '@/components/About';
import Contact from '@/components/Contact';
import Intro from '@/components/Intro';
import Nav from '@/components/Nav';
import Portrait from '@/components/Portrait';
import Socials from '@/components/Socials';
import Work from '@/components/Work';
import { useGlobalTimeline } from '@/hooks/useAnimation';
import LoadingBar from '@/components/LoadingBar';
import { DISABLE_LOADING_ANIMATION } from '@/config';

export default function MainGrid({ data = {} }) {
  const [loaded, setLoaded] = useState(DISABLE_LOADING_ANIMATION);
  const tl = useGlobalTimeline(loaded);

  // State for toggling Impressum text
  const [isImpressumActive, setIsImpressumActive] = useState(false);

  // Ref for the About section
  const aboutRef = useRef(null);

  // Function to toggle Impressum state
  const toggleImpressum = () => {
    setIsImpressumActive(!isImpressumActive);

    // Scroll to the About section
    if (aboutRef.current) {
      aboutRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  // Legal content styled with Tailwind
  const impressumDetails = `
    <div class="h-full overflow-y-auto pr-2">
      <div class="space-y-6 text-sm leading-relaxed text-gray-800">
        <div>
          <h2 class="text-lg font-bold mb-3">📄 Impressum</h2>
          <p class="mb-4"><strong>Angaben gemäß § 5 TMG</strong></p>
          <address class="not-italic">
            <p class="mb-1">Alpine Development</p>
            <p class="mb-1">Inhaber: Mohammed Hawrami</p>
            <p class="mb-1">St.-Veit-Str. 26</p>
            <p class="mb-4">81673 München, Deutschland</p>
          </address>
        </div>

        <div>
          <h3 class="font-bold mb-2">Kontakt</h3>
          <p class="mb-1">E-Mail: <a href="mailto:info@alpine-dev.de" class="text-blue-600 hover:underline">info@alpine-dev.de</a></p>
          <p class="mb-4">Telefon: <a href="tel:08955916536" class="text-blue-600 hover:underline">089 55916536</a></p>
        </div>

        <div>
          <h3 class="font-bold mb-2">Umsatzsteuer-ID</h3>
          <p class="mb-4">Keine Umsatzsteuer-Identifikationsnummer gemäß §27a UStG angegeben.</p>
        </div>

        <div>
          <h3 class="font-bold mb-2">Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV:</h3>
          <p class="mb-1">Mohammed Hawrami</p>
          <p class="mb-1">St.-Veit-Str. 26</p>
          <p class="mb-6">81673 München</p>
        </div>

        <div class="mb-6">
          <p class="mb-2">Plattform der EU-Kommission zur Online-Streitbeilegung:</p>
          <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:underline">https://ec.europa.eu/consumers/odr/</a>
          <p class="mt-2">Wir sind nicht verpflichtet und nicht bereit, an einem Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.</p>
        </div>

        <div>
          <h2 class="text-lg font-bold mb-3">🔐 Datenschutzerklärung</h2>
          
          <h3 class="font-bold mt-4 mb-2">1. Allgemeine Hinweise</h3>
          <p class="mb-4">Diese Datenschutzerklärung informiert Sie über die Art, den Umfang und den Zweck der Verarbeitung personenbezogener Daten auf unserer Website alpine-dev.de.</p>
          
          <h3 class="font-bold mt-4 mb-2">2. Verantwortlicher</h3>
          <p class="mb-1">Mohammed Hawrami</p>
          <p class="mb-1">Alpine Development</p>
          <p class="mb-1">St.-Veit-Str. 26</p>
          <p class="mb-4">81673 München</p>
          <p class="mb-4">E-Mail: <a href="mailto:info@alpine-dev.de" class="text-blue-600 hover:underline">info@alpine-dev.de</a></p>
          
          <h3 class="font-bold mt-4 mb-2">3. Hosting</h3>
          <p class="mb-4">Unsere Website wird bei Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, USA gehostet. Die Datenverarbeitung erfolgt auf Grundlage eines Auftragsverarbeitungsvertrags gemäß Art. 28 DSGVO. Weitere Informationen finden Sie in der <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:underline">Datenschutzerklärung von Vercel</a>.</p>
          
          <h3 class="font-bold mt-4 mb-2">4. Server-Logfiles</h3>
          <p class="mb-2">Beim Aufruf unserer Website erhebt Vercel automatisch Informationen in sogenannten Server-Logfiles. Diese Daten umfassen:</p>
          <ul class="list-disc pl-5 mb-4">
            <li>IP-Adresse (ggf. anonymisiert)</li>
            <li>Datum und Uhrzeit des Zugriffs</li>
            <li>Browsertyp und -version</li>
            <li>verwendetes Betriebssystem</li>
            <li>Referrer-URL</li>
            <li>aufgerufene Seiten</li>
          </ul>
          <p class="mb-4">Die Verarbeitung dieser Daten erfolgt gemäß Art. 6 Abs. 1 lit. f DSGVO zur Wahrung unseres berechtigten Interesses an einem sicheren und stabilen Betrieb der Website.</p>
          
          <h3 class="font-bold mt-4 mb-2">5. Kontaktmöglichkeiten</h3>
          <p class="mb-2">Sie können uns über folgende Wege kontaktieren:</p>
          <ul class="list-disc pl-5 mb-4">
            <li>E-Mail via <a href="mailto:info@alpine-dev.de" class="text-blue-600 hover:underline">info@alpine-dev.de</a></li>
            <li>Telefon (falls angegeben)</li>
            <li>WhatsApp (Weiterleitung via Button)</li>
            <li>Instagram (externer Link zu unserem Profil)</li>
          </ul>
          <p class="mb-4">Bei Kontaktaufnahme werden die von Ihnen übermittelten Daten (z. B. Name, Telefonnummer, E-Mail-Adresse) zur Bearbeitung Ihrer Anfrage verarbeitet. Die Verarbeitung erfolgt gemäß Art. 6 Abs. 1 lit. b DSGVO (Vertragserfüllung) oder Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse).</p>
          
          <h3 class="font-bold mt-4 mb-2">6. Weiterleitungen zu Drittplattformen</h3>
          <p class="mb-4">Unsere Website verlinkt zu externen Diensten wie WhatsApp und Instagram. Beim Klick auf einen entsprechenden Button verlassen Sie unsere Website und unterliegen den Datenschutzbestimmungen des jeweiligen Anbieters.</p>
          
          <h3 class="font-bold mt-4 mb-2">7. Vercel Analytics</h3>
          <p class="mb-4">Sofern Vercel Analytics aktiv ist, wird das Verhalten der Nutzer (z. B. Seitenaufrufe, Aufenthaltsdauer) in anonymisierter Form erfasst. Es werden keine personenbezogenen Daten gespeichert oder an Dritte weitergegeben. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an der Verbesserung unseres Webangebots).</p>
          
          <h3 class="font-bold mt-4 mb-2">8. Ihre Rechte</h3>
          <p class="mb-2">Sie haben jederzeit das Recht auf:</p>
          <ul class="list-disc pl-5 mb-4">
            <li>Auskunft gemäß Art. 15 DSGVO</li>
            <li>Berichtigung gemäß Art. 16 DSGVO</li>
            <li>Löschung gemäß Art. 17 DSGVO</li>
            <li>Einschränkung der Verarbeitung gemäß Art. 18 DSGVO</li>
            <li>Datenübertragbarkeit gemäß Art. 20 DSGVO</li>
            <li>Widerspruch gemäß Art. 21 DSGVO</li>
          </ul>
          
          <h3 class="font-bold mt-4 mb-2">9. Beschwerderecht</h3>
          <p class="mb-4">Sie haben das Recht, sich bei einer Datenschutzaufsichtsbehörde zu beschweren, wenn Sie der Meinung sind, dass die Verarbeitung Ihrer Daten gegen die DSGVO verstößt.</p>
          
          <h3 class="font-bold mt-4 mb-2">10. Änderungen dieser Datenschutzerklärung</h3>
          <p class="mb-4">Wir behalten uns vor, diese Datenschutzerklärung bei Bedarf anzupassen, z. B. bei rechtlichen Änderungen oder neuen Funktionen auf der Website.</p>
        </div>
      </div>
    </div>
  `;

  return (
    <>
      {!DISABLE_LOADING_ANIMATION && (
        <LoadingBar onFinish={() => setLoaded(true)} />
      )}

      {/* Bento Grid */}
      <div className='grid h-screen max-h-[75rem] min-h-[50rem] grid-cols-12 grid-rows-10 gap-4 p-4 max-lg:h-auto max-lg:max-h-none max-lg:grid-rows-none max-lg:py-6'>
        <div className='col-span-full row-span-1'>
          <Nav data={data?.nav} timeline={tl} />
        </div>

        {/* Left column */}
        <div className='col-span-8 row-span-9 grid grid-cols-subgrid grid-rows-subgrid max-lg:col-span-full max-lg:grid-rows-none max-lg:gap-4'>
          <div className='col-span-5 row-span-5 max-lg:col-span-8 max-md:col-span-full'>
            <Intro data={data?.intro} timeline={tl} />
          </div>

          <div className='col-span-3 row-span-5 max-lg:col-span-4 max-md:col-span-full'>
            <Portrait data={data?.portrait} timeline={tl} />
          </div>

          <div
            ref={aboutRef} // Attach the ref to the About section
            className='col-span-4 row-span-4 max-lg:col-span-6 max-lg:min-h-[20rem] max-md:col-span-full'
          >
            {/* Pass toggled Impressum content to About component */}
            <About
              data={{
                ...data?.about,
                text: isImpressumActive ? impressumDetails : data?.about?.text,
              }}
              timeline={tl}
              isImpressumActive={isImpressumActive}
            />
          </div>

          <div className='col-span-4 row-span-4 max-lg:col-span-6 max-lg:min-h-[20rem] max-md:hidden'>
            <Contact data={data?.contact} timeline={tl} />
          </div>
        </div>

        {/* Right column */}
        <div className='col-span-4 row-span-9 grid grid-cols-subgrid grid-rows-subgrid max-lg:col-span-full max-lg:grid-rows-none max-lg:gap-4'>
          <div className='col-span-4 row-span-8 max-lg:col-span-full'>
            <Work data={data?.work} timeline={tl} />
          </div>

          <div className='col-span-full hidden max-lg:min-h-[20rem] max-md:block'>
            <Contact data={data?.contact} timeline={tl} />
          </div>

          <div className='col-span-4 row-span-1 max-lg:col-span-full max-lg:min-h-[5rem]'>
            {/* Pass toggle handler to Socials */}
            <Socials
              data={data?.socials}
              timeline={tl}
              onImpressumClick={toggleImpressum}
              isImpressumActive={isImpressumActive}
            />
          </div>
        </div>
      </div>
    </>
  );
}
