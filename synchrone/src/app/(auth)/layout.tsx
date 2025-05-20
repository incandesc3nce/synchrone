import { getCurrentToken } from '@/lib/auth/cookie';
import { redirect } from 'next/navigation';

export default async function AuthLayout({ children }: { children: React.ReactNode }) {
  const { user, token } = await getCurrentToken();

  if (user && token) {
    return redirect('/workspaces');
  }

  return <main className="flex justify-center items-center h-screen font-sans">{children}</main>;
}
