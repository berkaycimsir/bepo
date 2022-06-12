import React, { useEffect, useRef } from 'react';
import NewPollButton from './NewPollButton';

type Props = {
  question: string;
  setQuestion: React.Dispatch<React.SetStateAction<string>>;
  options: {
    id: string;
    value: string;
    percentage: string;
  }[];
  isPrivate: boolean;
  resetForm: () => void;
};

const NewPollHeader: React.FC<Props> = ({
  question,
  setQuestion,
  options,
  isPrivate,
  resetForm,
}) => {
  const titleInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    titleInputRef.current?.focus();
  }, [titleInputRef]);

  return (
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
  );
};

export default NewPollHeader;
