import { inferQueryOutput } from '@/utils/trpc';
import React from 'react';

type Props = {
  option: inferQueryOutput<'poll.public-polls'>['polls'][0]['options'][0];
  totalVotes: number;
  currentVote: { id: number };
  setCurrentVote: React.Dispatch<React.SetStateAction<{ id: number }>>;
  userVote:
    | inferQueryOutput<'poll.public-polls'>['polls'][0]['options'][0]
    | undefined;
};

const PollOption: React.FC<Props> = ({
  option,
  totalVotes,
  currentVote,
  setCurrentVote,
  userVote,
}) => {
  const onCheck = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setCurrentVote({ id: option.id });
    },
    [option.id, setCurrentVote]
  );

  const checboxId = React.useMemo(
    () => `${option.id}-${option.value}`,
    [option]
  );

  const optionPercentage = React.useMemo(
    () =>
      `${
        totalVotes ? Math.round((option.votes.length / totalVotes) * 100) : 0
      }%`,
    [option.votes.length, totalVotes]
  );

  return (
    <>
      <div key={option.id} className="form-check p-1 mt-1">
        <input
          className="form-check-input border border-gray-300 rounded-full transition duration-200 bg-white checked:border-indigo-400 checked:!bg-indigo-400 !ring-0 outline-none mr-3 cursor-pointer"
          type="checkbox"
          checked={currentVote.id === option.id}
          id={checboxId}
          onChange={onCheck}
        />

        <label
          htmlFor={checboxId}
          className="form-check-label select-none inline-block cursor-pointer font-normal text-gray-600"
        >
          {option.value}
        </label>

        {Boolean(userVote) && (
          <div className="mt-4 flex flex-row items-center">
            <div className="text-gray-400 font-normal text-sm mr-3">
              {optionPercentage}
            </div>
            <div className="w-full  bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-indigo-400 h-2.5 rounded-full transition-all duration-200"
                style={{ width: optionPercentage }}
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default PollOption;
