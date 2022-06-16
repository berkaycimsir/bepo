import { inferQueryOutput } from '@/utils/trpc';
import React from 'react';
import PollVoteButton from './PollVoteButton';

type Props = {
  poll: inferQueryOutput<'poll.public-polls'>['polls'][0];
  currentVote: { id: number };
  totalVotes: number;
  userVote:
    | inferQueryOutput<'poll.public-polls'>['polls'][0]['options'][0]
    | undefined;
  isDetails: boolean;
};

const PollFooter: React.FC<Props> = ({
  poll,
  currentVote,
  totalVotes,
  userVote,
  isDetails,
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
        isDetails={isDetails}
        pollPrivateId={poll.privateId}
      />
    </div>
  );
};

export default PollFooter;
