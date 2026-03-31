import Head from 'next/head';
import Link from 'next/link';
import { getAllPostIds, getPostData } from '../../lib/posts';

export async function getStaticPaths() {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const postData = await getPostData(params.id);
  return {
    props: {
      postData,
    },
  };
}

export default function Post({ postData }) {
  return (
    <div className="container mx-auto px-4 py-8">
      <Head>
        <title>{postData.title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Link href="/" className="text-blue-600 hover:underline mb-4 inline-block">
          ← Back to Home
        </Link>

        <h1 className="text-3xl font-bold mb-2">{postData.title}</h1>
        <p className="text-gray-500 mb-6">{postData.date}</p>

        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
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
        h1, h2, h3, h4, h5, h6 {
          margin-top: 1.5em;
          margin-bottom: 0.5em;
        }
        p {
          margin-bottom: 1em;
        }
        ul, ol {
          margin-bottom: 1em;
          padding-left: 2em;
        }
      `}</style>
    </div>
  );
}