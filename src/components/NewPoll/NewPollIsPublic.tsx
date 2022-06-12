import React from 'react';

type Props = {
  isPrivate: boolean;
  setIsPrivate: React.Dispatch<React.SetStateAction<boolean>>;
};

const NewPollIsPublic: React.FC<Props> = ({ isPrivate, setIsPrivate }) => {
  return (
    <div className="mb-3 flex flex-row items-center">
      <input
        checked={!isPrivate}
        className="form-check-input border border-gray-300 rounded-full transition duration-200 bg-white checked:border-emerald-500 checked:!bg-emerald-500 !ring-0 outline-none mr-3 cursor-pointer"
        type="checkbox"
        onChange={(e) => setIsPrivate(!e.currentTarget.checked)}
      />

      <label className="form-check-label pb-1 select-none inline-block cursor-pointer font-normal text-gray-600">
        public
      </label>
    </div>
  );
};

export default NewPollIsPublic;
