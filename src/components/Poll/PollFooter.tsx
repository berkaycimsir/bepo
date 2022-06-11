import { inferQueryOutput } from '@/utils/trpc';
import React from 'react';
import PollVoteButton from './PollVoteButton';

type Props = {
  poll: inferQueryOutput<'poll.all'>['polls'][0];
};

const PollFooter: React.FC<Props> = ({ poll }) => {
  return (
    <div className="mt-10 flex flex-row items-center justify-between">
      <div className="text-gray-400 font-normal text-sm">
        Total Votes: {poll.votes.length}
      </div>

      <PollVoteButton />
    </div>
  );
};

export default PollFooter;
