import React, { useEffect, useState } from 'react';
import { eventsActions } from '../eventsSlice';
import { selectEventsList } from '../eventSelector';
import EventTopBar from './eventTopbar';
import EventContent from './eventContent';
import EventDate from './eventDate';
import useRedux from 'hooks/useRedux';
import { getFilterEvents } from 'helpers/event';

function Events() {
    const { dispatch, appSelector } = useRedux();
    const [filterSortType, setFilterSortType] = useState('');
    const [pageCount, setPageCount] = useState(0);
    const [filterSortValue, setFilterSortValue] = useState('');
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());

    useEffect(() => {
        dispatch(eventsActions.fetchEvents());
    }, [dispatch]);

    const eventsList:any = appSelector(selectEventsList);

    const [currentData, setCurrentData] = useState([]);
    const [offset, setItemOffset] = useState(0);

    const pageLimit = 3;

    const handlePageClick = (event:any) => {
        const newOffset = (event.selected * pageLimit) % eventsList.length;
        setItemOffset(newOffset);
    };

    const getFilterSortParams = (sortTypeVal:any, sortVal:any, e:any) => {
        let SearchVal;
        if (sortTypeVal !== 'datesearch') {
            const elems = document.querySelector('.events-selector-list-items-active');
            if (elems !== null) {
                elems.classList.remove('events-selector-list-items-active');
            }
            e.target.parentNode.classList.add('events-selector-list-items-active');
        }

        if (sortTypeVal === 'topsearch') {
            SearchVal = sortVal.current?.value;
        } else if (sortTypeVal === 'monthsearch') {
            const currentDate:Date = new Date();
            const currentMonth = currentDate.getMonth() + 1;
            const currentYear = currentDate.getFullYear();
            SearchVal = `${currentMonth}-${currentYear}`;
            setSelectedDate(currentDate);
        } else if (sortTypeVal === 'daysearch') {
            const currentDate:Date = new Date();
            const currentMonth = currentDate.getMonth() + 1;
            const currentYear = currentDate.getFullYear();
            const currentDay = currentDate.getDate();
            SearchVal = `${currentDay}-${currentMonth}-${currentYear}`;
            setSelectedDate(currentDate);
        } else if (sortTypeVal === 'datesearch') {
            SearchVal = sortVal;
            setSelectedDate(sortVal);
        }

        setFilterSortType(sortTypeVal);
        setFilterSortValue(SearchVal);
    };

    useEffect(() => {
        const filterSortedEvents = getFilterEvents(eventsList, filterSortType, filterSortValue);
        const pageCounts = Math.ceil(filterSortedEvents.length / pageLimit);
        setPageCount(pageCounts);
        setCurrentData(filterSortedEvents.slice(offset, offset + pageLimit));
    }, [offset, filterSortType, filterSortValue, eventsList]);

    return (
        <section className="area-padding">
            <EventTopBar SelectedDate={selectedDate} getFilterSortParams={getFilterSortParams} />
            <EventDate filterSortType={filterSortType} SelecteGlobaldDate={selectedDate} getFilterSortParams={getFilterSortParams} onchangclick={handlePageClick} events={eventsList} currentEventData={currentData} pageCount={pageCount} />
            <EventContent onchangclick={handlePageClick} events={eventsList} currentEventData={currentData} pageCount={pageCount} />
        </section>
    );
}

export default Events;
