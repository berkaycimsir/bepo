import SvgPlus from '@/components/Icons/svg/Plus';
import SvgUser from '@/components/Icons/svg/User';
import PollQuestion from '@/components/Poll/PollQuestion';
import PollSkeleton from '@/components/Poll/PollSkeleton';
import MainLayout from '@/layouts/MainLayout';
import { useQuery } from '@/utils/trpc';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';

const Home: NextPage = () => {
  const { data, isLoading } = useQuery(['poll.public-polls']);
  const router = useRouter();

  const polls = data?.polls;

  return (
    <MainLayout
      rightButton={
        <div className="flex items-center">
          <button
            onClick={() => router.push('/profile')}
            type="button"
            className="text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center mr-2 dark:bg-indigo-500 dark:hover:bg-indigo-500 dark:focus:ring-indigo-400"
          >
            <SvgUser className="w-5 h-5" />
          </button>
          <button
            onClick={() => router.push('/new')}
            type="button"
            className="disabled:bg-gray-300 focus:outline-none text-white bg-teal-500 hover:bg-opacity-95 focus:ring-4 focus:ring-teal-600 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-teal-600 dark:focus:ring-teal-500 inline-flex items-center text-center"
          >
            New Poll
            <SvgPlus className="w-5 h-5 ml-2" />
          </button>
        </div>
      }
      title="Public Polls"
    >
      {isLoading
        ? [1, 2, 3, 4].map((v) => <PollSkeleton key={v} />)
        : (polls || []).map((poll) => (
            <PollQuestion key={poll.id} poll={poll} />
          ))}
    </MainLayout>
  );
};

export default Home;
