import { promises as fs } from 'fs';

import MainGrid from '@/components/MainGridImp';

export default async function Home() {
  const file = await fs.readFile(process.cwd() + '/src/data.json', 'utf8');
  const data = JSON.parse(file);

  return (
    <main className='w-full'>
      <MainGrid data={data} />
    </main>
  );
}
