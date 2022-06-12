import { stringifyNumber } from '@/utils/stringifyNumber';
import React from 'react';

type Props = {
  option: {
    id: string;
    value: string;
    percentage: string;
  };
  totalOptions: number;
  setOptions: React.Dispatch<
    React.SetStateAction<
      {
        id: string;
        value: string;
        percentage: string;
      }[]
    >
  >;
  index: number;
};

const NewPollOptions: React.FC<Props> = ({
  totalOptions,
  setOptions,
  index,
  option: { id, value, percentage },
}) => {
  const removeOption = React.useCallback(
    (id: string) => {
      setOptions((prev) => prev.filter((option) => option.id !== id));
    },
    [setOptions]
  );

  const onOptionValueChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>, id: string) => {
      setOptions((prev) =>
        prev.map((option) =>
          option.id === id ? { ...option, value: e.target.value } : option
        )
      );
    },
    [setOptions]
  );

  return (
    <div className={`${index !== 0 ? 'mt-6' : ''}`}>
      <div className="flex flex-row items-center">
        {totalOptions !== 2 && (
          <svg
            onClick={() => removeOption(id)}
            className="w-4 h-4 cursor-pointer hover:text-stone-500 text-stone-600 mr-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            ></path>
          </svg>
        )}

        <input
          className="outline-0 p-0 border-none font-normal text-gray-600 !ring-0"
          type="text"
          value={value}
          placeholder={`${stringifyNumber(index + 1)} option`}
          onChange={(e) => onOptionValueChange(e, id)}
        />
      </div>

      <div className="mt-4 flex flex-row items-center">
        <div className="text-gray-400 font-normal text-sm mr-3">
          {percentage}
        </div>
        <div className="w-full  bg-gray-200 rounded-full h-2.5">
          <div
            className="bg-indigo-400 h-2.5 rounded-full transition-all duration-200"
            style={{ width: percentage }}
          />
        </div>
      </div>
    </div>
  );
};

export default NewPollOptions;
