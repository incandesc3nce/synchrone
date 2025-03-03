import Link from 'next/link';

export const Header = () => {
  return (
    <header className="flex justify-center fixed w-full top-0 z-10">
      <nav className="flex sm:mt-4 py-4 px-8 w-full sm:w-[min(95%,1200px)] bg-[#17171799] text-neutral-50 backdrop-blur-xs sm:rounded-[350px]">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/" className="font-bold text-xl">
            synchrone
          </Link>
          <ul className="flex gap-4 font-medium">
            <li>
              <Link href="/editor" className='text-lg'>Регистрация</Link>
            </li>
            <li>
              <Link href="/editor" className='text-lg'>Вход</Link>
            </li>
            <li>
              <Link href="/editor" className='text-lg'>Редактор</Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};
