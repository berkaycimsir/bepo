import React from 'react';
import { v4 } from 'uuid';
import SvgInfo from '../Icons/svg/Info';
import NewPollAddNewOptionButton from './NewPollAddNewOptionButton';
import NewPollHeader from './NewPollHeader';
import NewPollIsPublic from './NewPollIsPublic';
import NewPollOptions from './NewPollOptions';
import NewPollSuccessAlert from './NewPollSuccessAlert';

type Option = {
  id: string;
  value: string;
  percentage: string;
};

type Props = {
  firstDefaultPercentage: string;
  secondDefaultPercentage: string;
};

const NewPollCard: React.FC<Props> = ({
  firstDefaultPercentage,
  secondDefaultPercentage,
}) => {
  const defaultOptions = React.useMemo(
    () => [
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
    ],
    [firstDefaultPercentage, secondDefaultPercentage]
  );

  const [options, setOptions] = React.useState<Option[]>(defaultOptions);
  const [question, setQuestion] = React.useState('');
  const [isPrivate, setIsPrivate] = React.useState<boolean>(true);
  const [privateUrl, setPrivateUrl] = React.useState<string>('');

  const resetForm = React.useCallback(() => {
    setOptions(defaultOptions);
    setQuestion('');
    setIsPrivate(true);
  }, [defaultOptions]);

  return (
    <div>
      {privateUrl && (
        <NewPollSuccessAlert
          setPrivateUrl={setPrivateUrl}
          privateUrl={privateUrl}
        />
      )}

      <div className="flex mt-8 flex-col p-8 bg-white shadow-md rounded-lg">
        <NewPollHeader
          options={options}
          question={question}
          isPrivate={isPrivate}
          resetForm={resetForm}
          setQuestion={setQuestion}
          setPrivateUrl={setPrivateUrl}
        />

        <NewPollIsPublic isPrivate={isPrivate} setIsPrivate={setIsPrivate} />

        <div className="form-check p-1 mt-1">
          {options.map((option, i) => (
            <NewPollOptions
              key={option.id}
              option={option}
              index={i}
              setOptions={setOptions}
              totalOptions={options.length}
            />
          ))}
        </div>

        <NewPollAddNewOptionButton setOptions={setOptions} />
      </div>
    </div>
  );
};

export default NewPollCard;
