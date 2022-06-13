import { generateRandomNumber } from '@/utils/generateRandomNumber';
import React from 'react';
import { v4 } from 'uuid';
import SvgPlus from '../Icons/svg/Plus';

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
      <SvgPlus className="w-5 h-5 ml-2" />
      <div className="font-bold text-stone-600">Add another option</div>
    </button>
  );
};

export default NewPollAddNewOptionButton;
