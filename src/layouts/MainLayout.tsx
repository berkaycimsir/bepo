import React from 'react';

type Props = {
  title?: string;
  rightButton?: JSX.Element;
  children: React.ReactNode;
  showHeader?: boolean;
};

const MainLayout: React.FC<Props> = ({
  rightButton,
  children,
  title,
  showHeader = true,
}) => {
  return (
    <div className="container mx-auto p-20">
      {showHeader && (
        <>
          <div className="flex flex-row justify-between">
            <h1 className="text-3xl text-stone-600 font-bold">{title}</h1>

            {rightButton}
          </div>
          <hr className="my-8 border-gray-100" />
        </>
      )}
      {children}
    </div>
  );
};

export default MainLayout;
