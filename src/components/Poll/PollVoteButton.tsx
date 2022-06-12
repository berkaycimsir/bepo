import { inferQueryOutput, useContext, useMutation } from '@/utils/trpc';
import { useUserId } from '@/hooks/useUserId';
import { unionBy } from 'lodash';
import React from 'react';

type Props = {
  currentVote: { id: number };
  pollId: number;
  userVote: inferQueryOutput<'poll.all'>['polls'][0]['options'][0] | undefined;
};

const PollVoteButton: React.FC<Props> = ({ currentVote, pollId, userVote }) => {
  const { userId } = useUserId();
  const { setQueryData, getQueryData, cancelQuery } = useContext();
  const buttonDisabled = React.useMemo(
    () => Boolean(userVote?.votes.some((v) => v.uniqueUserId === userId)),
    [userId, userVote?.votes]
  );

  const getNewPollData = (
    newVote: inferQueryOutput<'poll.all'>['polls'][0]['votes'][0],
    poll: inferQueryOutput<'poll.all'>['polls'][0]
  ) => ({
    ...poll,
    votes: unionBy([newVote], poll.votes, 'id'),
    options: poll.options.map((option) =>
      option.id === newVote.optionId
        ? {
            ...option,
            votes: unionBy([newVote], option.votes, 'id'),
          }
        : option
    ),
  });

  const { mutate } = useMutation(['poll.add-vote'], {
    onMutate: async ({ optionId }) => {
      await cancelQuery(['poll.all']);
      const previousData = getQueryData(['poll.all']);
      const newVote = {
        id: Date.now(),
        pollId,
        uniqueUserId: userId as string,
        optionId,
      };
      // @ts-ignore
      setQueryData(['poll.all'], (prev) => ({
        ...prev,
        polls: prev?.polls.map((poll) =>
          poll.id === pollId ? getNewPollData(newVote, poll) : poll
        ),
      }));
      return { previousData };
    },
  });

  const addVote = React.useCallback(() => {
    if (!currentVote.id || !userId) return;
    mutate({ pollId, optionId: currentVote.id, userId });
  }, [currentVote.id, mutate, pollId, userId]);

  return (
    <button
      onClick={addVote}
      type="button"
      disabled={buttonDisabled}
      className="disabled:bg-gray-300 focus:outline-none text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-300 font-medium rounded-lg text-sm px-6 py-2 mb-2 dark:bg-indigo-600 dark:focus:ring-indigo-400"
    >
      Vote
    </button>
  );
};

export default React.memo(PollVoteButton);
