import PollQuestion from '@/components/Poll/PollQuestion';
import PollSkeleton from '@/components/Poll/PollSkeleton';
import MainLayout from '@/layouts/MainLayout';
import { useQuery } from '@/utils/trpc';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';

const Home: NextPage = () => {
  const { data, isLoading } = useQuery(['poll.all']);
  const router = useRouter();

  const polls = data?.polls;

  return (
    <MainLayout
      rightButton={
        <button
          onClick={() => router.push('/new')}
          type="button"
          className="disabled:bg-gray-300 focus:outline-none text-white bg-teal-500 hover:bg-opacity-95 focus:ring-4 focus:ring-teal-500 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-teal-600 dark:focus:ring-teal-500 inline-flex items-center text-center"
        >
          New Poll
          <svg
            className="w-5 h-5 ml-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
        </button>
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
