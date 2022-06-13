import SvgArrowBack from '@/components/Icons/svg/ArrowBack';
import PollQuestion from '@/components/Poll/PollQuestion';
import PollSkeleton from '@/components/Poll/PollSkeleton';
import MainLayout from '@/layouts/MainLayout';
import { useQuery } from '@/utils/trpc';
import { useRouter } from 'next/router';
import React from 'react';

const PollDetails = () => {
  const router = useRouter();
  const pollId = router.query.id as string;

  const { data, isLoading } = useQuery(['poll.private-poll', { pollId }]);

  return (
    <MainLayout showHeader={false}>
      <div className="rounded-full p-2 flex items-center w-8 h-8 hover:bg-stone-200 cursor-pointer">
        <SvgArrowBack
          onClick={() => router.push('/')}
          className="w-8 h-8 text-stone-600"
        />
      </div>
      {isLoading || !data ? <PollSkeleton /> : <PollQuestion poll={data} />}
    </MainLayout>
  );
};

export default PollDetails;
