import { getCurrentToken } from '@/lib/auth/cookie';
import { redirect } from 'next/navigation';

export default async function CoreLayout({ children }: { children: React.ReactNode }) {
  const { user, token } = await getCurrentToken();

  if (!user || !token) {
    return redirect('/login');
  }

  return children;
}
