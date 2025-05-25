'use client';

import Link from 'next/link';
import { LogoutButton } from './LogoutButton';

export const Header = () => {
  const token =
    document?.cookie
      ?.split('; ')
      ?.find((row) => row.startsWith('token='))
      ?.replace('token=', '') || null;

  return (
    <header className="flex justify-center fixed w-full top-0 z-10">
      <nav className="flex sm:mt-4 py-4 px-8 w-full sm:w-[min(95%,1200px)] bg-[#17171799] text-neutral-50 backdrop-blur-xs sm:rounded-[350px]">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/" className="font-bold text-xl">
            synchrone
          </Link>
          <ul className="flex md:gap-6 gap-4 font-medium">
            {token ? (
              <>
                <li>
                  <LogoutButton variant="custom" className="text-lg cursor-pointer" />
                </li>
                <li>
                  <Link href="/workspaces" className="text-lg">
                    Проекты
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link href="/login" className="text-lg">
                    Вход
                  </Link>
                </li>
                <li>
                  <Link href="/sign-up" className="text-lg">
                    Регистрация
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
    </header>
  );
};
