import dynamic from 'next/dynamic';

const PIXI = dynamic(() => import('../container'), { ssr: false });

const Page = () => {
  return <PIXI />;
};

export default Page;
