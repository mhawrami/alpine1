"use client";

import { useEffect, useState } from 'react';
import MainGrid from '@/components/MainGrid';
import About from '@/components/About';

export default function Home() {
  const [data, setData] = useState(null);

  useEffect(() => {
    // Fetch data from an API or static file
    fetch('/data.json')
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);

  if (!data) return <div>Loading...</div>;

  return (
    <main className="w-full">
      <MainGrid data={data} />
      <About data={data.about} nav={data.nav} timeline={{}} />
    </main>
  );
}
