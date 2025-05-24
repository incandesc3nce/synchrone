import { APIResponse } from '@/types/common/APIResponse';
import { ServerFetch } from '@/utils/ServerFetch';
import { redirect } from 'next/navigation';

export default async function InvitePage({
  params,
}: {
  params: Promise<{ inviteId: string }>;
}) {
  const { inviteId } = await params;

  try {
    await ServerFetch<APIResponse>(
      `${process.env.BASE_URL}/api/workspaces/invite/${inviteId}`,
      {
        method: 'GET',
      }
    );
  } catch (error) {
    console.error('Ошибка при принятии приглашения:', error);
    return redirect('/workspaces');
  } finally {
    return redirect('/workspaces');
  }
}
