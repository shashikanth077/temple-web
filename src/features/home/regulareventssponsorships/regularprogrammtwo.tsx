import React from 'react';
import RegularSponsorsCommon from './regularprogrammsCommon';
import { selectStaticContentHome } from 'features/content/contactSelectors';
import { useRedux } from 'hooks';

const RegularSponsorsOne = () => {
    const { appSelector } = useRedux();

    const ProgramStaticData:any = appSelector(selectStaticContentHome);

    return (
        <RegularSponsorsCommon
            title1={ProgramStaticData?.regularProgram?.regularProgramTitleOne}
            url1={ProgramStaticData?.regularProgram?.link1}
            url2={ProgramStaticData?.regularProgram?.link2}
            title2={ProgramStaticData?.regularProgram?.regularProgramTitleTwo}
            buttonTitle={ProgramStaticData?.regularProgram?.btnName}
        />
    );
};

export default RegularSponsorsOne;
