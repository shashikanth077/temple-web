import React from 'react';
import Grandprogram from './grandprogrammCommon';
import { selectStaticContentHome } from 'features/content/contactSelectors';
import { useRedux } from 'hooks';

const GrandprogramHomeOne = () => {
  const { appSelector } = useRedux();

  const ProgramStaticData = appSelector(selectStaticContentHome);
  return (
    <Grandprogram
      title={ProgramStaticData?.donations?.donationOneTitle}
      url={ProgramStaticData?.donations?.link1}
    />
  );
};

export default GrandprogramHomeOne;
