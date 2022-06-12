import { inferQueryOutput } from '@/utils/trpc';
import React from 'react';
import PollVoteButton from './PollVoteButton';

type Props = {
  poll: inferQueryOutput<'poll.all'>['polls'][0];
  currentVote: { id: number };
  totalVotes: number;
  userVote: inferQueryOutput<'poll.all'>['polls'][0]['options'][0] | undefined;
};

const PollFooter: React.FC<Props> = ({
  poll,
  currentVote,
  totalVotes,
  userVote,
}) => {
  return (
    <div className="mt-10 flex flex-row items-center justify-between">
      <div className="text-gray-400 font-normal text-sm">
        Total Votes: {totalVotes}
      </div>

      <PollVoteButton
        userVote={userVote}
        pollId={poll.id}
        currentVote={currentVote}
      />
    </div>
  );
};

export default PollFooter;
