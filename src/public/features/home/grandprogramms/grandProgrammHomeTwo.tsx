import React from 'react';
import Grandprogram from './grandprogrammCommon';
import { selectStaticContentHome } from 'contents/content/contactSelectors';
import { useRedux } from 'hooks';

const GrandprogramHomeTwo = () => {
    const { appSelector } = useRedux();

    const ProgramStaticData = appSelector(selectStaticContentHome);
    return (
        <Grandprogram
            title={ProgramStaticData?.donations?.donationTwoTitle}
            url={ProgramStaticData?.donations?.link2}
        />
    );
};

export default GrandprogramHomeTwo;
