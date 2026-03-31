import Head from 'next/head';
import Link from 'next/link';
import { getSortedPostsData } from '../lib/posts';

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
}

export default function Home({ allPostsData }) {
  return (
    <div className="container mx-auto px-4 py-8">
      <Head>
        <title>My Blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="text-4xl font-bold mb-8 text-center">My Blog</h1>

        <div className="space-y-6">
          {allPostsData.map(({ id, date, title }) => (
            <div key={id} className="border p-4 rounded-lg">
              <Link href={`/posts/${id}`}>
                <h2 className="text-xl font-semibold hover:text-blue-600">{title}</h2>
              </Link>
              <p className="text-gray-500 mt-1">{date}</p>
            </div>
          ))}
        </div>
      </main>

      <footer className="mt-12 text-center text-gray-500">
        <p>© {new Date().getFullYear()} My Blog</p>
      </footer>

      <style jsx global>{`
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
          line-height: 1.6;
          color: #333;
        }
      `}</style>
    </div>
  );
}