import PollQuestion from '@/components/Poll/PollQuestion';
import { useQuery } from '@/utils/trpc';
import type { NextPage } from 'next';

const Home: NextPage = () => {
  const { data, isLoading } = useQuery(['poll.all']);

  if (isLoading || !data) return <div>Loading...</div>;

  const polls = data?.polls;

  return (
    <div className="p-20">
      <h1 className="text-3xl text-indigo-400 font-bold underline mb-3">
        Polls
      </h1>
      {polls.map((poll) => (
        <PollQuestion key={poll.id} poll={poll} />
      ))}
    </div>
  );
};

export default Home;
