import axios from 'axios';
import ArticolChakra from '@/components/ArticolChakra';

export async function generateMetadata({ params, searchParams }) {
  const { categorie, slug } = params;
  const { id } = searchParams;
  const dev = true;
  const api = dev ? 'https://api.voxpress.ro' : 'http://localhost:5000';
  // This is an example fetch; in practice, you'd get data from a database or API
  const response = await axios.get(`${api}/api/articol/ziare/articol?id=${id}`);
  const articol = response.data;

  const titluPagina = 'Click Ronews';
  const link = titluPagina.split(' ').join('').toLowerCase();

  const currentUrl = `https://${link}.ro/${categorie}/${slug}`;
  const descriereSeo = articol && `${articol.continut[0].data.text}`;
  const pozaSeo = articol && `${articol.pozaCoperta[0].src}`;
  return {
    title: `${titluPagina} - ${articol.titlu}`,
    description: descriereSeo,
    keywords: articol && articol.etichete.join(','),
    alternates: {
      canonical: currentUrl,
    },
    openGraph: {
      siteName: titluPagina,
      url: currentUrl,
      type: 'article',
      title: articol && `${titluPagina} - ${articol.titlu.slice(0, 100)}`,
      image: [pozaSeo],
      description: descriereSeo,
      hashtag: articol && `#${articol.categorie}`,
      locale: 'ro_RO',
    },
    twitter: {
      card: 'summary',
      site: currentUrl,
      title: `${titluPagina} - ${articol.titlu}`,
      description: descriereSeo,
      image: [pozaSeo],
      domain: `https://${link}.ro`,
    },
  };
}

const dev = true;
const api = dev ? 'https://api.voxpress.ro' : 'http://localhost:5000';
export async function getArticol(id) {
  try {
    const response = await axios.get(
      `${api}/api/articol/ziare/articol?id=${id}`
    );

    return response.data;
  } catch (error) {
    console.error('Failed to fetch data:', error);
    return null; // Return null if fetching fails
  }
}
const Articol = async ({ searchParams }) => {
  const { id } = searchParams;
  let articol = await getArticol(id);
  return (
    <div className="containerArticol">
      <ArticolChakra articol={articol} />
    </div>
  );
};

export default Articol;
