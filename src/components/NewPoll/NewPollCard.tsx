import { generateRandomNumber } from '@/utils/generateRandomNumber';
import { stringifyNumber } from '@/utils/stringifyNumber';
import React, { useEffect, useRef } from 'react';
import { v4 } from 'uuid';
import NewPollButton from './NewPollButton';

type Props = {
  firstDefaultPercentage: string;
  secondDefaultPercentage: string;
};

const NewPollCard: React.FC<Props> = ({
  firstDefaultPercentage,
  secondDefaultPercentage,
}) => {
  const [question, setQuestion] = React.useState('');

  const [options, setOptions] = React.useState<
    { id: string; value: string; percentage: string }[]
  >([
    {
      id: v4(),
      value: '',
      percentage: firstDefaultPercentage,
    },
    {
      id: v4(),
      value: '',
      percentage: secondDefaultPercentage,
    },
  ]);

  const [isPrivate, setIsPrivate] = React.useState<boolean>(true);

  const titleInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    titleInputRef.current?.focus();
  }, [titleInputRef]);

  const onOptionValueChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>, id: string) => {
      setOptions(
        options.map((option) =>
          option.id === id ? { ...option, value: e.target.value } : option
        )
      );
    },
    [options]
  );

  const addNewOption = React.useCallback(() => {
    setOptions([
      ...options,
      {
        id: v4(),
        value: '',
        percentage: `${String(generateRandomNumber(1, 100))}%`,
      },
    ]);
  }, [options]);

  const removeOption = React.useCallback(
    (id: string) => {
      setOptions(options.filter((option) => option.id !== id));
    },
    [options]
  );

  const resetForm = React.useCallback(() => {
    setOptions([
      {
        id: v4(),
        value: '',
        percentage: firstDefaultPercentage,
      },
      {
        id: v4(),
        value: '',
        percentage: secondDefaultPercentage,
      },
    ]);
    setQuestion('');
    setIsPrivate(true);
  }, [firstDefaultPercentage, secondDefaultPercentage]);

  return (
    <div className="flex mt-12 flex-col p-8 bg-white shadow-md rounded-lg">
      <div className="flex mb-3 items-center flex-row justify-between">
        <input
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          className="outline-0 w-full pl-0 border-none text-gray-700 font-bold text-lg !ring-0"
          ref={titleInputRef}
          type="text"
          placeholder="Question ?"
        />
        <NewPollButton
          options={options}
          question={question}
          isPrivate={isPrivate}
          resetForm={resetForm}
        />
      </div>

      <div className="mb-3 flex flex-row items-center">
        <input
          checked={!isPrivate}
          className="form-check-input border border-gray-300 rounded-full transition duration-200 bg-white checked:border-emerald-500 checked:!bg-emerald-500 !ring-0 outline-none mr-3 cursor-pointer"
          type="checkbox"
          onChange={(e) => setIsPrivate(!e.currentTarget.checked)}
        />

        <label className="form-check-label pb-1 select-none inline-block cursor-pointer font-normal text-gray-600">
          public
        </label>
      </div>

      <div className="form-check p-1 mt-1">
        {options.map(({ value, id, percentage }, i) => (
          <div className={`${i !== 0 ? 'mt-6' : ''}`} key={id}>
            <div className="flex flex-row items-center">
              {options.length !== 2 && (
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
                placeholder={`${stringifyNumber(i + 1)} option`}
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
        ))}
      </div>

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
    </div>
  );
};

export default NewPollCard;
