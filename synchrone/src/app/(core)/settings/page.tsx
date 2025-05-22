import { CoreHeader } from '@/components/core/CoreHeader';
import { Settings } from '@/components/core/Settings';
import { APIResponse } from '@/types/common/APIResponse';
import { UserResponse } from '@/types/core/settings/UserResponse';
import { ServerFetch } from '@/utils/ServerFetch';

export default async function SettingsPage() {
  const userData = await ServerFetch<
    APIResponse & {
      user: UserResponse;
    }
  >('http://localhost:3000/api/user', {
    method: 'GET',
  });

  return (
    <div className="p-4 flex flex-col gap-8 h-screen">
      <CoreHeader title="Настройки" />
      <div className="flex flex-col gap-8 h-full justify-center">
        <Settings userData={userData.user} />
      </div>
    </div>
  );
}
