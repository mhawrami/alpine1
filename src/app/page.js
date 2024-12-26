import { promises as fs } from 'fs';
import MainGrid from '@/components/MainGrid';
import About from '@/components/About'; // Import About component

export default async function Home() {
  const file = await fs.readFile(process.cwd() + '/src/data.json', 'utf8');
  const data = JSON.parse(file);

  return (
    <main className='w-full'>
      {/* Pass data to MainGrid as before */}
      <MainGrid data={data} />
      
      {/* Pass about and nav data to About */}
      <About data={data.about} nav={data.nav} timeline={{}} />
    </main>
  );
}
