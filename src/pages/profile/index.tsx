import SvgHome from '@/components/Icons/svg/Home';
import SvgInfo from '@/components/Icons/svg/Info';
import PollQuestion from '@/components/Poll/PollQuestion';
import PollSkeleton from '@/components/Poll/PollSkeleton';
import NoPollInfo from '@/components/Profile/NoPollInfo';
import PollTab from '@/components/Profile/PollTab';
import { useUserId } from '@/hooks/useUserId';
import MainLayout from '@/layouts/MainLayout';
import { useQuery } from '@/utils/trpc';
import { useRouter } from 'next/router';
import React, { useCallback, useState } from 'react';

const Profile = () => {
  const [tabValue, setTabValue] = useState(0);
  const router = useRouter();
  const { userId } = useUserId();

  const { data, isLoading } = useQuery([
    'poll.user-polls',
    { userId: userId as string, isPrivate: tabValue === 0 },
  ]);

  const polls = data?.polls;

  const onTabValueChange = useCallback(
    (val: number) => {
      setTabValue(val);
    },
    [setTabValue]
  );

  return (
    <MainLayout
      title="Your Polls"
      rightButton={
        <button
          onClick={() => router.push('/')}
          type="button"
          className="text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center mr-2 dark:bg-indigo-500 dark:hover:bg-indigo-500 dark:focus:ring-indigo-400"
        >
          <SvgHome className="w-5 h-5" />
        </button>
      }
    >
      <PollTab tabValue={tabValue} onTabValueChange={onTabValueChange} />

      {!isLoading && polls?.length === 0 && (
        <NoPollInfo isPrivate={tabValue === 0} />
      )}

      {isLoading
        ? [1, 2, 3, 4].map((v) => <PollSkeleton key={v} />)
        : (polls || []).map((poll) => (
            <PollQuestion isProfilePage={true} key={poll.id} poll={poll} />
          ))}
    </MainLayout>
  );
};

export default Profile;
