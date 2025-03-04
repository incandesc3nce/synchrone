import Link from 'next/link';
import { Typography } from '../common';

export const HeroSection = () => {
  return (
    <section className="w-full flex justify-center items-center min-h-screen backdrop-blur-md bg-radial from-zinc-700 to-60%">
      <div className='flex flex-col gap-8 justify-center items-center animate-[fade-in_0.7s_ease-out]'>
        <Typography
          variant="h1"
          className="max-w-4xl text-center bg-gradient-to-t to-50% from-blue-600 to-neutral-50 text-transparent bg-clip-text">
          Совместная разработка в реальном времени
        </Typography>
        <Typography variant="h3" className="text-center">
          Создавай и редактируй код вместе с другими без препятствий
        </Typography>
        <Link
          href="/editor"
          className="bg-blue-700 hover:bg-blue-800 transition-colors duration-150 py-2 px-4 rounded-xl font-medium">
          Приступить
        </Link>
      </div>
    </section>
  );
};
