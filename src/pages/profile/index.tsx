import SvgHome from '@/components/Icons/svg/Home';
import SvgInfo from '@/components/Icons/svg/Info';
import PollQuestion from '@/components/Poll/PollQuestion';
import PollSkeleton from '@/components/Poll/PollSkeleton';
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
          className="text-white focus:ring-2 focus:outline-none font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center mr-2 dark:bg-indigo-500 dark:hover:bg-indigo-500 dark:focus:ring-indigo-400"
        >
          <SvgHome className="w-5 h-5" />
        </button>
      }
    >
      <ul className="flex flex-wrap text-sm font-medium text-center text-gray-500 dark:text-gray-400">
        <li className="mr-2 cursor-pointer">
          <span
            onClick={() => onTabValueChange(0)}
            className={`
            select-none inline-block py-3 px-4 ${
              tabValue === 0 && 'bg-indigo-100 text-indigo-400'
            } rounded-lg 
            `}
          >
            Private
          </span>
        </li>
        <li className="mr-2 cursor-pointer">
          <span
            onClick={() => onTabValueChange(1)}
            className={`
            select-none inline-block py-3 px-4 ${
              tabValue === 1 && 'bg-indigo-100 text-indigo-400'
            } rounded-lg
            `}
          >
            Public
          </span>
        </li>
      </ul>

      {!isLoading && polls?.length === 0 && (
        <div
          className="p-4 mb-4 transition-all duration-200 text-sm border-sky-300 border border-t-8 text-sky-600 bg-sky-100 rounded-lg dark:bg-sky-100 dark:text-sky-600"
          role="alert"
        >
          <div className="flex items-center mb-3 flex-row">
            <SvgInfo className="inline flex-shrink-0 mr-3 w-5 h-5" />
            <span className="font-bold">
              You don&apos;t have any polls yet!
            </span>
          </div>
          <p>
            You can create from{' '}
            <span
              onClick={() => router.push('/new')}
              className="font-bold cursor-pointer select-none"
            >
              here.
            </span>
          </p>
        </div>
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
