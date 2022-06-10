import { inferQueryOutput } from '@/utils/trpc';
import React from 'react';

type Props = {
  poll: inferQueryOutput<'poll.all'>['polls'][0];
};

const PollQuestion: React.FC<Props> = ({ poll }) => {
  return <div className="text-gray-500 text-lg">{poll.question}</div>;
};

export default PollQuestion;
