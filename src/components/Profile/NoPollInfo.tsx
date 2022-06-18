import { useRouter } from 'next/router';
import React from 'react';
import SvgInfo from '../Icons/svg/Info';

type Props = {
  isPrivate: boolean;
};

const NoPollInfo: React.FC<Props> = ({ isPrivate }) => {
  const router = useRouter();

  return (
    <div
      className="p-4 mb-4 mt-12 transition-all duration-200 text-sm text-sky-700 bg-sky-100 rounded-lg dark:bg-sky-100 dark:text-sky-700"
      role="alert"
    >
      <div className="flex items-center mb-3 flex-row">
        <SvgInfo className="inline flex-shrink-0 mr-3 w-5 h-5" />
        <span className="font-bold">
          You don&apos;t have any {isPrivate ? 'private' : 'public'} polls yet!
        </span>
      </div>
      <p>
        You can create from{' '}
        <span
          onClick={() => router.push('/new')}
          className="font-bold cursor-pointer select-none"
        >
          here.
        </span>
      </p>
    </div>
  );
};

export default NoPollInfo;
