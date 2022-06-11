import React from 'react';

const PollVoteButton: React.FC = () => {
  return (
    <button
      type="button"
      className="focus:outline-none text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-300 font-medium rounded-lg text-sm px-6 py-2 mb-2 dark:bg-indigo-600 dark:focus:ring-indigo-400"
    >
      Vote
    </button>
  );
};

export default React.memo(PollVoteButton);
