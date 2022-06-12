import { useMutation } from '@/utils/trpc';
import React from 'react';

type Props = {
  options: {
    id: string;
    value: string;
    percentage: string;
  }[];
  question: string;
  isPrivate: boolean;
  resetForm: () => void;
};

const NewPollButton: React.FC<Props> = ({
  options,
  isPrivate,
  question,
  resetForm,
}) => {
  const { mutate } = useMutation(['poll.add-poll'], {
    onMutate: () => {
      resetForm();
    },
  });

  const addPoll = React.useCallback(() => {
    mutate({
      options: options.map((opt) => ({ value: opt.value })),
      question,
      isPrivate,
    });
  }, [isPrivate, mutate, options, question]);

  return (
    <button
      onClick={addPoll}
      type="button"
      className="disabled:bg-gray-300 focus:outline-none text-white bg-emerald-600 hover:bg-emerald-500 focus:ring-4 focus:ring-emerald-300 font-medium rounded-lg text-sm px-6 py-2 dark:bg-emerald-600 dark:focus:ring-emerald-400"
    >
      Create
    </button>
  );
};

export default NewPollButton;
