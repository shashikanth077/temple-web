import React from 'react';
import Services from '../services/serviceHome/serviceList';
import Bookings from '../bookings/booking';
import Staffs from '../staffs/staff';
import Ads from '../adversitments/adversiments';
import Shop from './shopSlide/shopSlide';
import Banner from './banner/Banner';
import Recentevents from './homeevents/recentEvents';
import About from './about/about';
import GrandprogramOne from './grandprogramms/grandprogramHomeOne';
import GrandprogramHomeTwo from './grandprogramms/grandProgrammHomeTwo';
import AboutImage from './about/aboutImagesection/aboutimage';
import Dailyevents from './homeevents/dailyevent';
import RegularSponsorsOne from './regulareventssponsorships/regularprogrammtwo';
import RegularSponsorsTwo from './regulareventssponsorships/regularprogrammone';
import RegularEventSlides from './homeevents/regularprogrammsponsor';

function Home() {
    return (
        <>
            <Banner />
            {/* <About />
            <AboutImage /> */}
            <Services />
            <GrandprogramOne />
            <Bookings />
            <Recentevents />
            <RegularSponsorsOne />
            <Staffs />
            <RegularEventSlides />
            <GrandprogramHomeTwo />
            <Ads />
            <Dailyevents />
            <RegularSponsorsTwo />
            <Shop />
            {/* <AboutImage /> */}
        </>
    );
}

export default Home;
