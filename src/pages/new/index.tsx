import SvgHome from '@/components/Icons/svg/Home';
import NewPollCard from '@/components/NewPoll/NewPollCard';
import MainLayout from '@/layouts/MainLayout';
import { generateRandomNumber } from '@/utils/generateRandomNumber';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import React from 'react';

export async function getStaticProps() {
  return {
    props: {
      firstDefaultPercentage: `${String(generateRandomNumber(1, 100))}%`,
      secondDefaultPercentage: `${String(generateRandomNumber(1, 100))}%`,
    },
  };
}

type Props = {
  firstDefaultPercentage: string;
  secondDefaultPercentage: string;
};

const NewPoll: NextPage<Props> = ({
  firstDefaultPercentage,
  secondDefaultPercentage,
}) => {
  const router = useRouter();

  return (
    <MainLayout
      title="New Poll"
      rightButton={
        <button
          onClick={() => router.push('/')}
          type="button"
          className="text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center mr-2 dark:bg-indigo-500 dark:hover:bg-indigo-500 dark:focus:ring-indigo-400"
        >
          <SvgHome className="w-5 h-5" />
        </button>
      }
    >
      <NewPollCard
        firstDefaultPercentage={firstDefaultPercentage}
        secondDefaultPercentage={secondDefaultPercentage}
      />
    </MainLayout>
  );
};

export default NewPoll;
