import { useUserId } from '@/hooks/useUserId';
import { isProd } from '@/lib/isProd';
import { getPollPrivateUrl } from '@/utils/poll';
import { useContext, useMutation } from '@/utils/trpc';
import React, { useState } from 'react';

type Props = {
  options: {
    id: string;
    value: string;
    percentage: string;
  }[];
  question: string;
  isPrivate: boolean;
  resetForm: () => void;
  setPrivateUrl: React.Dispatch<React.SetStateAction<string>>;
};

const NewPollButton: React.FC<Props> = ({
  options,
  isPrivate,
  question,
  resetForm,
  setPrivateUrl,
}) => {
  const { userId } = useUserId();
  const { refetchQueries } = useContext();

  const { mutate } = useMutation(['poll.add-poll'], {
    onMutate: () => {
      resetForm();
    },
    onSuccess: async (data) => {
      await refetchQueries(['poll.public-polls']);
      setPrivateUrl(getPollPrivateUrl(data.privateId));
    },
  });

  const addPoll = React.useCallback(() => {
    if (!userId) return;
    mutate({
      userId,
      options: options.map((opt) => ({ value: opt.value })),
      question,
      isPrivate,
    });
  }, [isPrivate, userId, mutate, options, question]);

  const isOptionsEmpty = React.useMemo(
    () => options.filter((o) => o.value.trim().length !== 0).length < 2,
    [options]
  );

  return (
    <button
      disabled={isOptionsEmpty || question.trim().length === 0}
      onClick={addPoll}
      type="button"
      className="disabled:bg-gray-300 focus:outline-none text-white bg-emerald-600 hover:bg-emerald-500 focus:ring-4 focus:ring-emerald-300 font-medium rounded-lg text-sm px-6 py-2 dark:bg-emerald-600 dark:focus:ring-emerald-400"
    >
      Create
    </button>
  );
};

export default NewPollButton;
