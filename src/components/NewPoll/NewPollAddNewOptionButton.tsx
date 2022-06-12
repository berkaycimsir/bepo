import { generateRandomNumber } from '@/utils/generateRandomNumber';
import React from 'react';
import { v4 } from 'uuid';

type Props = {
  setOptions: React.Dispatch<
    React.SetStateAction<
      {
        id: string;
        value: string;
        percentage: string;
      }[]
    >
  >;
};

const NewPollAddNewOptionButton: React.FC<Props> = ({ setOptions }) => {
  const addNewOption = React.useCallback(() => {
    setOptions((prev) => [
      ...prev,
      {
        id: v4(),
        value: '',
        percentage: `${String(generateRandomNumber(1, 100))}%`,
      },
    ]);
  }, [setOptions]);

  return (
    <button
      onClick={() => addNewOption()}
      type="button"
      className="hover:bg-stone-100 rounded-xl py-2 pr-2 mt-5 focus:outline-none font-lg text-sm text-center inline-flex items-center"
    >
      <svg
        className="w-6 h-6 text-stone-600 ml-2 mr-1"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M12 6v6m0 0v6m0-6h6m-6 0H6"
        />
      </svg>
      <div className="font-bold text-stone-600">Add another option</div>
    </button>
  );
};

export default NewPollAddNewOptionButton;
