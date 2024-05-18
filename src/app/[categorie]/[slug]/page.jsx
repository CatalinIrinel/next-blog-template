import axios from 'axios';
import ArticolChakra from '@/components/ArticolChakra';

const api =
  process.env.NODE_ENV === 'production'
    ? 'https://api.voxpress.ro'
    : 'http://localhost:5000';
const titluPagina = process.env.NEXT_PUBLIC_NUME_ZIAR;

export async function generateMetadata({ params }) {
  const { categorie, slug } = params;
  // This is an example fetch; in practice, you'd get data from a database or API
  const response = await axios.get(`${api}/api/articol/ziare/${slug}`);
  const articol = response.data;

  const link = titluPagina.split(' ').join('').toLowerCase();

  const currentUrl = `${process.env.NEXT_PUBLIC_LINK}/${categorie}/${slug}`;
  const descriereSeo = articol && `${articol.continut[0].data.text}`;
  const pozaSeo = articol && `${articol.pozaCoperta[0].src}`;
  return {
    title: `${titluPagina} - ${articol.titlu}`,
    description: descriereSeo,
    keywords: articol && articol.etichete.join(','),
    authors: [{ name: 'Catalin Istratoae' }],
    publisher: 'Catalin Istratoae',
    creator: 'Catalin Istratoae',
    alternates: {
      canonical: currentUrl,
    },
    openGraph: {
      siteName: titluPagina,
      url: currentUrl,
      type: 'article',
      title: articol && `${titluPagina} - ${articol.titlu.slice(0, 100)}`,
      images: [{ url: pozaSeo }],
      description: descriereSeo,
      hashtag: articol && `#${articol.categorie}`,
      locale: 'ro_RO',
    },
    twitter: {
      card: 'summary',
      site: currentUrl,
      title: `${titluPagina} - ${articol.titlu}`,
      description: descriereSeo,
      images: [{ url: pozaSeo }],
      domain: process.env.NEXT_PUBLIC_LINK,
    },
  };
}

export async function getArticol(slug) {
  try {
    const response = await axios.get(`${api}/api/articol/ziare/${slug}`);

    return response.data;
  } catch (error) {
    console.error('Failed to fetch data:', error);
    return null; // Return null if fetching fails
  }
}
const Articol = async ({ params }) => {
  const { slug } = params;
  let articol = await getArticol(slug);
  return (
    <div className="containerArticol">
      <ArticolChakra articol={articol} />
    </div>
  );
};

export default Articol;
