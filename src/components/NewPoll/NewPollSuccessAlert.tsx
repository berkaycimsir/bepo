import React from 'react';
import SvgInfo from '../Icons/svg/Info';

type Props = {
  privateUrl: string;
  setPrivateUrl: React.Dispatch<React.SetStateAction<string>>;
};

const NewPollSuccessAlert: React.FC<Props> = ({
  privateUrl,
  setPrivateUrl,
}) => {
  const copyUrlToClipboard = React.useCallback(() => {
    navigator.clipboard.writeText(String(privateUrl));
    setPrivateUrl('');
  }, [privateUrl, setPrivateUrl]);

  return (
    <div
      className="p-4 mb-4 transition-all duration-200 text-sm border-green-200 border border-t-8 text-green-700 bg-green-100 rounded-lg dark:bg-green-100 dark:text-green-800"
      role="alert"
    >
      <div className="flex items-center mb-3 flex-row">
        <SvgInfo className="inline flex-shrink-0 mr-3 w-5 h-5" />
        <span className="font-bold">Your poll was created successfully !</span>
      </div>
      <p>
        Here is your{' '}
        <span
          onClick={copyUrlToClipboard}
          className="font-bold cursor-pointer select-none"
        >
          private url
        </span>
        . Click to copy it to your clipboard.
      </p>
    </div>
  );
};

export default NewPollSuccessAlert;
