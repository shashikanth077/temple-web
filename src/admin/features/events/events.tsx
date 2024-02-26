import React, { useState, useEffect, useRef } from 'react';
import { FilterMatchMode } from 'primereact/api';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { Toolbar } from 'primereact/toolbar';
import { InputText } from 'primereact/inputtext';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import moment from 'moment';
import { useIntl } from 'react-intl';
import { eventsActions } from '../../../features/events/eventsSlice';
import { adminEventActions } from './adminEventSlice';
import DeleteDiaLog from 'sharedComponents/dialogs/dialogs';
import { useRedux } from 'hooks';
import { Event } from 'models';
import { selectEventsList } from 'features/events/eventSelector';
import { clearState } from 'storeConfig/api/apiSlice';
import ImageComponent from 'sharedComponents/Image/image';
import { formatCurrency } from 'helpers/currency';

/* eslint-disable */
export default function Events() {
    
    const emptyEvent:Event = {
        _id:'dummy',
        name:'',
        bookingPrice:'',
        organizerPhone:'',
        organizerEmail:'',
        venue:'',
        startDate: new Date(),
        endDate:new Date(),
        organizer: '',
        image:'',
        description:'',
    }

    const { loading, error, successMessage } = useSelector((state:any) => state.apiState);

    const showToast = (severity:any, summary:any, detail:any) => {
        toast.current.show({ severity, summary, detail });
    };
     
    const navigate = useNavigate();
    const [filters, setFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    });

    const [events, setEvents] = useState<any>([]);
    const intl = useIntl();
    const [deleteEventDialog, setDeleteEventDialog] = useState(false);
    const [event, setEvent] = useState(emptyEvent);
    const [selectedEvents, setSelectedEvents] = useState<any>(null);
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState(null);
    const toast = useRef<any>(null);
    const dt = useRef<any>(null);
    const { dispatch, appSelector } = useRedux();

    useEffect(() => {
        dispatch(eventsActions.fetchEvents());
    }, [dispatch]);
   
     
    const openNew = () => {
        navigate("/admin/events/add");
    };

    const hideDeleteEventDialog = () => {
        setDeleteEventDialog(false);
    };
       
    const onGlobalFilterChange = (event:any) => {
        const value = event.target.value;
        let _filters = { ...filters };
        _filters['global'].value = value;
        setFilters(_filters);
    };

    const editEvent = (data:any) => {
        navigate("/admin/events/edit/"+data._id);
    };

    const confirmDeleteEvent = (Event:any) => {
        setEvent(Event);
        setDeleteEventDialog(true);
    };

    const deleteEvent = () => {
        const _events = events.filter((val:any) => val !== event._id);
        setEvent(_events);
        dispatch(adminEventActions.deleteEvent({_id:event._id}))
        setDeleteEventDialog(false);
        setEvent(emptyEvent);
    };

    useEffect(() => {
        if (successMessage) {
            showToast('success', 'Success', successMessage);
            dispatch(clearState());
        }

        if (error) {
            showToast('error', 'Error', error);
            dispatch(clearState());
        }
    }, [successMessage, error, dispatch]);

    const exportCSV = () => {
        dt.current.exportCSV();
    };

    const leftToolbarTemplate = () => (
        <div className="flex flex-wrap gap-2">
            <Button label="New" icon="pi pi-plus me-1" severity="success" onClick={openNew} />
        </div>
    );

    const rightToolbarTemplate = () => <Button label="Export" icon="pi pi-upload" className="p-button-help" onClick={exportCSV} />;
    const actionBodyTemplate = (rowData:any) => (
        <>
            <Button icon="pi pi-pencil" rounded outlined className="mr-2" onClick={() => editEvent(rowData)} />
            <Button icon="pi pi-trash" rounded outlined severity="danger" onClick={() => confirmDeleteEvent(rowData)} />
        </>
    );

    const header = () => {
        const value = filters['global'] ? filters['global'].value : '';
        return (
            <div className="flex flex-wrap gap-2 align-items-center justify-content-between">
            <h4 className="m-0">Manage Events</h4>
            <span className="p-input-icon-left mb-1">
                <i className="pi pi-search" />
                <InputText type="search" value={value || ''} onChange={(e) => onGlobalFilterChange(e)} placeholder="Search Events" />
            </span>
        </div>
        )
    }
    
    const dateFormatBody = (rowData:any) => {
        return moment(rowData.startDate).format('YYYY-MM-DD HH:mm');
    }

    const dateFormatEndBody = (rowData:any) => {
        return moment(rowData.endDate).format('YYYY-MM-DD HH:mm');
    }

    const deleteEventDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" outlined onClick={hideDeleteEventDialog} />
            <Button label="Yes" icon="pi pi-check" severity="danger" onClick={deleteEvent} />
        </>
    );

    const imageBodyTemplate = (rowData:any) => <ImageComponent  imageUrl={`${rowData?.image}`} altText={rowData.name} classname="shadow-2 border-round" style={{ width: '64px' }} />;
    const priceBodyTemplate = (rowData:any) => formatCurrency(intl,rowData.bookingPrice);
    const eventsList:any = appSelector(selectEventsList);

    console.log("eventsList",eventsList);
    
    return (
        <div>
            <Toast ref={toast} />
            <div className="">
                <Toolbar className="mb-4" left={leftToolbarTemplate} right={rightToolbarTemplate} />

                <DataTable
                    ref={dt}
                    filters={filters} onFilter={(e:any) => setFilters(e.filters)}
                    value={eventsList}
                    selection={selectedEvents} 
                    onSelectionChange={(e:any) => setSelectedEvents(e.value)} 
                    dataKey="_id"
                    paginator
                    rows={10}
                    rowsPerPageOptions={[5, 10, 25]}
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    currentPageReportTemplate="Showing {first} to {last} of {totalRecords} events"
                    globalFilter={globalFilter}
                    header={header}
                >
                    <Column field="name" header="Event name" sortable style={{ minWidth: '10rem' }} />
                    <Column field="organizer" header="Organizer" sortable style={{ minWidth: '10rem' }} />
                    <Column field="bookingPrice" body={priceBodyTemplate} header="Booking price" sortable style={{ minWidth: '10rem' }} />
                    <Column field="startDate"  body={dateFormatBody} header="Start date" sortable style={{ minWidth: '10rem' }} />
                    <Column field="endDate" body={dateFormatEndBody} header="End date" sortable style={{ minWidth: '10rem' }} />
                    <Column field="image" header="Image" body={imageBodyTemplate} />
                    <Column body={actionBodyTemplate} exportable={false} style={{ minWidth: '6rem',textAlign:'center' }} />
                </DataTable>
            </div>
          

            <DeleteDiaLog 
                deleteonClick={deleteEventDialog}
                deleteDialogFooter={deleteEventDialogFooter}
                hideDeleteDialog={hideDeleteEventDialog}
                deleteTitle={event.name}
                dataLength={event}
            />
          

        </div>
    );
}
