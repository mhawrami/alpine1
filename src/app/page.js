import { promises as fs } from 'fs';
import MainGrid from '@/components/MainGrid';
import { useRouter } from 'next/router';

export default async function Home({ params }) {
  const { locale } = params || {};
  const filePath = `/src/data.${locale || 'en'}.json`;
  const file = await fs.readFile(process.cwd() + filePath, 'utf8');
  const data = JSON.parse(file);

  return (
    <main className='w-full'>
      <MainGrid data={data} />
    </main>
  );
}

export async function getServerSideProps(context) {
  const { locale } = context.query;
  return { props: { params: { locale } } };
}
