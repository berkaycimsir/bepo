import React from 'react';

type Props = {
  onTabValueChange: (val: number) => void;
  tabValue: number;
};

const PollTab: React.FC<Props> = ({ tabValue, onTabValueChange }) => {
  return (
    <ul className="flex flex-wrap text-sm font-medium text-center text-gray-500 dark:text-gray-400">
      <li className="mr-2 cursor-pointer">
        <span
          onClick={() => onTabValueChange(0)}
          className={`
            select-none inline-block py-3 px-4 ${
              tabValue === 0 && 'bg-indigo-100 text-indigo-400'
            } rounded-lg 
          `}
        >
          Private
        </span>
      </li>
      <li className="mr-2 cursor-pointer">
        <span
          onClick={() => onTabValueChange(1)}
          className={`
            select-none inline-block py-3 px-4 ${
              tabValue === 1 && 'bg-indigo-100 text-indigo-400'
            } rounded-lg
          `}
        >
          Public
        </span>
      </li>
    </ul>
  );
};

export default PollTab;
