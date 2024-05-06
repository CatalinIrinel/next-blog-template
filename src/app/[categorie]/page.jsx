import React from 'react';
import axios from 'axios';
import PageHeader from '@/components/PageHeader';
import ArticleCard from '@/components/ArticleCard';
import Link from 'next/link';

export async function generateMetadata({ params }) {
  const { categorie } = params;

  const titluPagina = 'Click Ronews';
  const link = titluPagina.split(' ').join('').toLowerCase();
  const currentUrl = `https://${link}/${categorie}`;
  const descriereSeo = ` Bine ați venit la ${titluPagina}, destinația ta principală pentru știri online. Acoperim o gamă variată de subiecte, inclusiv politică, economie, cultură și monden. Cu articole proaspete și informații de ultimă oră, suntem ca un ziar digital în palma ta. Indiferent de interesul tău, vei găsi ceva care să te captiveze în blogul nostru. Cu o echipă dedicată de jurnaliști și analiști, ne străduim să aducem cele mai relevante și exacte informații direct pe ecranul tău.`;
  const pozaSeo = '/images/bgPsCategorii.png';

  return {
    title: `${titluPagina} - ${
      categorie.charAt(0).toUpperCase() + categorie.slice(1)
    }`,
    description: descriereSeo,
    keywords: 'stiri, online, romania, ziar online, ziar, monden, politica',
    alternates: {
      canonical: currentUrl,
    },
    openGraph: {
      siteName: titluPagina,
      url: currentUrl,
      type: 'website',
      title: `${titluPagina} - ${categorie}`,
      image: ['/images/bgPsCategorii.png'],
      description: descriereSeo,
      hashtag: `#${categorie}`,
      locale: 'ro_RO',
    },
    twitter: {
      card: 'summary',
      site: currentUrl,
      title: `${titluPagina} - ${categorie}`,
      description: descriereSeo,
      image: ['/images/bgPsCategorii.png'],
      domain: `https://${link}.ro`,
    },
  };
}

const Cateogrie = async ({ searchParams, params }) => {
  const dev = true;
  const api = dev ? 'https://api.voxpress.ro' : 'http://localhost:5000';
  const { page } = searchParams;
  const { categorie } = params;

  const response = await axios.get(
    `${api}/api/articol/${categorie}?page=${page}`
  );

  const { articole, pages } = response.data;
  const titlu = categorie.split('-').join(' ');

  return (
    <div className="container categorie">
      <PageHeader titlu={titlu} />
      <div className="container orizontal">
        {articole.map((articol) => (
          <ArticleCard key={articol._id} articol={articol} />
        ))}
        <div className="container orizontal paginatie">
          {[...Array(pages).keys()].map((x) => (
            <Link
              className={x + 1 === Number(page) ? 'btn text-bold' : 'btn'}
              key={x + 1}
              href={`/${categorie}?page=${x + 1}`}
            >
              <div
                className={
                  x + 1 === Number(page) ? 'box is-active' : 'box is-inactive'
                }
              >
                {x + 1}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Cateogrie;
