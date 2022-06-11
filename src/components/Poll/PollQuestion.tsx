import { inferQueryOutput } from '@/utils/trpc';
import React from 'react';
import PollOption from './PollOption';

type Props = {
  poll: inferQueryOutput<'poll.all'>['polls'][0];
};

const PollQuestion: React.FC<Props> = ({ poll }) => {
  const [checked, setChecked] = React.useState(false);

  return (
    <div className="flex flex-col">
      <div className="text-gray-500 text-lg">{poll.question}</div>
      <ul>
        {poll.options.map((option) => (
          <PollOption key={option.id} option={option} />
        ))}
      </ul>
    </div>
  );
};

export default PollQuestion;
