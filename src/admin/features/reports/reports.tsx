import React, { useState, useEffect, useRef } from 'react';
import { FilterMatchMode } from 'primereact/api';
import { useNavigate } from 'react-router-dom';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Toast } from 'primereact/toast';
import { InputText } from 'primereact/inputtext';
import { useSelector } from 'react-redux';
import moment from 'moment';
import { classNames } from 'primereact/utils';
import { Message } from 'primereact/message';
import { ProgressSpinner } from 'primereact/progressspinner';
import { adminReportsActions } from './reportsSlice';
import { selectInComeReportDetails } from './reportsSelectors';
import ReportFilter from './reportFilter';
import ExportPdf from './generatePdf';
import { useRedux } from 'hooks';
import { clearState } from 'storeConfig/apiStatus/apiSlice';
import { getApiState } from 'storeConfig/apiStatus/apiSelector';

/* eslint-disable */
export default function ManageReports() {

    const initialFilters = {
        devoteePhoneNumber: '',
        ticketId: '',
        devoteeId:'',
        serviceName: '',
        devoteeName: '',
        createdAt: '',
    }
    
    const showToast = (severity: any, summary: any, detail: any) => {
        toast.current.show({ severity, summary, detail });
    };
    
    const [seachFilter, setSeachFilters] = useState(initialFilters);
    const [filterSubmitted, setFilterSubmitted] = useState(false);
    const [searchError,setSearchError] = useState('');
    const [seachParams,SetsearchParams] = useState({});

    const handleInputChange = (name:string, value:any) => {
        if (name === 'createdAt' && moment(value, moment.ISO_8601, true).isValid()) {
            value = moment(value).format('YYYY-MM-DD');
        }

        setSeachFilters({ ...seachFilter, [name]: value });
    };

    const ClearHandler = (e: any) => {
        setSeachFilters(initialFilters);
        setFilterSubmitted(false);
    }

    const handleGoBack = () => {
        setFilterSubmitted(false);
    }

    const isSearchValid = () => {
        return Object.values(seachFilter).some(value => value !== '');
    }

   
    const SearchHandler = () => {
        // if (!isSearchValid()) {
        //     // Display an error message or handle invalid search
        //     setSearchError('Please fill in at least one search field.');
        //     return;
        // }

        if (!isSearchValid()) {
            SetsearchParams({});
        } else {
            SetsearchParams(seachFilter)
        }
   
        setFilterSubmitted(true);
      
    }

    const componentRef = useRef(null);
    const navigate = useNavigate();
    const { loading, error, successMessage } = useSelector(getApiState);

    const [filters, setFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    });

    const [Reports, setReports] = useState<any>([]);
    const [selectedReports, setSelectedReports] = useState<any>(null);
    const [globalFilter, setGlobalFilter] = useState(null);
    const toast = useRef<any>(null);
    const dt = useRef<any>(null);
    const { dispatch, appSelector } = useRedux();

    const ReportList: any = appSelector(selectInComeReportDetails);

    const cols = [
        { field: 'ticketId', header: 'TicketID' },
        { field: 'devoteeId', header: 'DID' },
        { field: 'devoteeName', header: 'FirstName' },
        { field: 'devoteePhoneNumber', header: 'Phone number' },
        { field: 'serviceName', header: 'ServiceName' },
        { field: 'cost', header: 'Cost' },
        { field: 'totalAmount', header: 'TotalAmount' },
        { field: 'paymentType', header: 'PaymentType' }
    ];

    const exportColumns = cols.map((col) => ({ title: col.header, dataKey: col.field }));

    const onGlobalFilterChange = (event: any) => {
        const value = event.target.value;
        let _filters = { ...filters };
        _filters['global'].value = value;
        setFilters(_filters);
    };

    useEffect(() => {
        if (filterSubmitted) {
          dispatch(adminReportsActions.getReports(seachParams));
        }
      }, [filterSubmitted, seachParams, dispatch]);
      

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

    useEffect(() => {
        setSearchError('');
    }, [seachFilter]);


    const exportCSV = (selectionOnly: any) => {
        dt.current.exportCSV({ selectionOnly });
    };


    console.log(searchError);
    const formatDate = (rowData: any) => moment(rowData).format('DD-MM-YYYY');

    const header = () => {
        const value = filters['global'] ? filters['global'].value : '';
        return (
            <>
                <div className="flex admin-annual-reports align-items-center justify-content-end gap-2">
                    <Button type="button" icon="pi pi-file" rounded onClick={() => exportCSV(false)} data-pr-tooltip="CSV" />
                    <ExportPdf reportList={ReportList}/>
                </div>
                <div className="flex flex-wrap gap-2 align-items-center justify-content-between">

                    <h4 className="m-0"><b>Income report</b></h4>
                    <span className="p-input-icon-left mb-1">
                        <i className="pi pi-search" />
                        <InputText type="search" value={value || ''} onChange={(e) => onGlobalFilterChange(e)} placeholder="Search in report list" />
                    </span>
                </div>
            </>
        )
    }

    return (
        <div className='admin-report-list-section'>

            {loading && (
                <div className="p-d-flex p-jc-center">
                    <ProgressSpinner />
                </div>
            )}

            {searchError && (
                <Message severity="error" text={searchError} style={{ marginBottom: '1rem', width: '100%', maxWidth: '400px' }} />
            )}

            {(!filterSubmitted) && (
                <ReportFilter seachFilter={seachFilter} ClearHandler={ClearHandler} handleInputChange={handleInputChange} SearchHandler={SearchHandler} />
            )}
            
            
            <Toast ref={toast} />
            {filterSubmitted && !loading && !error ? (
                
            <div className="admin-income-report">
           <Button label="Go Back to Search Form" onClick={handleGoBack} className="p-button-secondary mb-3" />

               
                <DataTable
                    ref={dt}
                    filters={filters} onFilter={(e: any) => setFilters(e.filters)}
                    value={ReportList}
                    selection={selectedReports}
                    onSelectionChange={(e: any) => setSelectedReports(e.value)}
                    dataKey="tickerId"
                    paginator
                    rows={10}
                    rowsPerPageOptions={[5, 10, 25]}
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    currentPageReportTemplate="Showing {first} to {last} of {totalRecords} Reports"
                    globalFilter={globalFilter}
                    header={header}
                >
                    <Column field="ticketId" header="TicketID" />
                    <Column field="devoteeId" header="DevoteeID" />
                    <Column field="devoteeName" header="Deveotee name" />
                    <Column field="devoteePhoneNumber" header="Phone number" />
                    <Column field="devoteeEmail" header="Email Id" />
                    <Column field="serviceName" header="Service name" />
                    <Column
                        field="transStatus"
                        sortable
                        style={{ width: "2rem" }}
                        header="TransStatus"
                        body={(rowData: any) => (
                            <span
                                className={classNames({
                                    "p-tag p-tag-success":
                                        rowData.transStatus === "succeeded",
                                    "p-tag p-tag-danger":
                                        rowData.transStatus === "failed",
                                    "p-tag p-tag-new":
                                        rowData.transStatus === "new",
                                })}
                            >
                                {rowData.transStatus}
                            </span>
                        )}
                    />
                    <Column field="orderNotes" header="Devotee notes" />
                    <Column field="paymentMode" header="Payment Mode" />
                    <Column field="amount" header="Amount" />
                    <Column field="createdAt" sortable header="Booked date" body={(rowData) => formatDate(rowData.createdAt)} />
                </DataTable>
            </div>
           
) : searchError ? (
    <Message severity="error" text={error} style={{ marginBottom: '1rem', width: '100%', maxWidth: '400px' }} />
) : null}
        </div>
    );
}
