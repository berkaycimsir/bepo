import { inferQueryOutput } from '@/utils/trpc';
import React from 'react';

type Props = {
  option: inferQueryOutput<'poll.all'>['polls'][0]['options'][0];
};

const PollOption: React.FC<Props> = ({ option }) => {
  const [checked, setChecked] = React.useState(false);

  const checboxId = React.useMemo(
    () => `${option.id}-${option.value}`,
    [option]
  );

  return (
    <div key={option.id} className="form-check p-1 cursor-pointer">
      <input
        className="form-check-input border border-gray-300 rounded-md transition duration-200 bg-white checked:bg-blue-600 checked:border-blue-600 !ring-0 outline-none mr-3 cursor-pointer"
        type="checkbox"
        checked={checked}
        id={checboxId}
        onChange={(e) => setChecked(e.target.checked)}
      />
      <label
        htmlFor={checboxId}
        className="form-check-label select-none inline-block cursor-pointer text-gray-800"
      >
        {option.value}
      </label>
    </div>
  );
};

export default PollOption;
