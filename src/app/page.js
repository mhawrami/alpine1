import { promises as fs } from 'fs';
import About from '@/components/About';
import data from '@/data.json';
export default function Home({ data }) {
  const { about, nav } = data;

  return (
    <div>
      <About data={about} nav={nav} timeline={{}} />
    </div>
  );
}




import MainGrid from '@/components/MainGrid';

export default async function Home() {
  const file = await fs.readFile(process.cwd() + '/src/data.json', 'utf8');
  const data = JSON.parse(file);

  return (
    <main className='w-full'>
      <MainGrid data={data} />
    </main>
  );
}
