import CardArea from '@/components/CardArea';
import Cta from '@/components/Cta';
import axios from 'axios';

const titluPagina = 'Click Ronews';
const link = titluPagina.split(' ').join('').toLowerCase();
const dev = true;
const api = dev ? 'https://api.voxpress.ro' : 'http://localhost:5000';
const currentUrl = `https://${link}.ro`;
const coverImage = '/images/logo.png';
const descriereSeo = ` Bine ați venit la ${titluPagina}, destinația ta principală pentru știri online. Acoperim o gamă variată de subiecte, inclusiv politică, economie, cultură și monden. Cu articole proaspete și informații de ultimă oră, suntem ca un ziar digital în palma ta. Indiferent de interesul tău, vei găsi ceva care să te captiveze în blogul nostru. Cu o echipă dedicată de jurnaliști și analiști, ne străduim să aducem cele mai relevante și exacte informații direct pe ecranul tău.`;

export async function getData() {
  try {
    const response = await axios.get(`${api}/api/articol/home`);
    return response.data; // Return the data from the server
  } catch (error) {
    console.error('Failed to fetch data:', error);
    return null; // Return null if fetching fails
  }
}
export async function generateMetadata() {
  // Fetch metadata server-side
  return {
    description: descriereSeo,
    keywords:
      ['stiri','online', 'romania', 'stiri romania', 'politica','monden','ziar','digital'],
    authors:[{name:'Catalin Istratoae'}],
    publisher:'Catalin Istratoae',
    creator:'Catalin Istratoae',
    alternates: {
      canonical: currentUrl,
    },
    openGraph: {
      siteName: titluPagina,
      url: currentUrl,
      type: 'website',
      title: `${titluPagina}`,
      image: ['/images/logo.png'],
      description: descriereSeo,
      hashtag: `#${titluPagina}`,
      locale: 'ro_RO',
    },
    twitter: {
      card: 'summary',
      site: currentUrl,
      title: `${titluPagina}`,
      description: descriereSeo,
      image: ['/images/logo.png'],
      domain: `https://${link}.ro`,
    },
  };
}
const HomePage = async () => {
  let articole = await getData();

  return (
    <>
      <div className="container homePage">
        <CardArea category={'politica'} articole={articole} />
        <Cta />
        <CardArea category={'actualitate'} articole={articole} />
        <CardArea category={'administratie-publica'} articole={articole} />
        <CardArea category={'monden'} articole={articole} />
        <CardArea category={'business'} articole={articole} />
        <CardArea category={'economie'} articole={articole} />
        <Cta />
        <CardArea category={'cultura'} articole={articole} />
        <CardArea category={'sport'} articole={articole} />
        <CardArea category={'sci-tech'} articole={articole} />
        <CardArea category={'evenimente'} articole={articole} />
        <CardArea category={'opinii'} articole={articole} />
        <CardArea category={'profil-candidat-2024'} articole={articole} />
      </div>
    </>
  );
};

export default HomePage;
