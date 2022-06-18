import { inferQueryOutput } from '@/utils/trpc';
import { useUserId } from '@/hooks/useUserId';
import React from 'react';
import PollFooter from './PollFooter';
import PollOption from './PollOption';

type Props = {
  poll: inferQueryOutput<'poll.public-polls'>['polls'][0];
  isDetails?: boolean;
  isProfilePage?: boolean;
};

const PollQuestion: React.FC<Props> = ({
  poll,
  isDetails = false,
  isProfilePage = false,
}) => {
  const { userId } = useUserId();

  const userVote = React.useMemo(
    () =>
      poll.options.find((option) =>
        option.votes.find((vote) => vote.uniqueUserId === userId)
      ),
    [poll.options, userId]
  );

  const [currentVote, setCurrentVote] = React.useState({
    id: userVote ? userVote.id : 0,
  });

  const totalVotes = React.useMemo(() => poll.votes.length, [poll.votes]);

  return (
    <div className="flex mt-12 flex-col p-8 bg-white shadow-md rounded-lg">
      <div className="text-gray-700 font-bold text-lg">{poll.question}</div>

      {isProfilePage && (
        <div className="text-gray-400 font-light text-sm">
          {poll.private ? 'private' : 'public'} poll
        </div>
      )}

      <ul className="mt-3">
        {poll.options.map((option) => (
          <PollOption
            key={option.id}
            option={option}
            userVote={userVote}
            totalVotes={totalVotes}
            currentVote={currentVote}
            setCurrentVote={setCurrentVote}
            isProfilePage={isProfilePage}
          />
        ))}
      </ul>

      <PollFooter
        totalVotes={totalVotes}
        currentVote={currentVote}
        userVote={userVote}
        poll={poll}
        isDetails={isDetails}
        isProfilePage={isProfilePage}
      />
    </div>
  );
};

export default React.memo(PollQuestion);
