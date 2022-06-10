import { Poll } from '@prisma/client';
import type { NextPage } from 'next';
import prisma from '../lib/prisma';

export async function getServerSideProps() {
  const polls = await prisma.poll.findMany();

  return {
    props: {
      polls,
    },
  };
}

type Props = {
  polls: Array<Poll>;
};

const Home: NextPage<Props> = ({ polls }) => {
  return (
    <div className="p-20">
      <h1 className="text-3xl text-indigo-400 font-bold underline mb-3">
        Polls
      </h1>
      {polls.map((poll) => (
        <div className="text-gray-500 text-lg" key={poll.id}>
          {poll.question}
        </div>
      ))}
    </div>
  );
};

export default Home;
