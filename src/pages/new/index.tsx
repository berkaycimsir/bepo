import NewPollCard from '@/components/NewPoll/NewPollCard';
import MainLayout from '@/layouts/MainLayout';
import { generateRandomNumber } from '@/utils/generateRandomNumber';
import { NextPage } from 'next';
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
  return (
    <MainLayout title="New Poll">
      <NewPollCard
        firstDefaultPercentage={firstDefaultPercentage}
        secondDefaultPercentage={secondDefaultPercentage}
      />
    </MainLayout>
  );
};

export default NewPoll;
