import PollQuestion from '@/components/Poll/PollQuestion';
import { useQuery } from '@/utils/trpc';
import type { NextPage } from 'next';

const Home: NextPage = () => {
  const { data, isLoading } = useQuery(['poll.all']);

  if (isLoading || !data) return <div>Loading...</div>;

  const polls = data?.polls;

  return (
    <div className="container mx-auto p-20">
      <h1 className="text-3xl text-stone-600 font-bold mb-3">Public Polls</h1>
      <hr className="my-8 border-gray-100" />
      {polls.map((poll) => (
        <PollQuestion key={poll.id} poll={poll} />
      ))}
    </div>
  );
};

export default Home;
