import Navbar from '@/components/navbar/Navbar';
import './globals.css';
import Footer from '@/components/footer/Footer';
import { Providers } from './provider';
import axios from 'axios';
import MobileNav from '@/components/MobileNav';
import { ToggleProvider } from '@/components/Context';
import { GoogleAnalytics } from '@next/third-parties/google';

const api =
  process.env.NODE_ENV === 'production'
    ? 'https://api.voxpress.ro'
    : 'http://localhost:5000';

export async function getFooter() {
  try {
    const response = await axios.get(`${api}/api/generalData/footer`);
    return response.data; // Return the data from the server
  } catch (error) {
    console.error('Failed to fetch data:', error.message);
    return null; // Return null if fetching fails
  }
}
export async function getNavbar() {
  try {
    const response = await axios.get(`${api}/api/generalData/navbar`);
    return response.data; // Return the data from the server
  } catch (error) {
    console.error('Failed to fetch data:', error.message);
    return null; // Return null if fetching fails
  }
}
export const metadata = {
  title: {
    default: process.env.NEXT_PUBLIC_NUME_ZIAR,
  },
  description: ` Bine ați venit la ${process.env.NEXT_PUBLIC_NUME_ZIAR}, destinația ta principală pentru știri online. Acoperim o gamă variată de subiecte, inclusiv politică, economie, cultură și monden. Cu articole proaspete și informații de ultimă oră, suntem ca un ziar digital în palma ta. Indiferent de interesul tău, vei găsi ceva care să te captiveze în blogul nostru. Cu o echipă dedicată de jurnaliști și analiști, ne străduim să aducem cele mai relevante și exacte informații direct pe ecranul tău.`,
  icons: {
    icon: process.env.NEXT_PUBLIC_ICON,
  },
};
export default async function RootLayout({ children }) {
  let navbar = await getNavbar();
  let footer = await getFooter();

  return (
    <html lang="ro">
      <body>
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
        <ToggleProvider>
          <Providers>
            <MobileNav navbar={navbar} />
            <Navbar navbar={navbar} />
            {children}
            <Footer footer={footer} navbar={navbar} />
          </Providers>
        </ToggleProvider>
      </body>
    </html>
  );
}
