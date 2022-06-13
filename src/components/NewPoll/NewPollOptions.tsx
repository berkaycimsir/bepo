import { stringifyNumber } from '@/utils/stringifyNumber';
import React from 'react';
import SvgDelete from '../Icons/svg/Delete';

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
          <SvgDelete
            onClick={() => removeOption(id)}
            className="w-4 h-4 cursor-pointer hover:text-stone-500 text-stone-600 mr-4"
          />
        )}

        <input
          className="outline-0 p-0 border-none font-normal text-gray-600 w-full !ring-0"
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
