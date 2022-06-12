import React from 'react';

type Props = {
  title: string;
  rightButton?: JSX.Element;
  children: React.ReactNode;
};

const MainLayout: React.FC<Props> = ({ rightButton, children, title }) => {
  return (
    <div className="container mx-auto p-20">
      <div className="flex flex-row justify-between">
        <h1 className="text-3xl text-stone-600 font-bold mb-3">{title}</h1>

        {rightButton}
      </div>
      <hr className="my-8 border-gray-100" />
      {children}
    </div>
  );
};

export default MainLayout;
