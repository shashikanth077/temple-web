import React, { useState, useEffect, useRef } from 'react';
import { FilterMatchMode } from 'primereact/api';
import { useNavigate } from 'react-router-dom';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Tooltip } from 'primereact/tooltip';
import { DataTable } from 'primereact/datatable';
import { Toast } from 'primereact/toast';
import { InputText } from 'primereact/inputtext';
import { useSelector } from 'react-redux';
import { adminReportsActions } from './reportsSlice';
import { selectInComeReportDetails } from './reportsSelectors';
import ReportFilter from './reportFilter';
import { useRedux } from 'hooks';
import { clearState } from 'storeConfig/api/apiSlice';

/* eslint-disable */
export default function ManageReports() {

    const initialFilters = 
        {
            postalCode: '',
            tickerId: '',
            phoneNumber: '',
            mobileNumber: '',
            devoteeName: '',
            devoteeId: '',
          }
      

    const [seachFilter, setSeachFilters] = useState<any>(initialFilters);

    const handleInputChange = (e:any) => {
        const { name, value } = e.target;
        setSeachFilters({ ...seachFilter, [name]: value });
    };

    const ClearHandler = (e:any) => {
        setSeachFilters(initialFilters); //clean 
    }

    const SearchHandler = () => {
        if(seachFilter.length > 0) {
            dispatch(adminReportsActions.getReports(seachFilter))
        }
    }

    const componentRef = useRef(null);
    const navigate = useNavigate();
    const { loading, error, successMessage } = useSelector((state: any) => state.apiState);

    const [filters, setFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    });

    const [Reports, setReports] = useState<any>([]);
    const [selectedReports, setSelectedReports] = useState<any>(null);
    const [globalFilter, setGlobalFilter] = useState(null);
    const toast = useRef<any>(null);
    const dt = useRef<any>(null);
    const { dispatch, appSelector } = useRedux();

    useEffect(() => {
        dispatch(adminReportsActions.getReports({ userid: '1' }));
    }, [dispatch]);

    const ReportList: any = appSelector(selectInComeReportDetails);
    console.log("ReportList",ReportList);

    const showToast = (severity: any, summary: any, detail: any) => {
        toast.current.show({ severity, summary, detail });
    };

    const cols = [
        { field: 'tickerId', header: 'TicketID' },
        { field: 'did', header: 'DID' },
        { field: 'firstName', header: 'FirstName' },
        { field: 'serviceName', header: 'ServiceName' },
        { field: 'NoOfTickets', header: 'NoOfTickets' },
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
        if (successMessage) {
            showToast('success', 'Success', successMessage);
            dispatch(clearState());
        }

        if (error) {
            showToast('error', 'Error', error);
            dispatch(clearState());
        }
    }, [successMessage, error, dispatch]);


    const exportCSV = (selectionOnly:any) => {
        dt.current.exportCSV({ selectionOnly });
    };

    const exportPdf = () => {
        import('jspdf').then((jsPDF) => {
            import('jspdf-autotable').then(() => {
                const doc:any = new jsPDF.default("landscape", "em");
                doc.autoTable(exportColumns, ReportList);
                doc.save('incomereport.pdf');
            });
        });
    };

    const exportExcel = () => {
        import('xlsx').then((xlsx) => {
            const worksheet = xlsx.utils.json_to_sheet(ReportList);
            const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
            const excelBuffer = xlsx.write(workbook, {
                bookType: 'xlsx',
                type: 'array'
            });

            saveAsExcelFile(excelBuffer, 'products');
        });
    };


    const saveAsExcelFile = (buffer:any, fileName:string) => {
        import('file-saver').then((module) => {
            if (module && module.default) {
                let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
                let EXCEL_EXTENSION = '.xlsx';
                const data = new Blob([buffer], {
                    type: EXCEL_TYPE
                });

                module.default.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
            }
        });
    };

       const header = () => {
        const value = filters['global'] ? filters['global'].value : '';
        return (
            <>
            <div className="flex admin-annual-reports align-items-center justify-content-end gap-2">
                <Button type="button" icon="pi pi-file" rounded onClick={() => exportCSV(false)} data-pr-tooltip="CSV" />
                <Button type="button" icon="pi pi-file-excel" severity="success" rounded onClick={exportExcel} data-pr-tooltip="XLS" />
                <Button type="button" icon="pi pi-file-pdf" severity="warning" rounded onClick={exportPdf} data-pr-tooltip="PDF" />
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
        <div>

            <ReportFilter seachFilter={seachFilter} ClearHandler={ClearHandler} handleInputChange={handleInputChange} SearchHandler={SearchHandler}/>
            
            <Toast ref={toast} />
            <div className="">
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
                    <Column field="tickerId" header="TicketID" />
                    <Column field="did" header="DID" />
                    <Column field="firstName" header="Name" />
                    <Column field="serviceName" header="Service name" />
                    <Column field="NoOfTickets" header="No of tickets" />
                    <Column field="manualTicket" header="Manual tickets" />
                    <Column field="cost" header="Cost" />
                    <Column field="totalAmount" header="Total amount" />
                    <Column field="paymentType" header="Payment type" />
                </DataTable>
            </div>
        </div>
    );
}
