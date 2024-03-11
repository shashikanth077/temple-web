import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import Datepicker from 'sharedComponents/datepicker/datepicker';

/* eslint-disable */
interface EventProps{
    events:any;
    currentEventData:any;
    pageCount:number;
    getFilterSortParams:any;
    onchangclick:any;
    SelecteGlobaldDate:Date;
    filterSortType:string;
}

function EventDate(props:EventProps) {

    const {
        filterSortType, SelecteGlobaldDate,pageCount, onchangclick, getFilterSortParams,
    } = props;

    const [selectedDate, setSelectedDate] = useState<Date>(new Date());

   useEffect(() => {
    if(filterSortType == 'monthsearch') {
        setSelectedDate(SelecteGlobaldDate);
    } else if(filterSortType == 'daysearch'){
        setSelectedDate(SelecteGlobaldDate);
    }
   },[SelecteGlobaldDate]);

   const onDateChange = (date: Date) => {
        if (date) {
            getFilterSortParams('datesearch',date)
            setSelectedDate(date);
        }
    };

    return (
        <div className="container">
            <div className="events-top-bar events-header-top-bar">
                <nav className="events-top-bar-nav">
                    <ul className="events-top-bar-nav-list">
                        <div className="pro-pagination-style text-center">
                            <nav aria-label="Page navigation comments">
                                <ReactPaginate
                                    nextLabel=">>"
                                    breakClassName="page-item-none"
                                    pageClassName="page-item-none"
                                    activeClassName="active"
                                    onPageChange={onchangclick}
                                    pageRangeDisplayed={5}
                                    pageCount={pageCount}
                                    previousLabel="<<"
                                    renderOnZeroPageCount={null}
                                />
                            </nav>
                        </div>
                    </ul>
                </nav>

                <a onClick={e => getFilterSortParams('daysearch', '', e)} className="events-top-bar-today-button" aria-label="Click to select today's date" title="Click to select today's date">
                    Today
                </a>

                <div className="events-top-bar-actions" />
                <div className="events-top-bar-datepicker">
                    <Datepicker
                        hideAddon={'other'}
                        inputClass='events-top-bar-datepicker-button'
                        value={selectedDate}
                        dateFormat={'MMM dd,yyyy'}
                        onChange={(date: Date) => {
                            onDateChange(date);
                        }}
                    />
                   
                </div>
            </div>
        </div>
    );
}

export default EventDate;
