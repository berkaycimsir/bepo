import { getPollPrivateUrl } from '@/utils/poll';
import { inferQueryOutput } from '@/utils/trpc';
import React from 'react';
import SvgCheck from '../Icons/svg/Check';
import SvgClipboard from '../Icons/svg/Clipboard';
import PollVoteButton from './PollVoteButton';

type Props = {
  poll: inferQueryOutput<'poll.public-polls'>['polls'][0];
  currentVote: { id: number };
  totalVotes: number;
  userVote:
    | inferQueryOutput<'poll.public-polls'>['polls'][0]['options'][0]
    | undefined;
  isDetails: boolean;
  isProfilePage: boolean;
};

const PollFooter: React.FC<Props> = ({
  poll,
  currentVote,
  totalVotes,
  userVote,
  isDetails,
  isProfilePage,
}) => {
  const [copied, setCopied] = React.useState(false);

  const copyPrivateUrlToClipboard = React.useCallback(() => {
    navigator.clipboard.writeText(String(getPollPrivateUrl(poll.privateId)));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [poll.privateId]);

  return (
    <div className="mt-10 flex flex-row items-center justify-between">
      <div className="text-gray-400 font-normal text-sm">
        Total Votes: {totalVotes}
      </div>

      {isProfilePage && (
        <button
          onClick={copyPrivateUrlToClipboard}
          type="button"
          className={`
             ${
               copied ? 'bg-green-100' : 'hover:bg-stone-100'
             } rounded-xl py-2 pr-4 pl-2 focus:outline-none font-lg text-sm text-center inline-flex items-center
            `}
        >
          {copied ? (
            <SvgCheck className="w-5 h-5 mx-2 text-green-500" />
          ) : (
            <SvgClipboard className="w-5 h-5 mx-2 text-stone-600" />
          )}
          <div
            className={`font-bold ${
              copied ? 'text-green-500' : 'text-stone-600'
            }`}
          >
            {copied
              ? 'Copied'
              : poll.private
              ? 'Copy Private Link'
              : 'Copy Link'}
          </div>
        </button>
      )}

      {!isProfilePage && (
        <PollVoteButton
          userVote={userVote}
          pollId={poll.id}
          currentVote={currentVote}
          isDetails={isDetails}
          pollPrivateId={poll.privateId}
        />
      )}
    </div>
  );
};

export default PollFooter;
