import React, { useState, useEffect, useRef } from 'react';
import { classNames } from 'primereact/utils';
import { FilterMatchMode } from 'primereact/api';
import { useNavigate } from 'react-router-dom';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { useSelector } from 'react-redux';
import { useReactToPrint } from 'react-to-print';
import PrintComponent from './printInvoice';
import { mydonationsActions } from './donationSlice';
import { selectDonationDetails } from './donationsSelectors';
import InvoiceDonationComp from './viewDonationInvoice';
import DeleteDiaLog from 'sharedComponents/dialogs/dialogs';
import { useRedux, useUser } from 'hooks';
import { clearState } from 'storeConfig/api/apiSlice';

interface Donations {
    _id: string;
    name: string;
    holidayOfworkshop: string;
}

/* eslint-disable */
export default function ManageDonations() {

    const emptyGod: Donations = {
        _id: "dummy",
        name: '',
        holidayOfworkshop: ''
    }

    const componentRef = useRef(null);
 
    const handlePrint = useReactToPrint({
        // print: async (printIframe: HTMLIFrameElement) => {
        //   // Do whatever you want here, including asynchronous work
        // //   await generateAndSavePDF(printIframe);
        // },
        content: () => componentRef.current,
      });

    const navigate = useNavigate();
    const { loading, error, successMessage } = useSelector((state: any) => state.apiState);

    const [filters, setFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    });

    const [Donations, setDonations] = useState<any>([]);
    const [donationDialog, setDonationDialog] = useState(false)
    const [deleteGodDialog, setDeleteGodDialog] = useState(false);
    const [god, setGod] = useState(emptyGod);
    const [selectedDonations, setSelectedDonations] = useState<any>(null);
    const [globalFilter, setGlobalFilter] = useState(null);
    const [donationId,setDonationId] = useState<string>('');
    const toast = useRef<any>(null);
    const dt = useRef<any>(null);
    const { dispatch, appSelector } = useRedux();
    const [loggedInUser] = useUser();

    useEffect(() => {
        dispatch(mydonationsActions.getDonations({ userid: loggedInUser.id }));
    }, [dispatch]);

    const DonationList: any = appSelector(selectDonationDetails);
    console.log("DonationList",DonationList);

    const showToast = (severity: any, summary: any, detail: any) => {
        toast.current.show({ severity, summary, detail });
    };

    const openNew = () => {
        navigate("/admin/addgod");
    };

    const hideDeleteGodDialog = () => {
        setDeleteGodDialog(false);
    };

    const onGlobalFilterChange = (event: any) => {
        const value = event.target.value;
        let _filters = { ...filters };
        _filters['global'].value = value;
        setFilters(_filters);
    };

    const viewDonation = (data: any) => {
        setDonationId(data._id);
        setDonationDialog(true);
    };

    const confirmDeleteGod = (God: any) => {
        setGod(God);
        setDeleteGodDialog(true);
    };

    const deleteGod = () => {
        const _Donations = Donations.filter((val: any) => val !== god._id);
        setDonations(_Donations);
        setDeleteGodDialog(false);
        setGod(emptyGod);
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

    const hideDialog = () => {
        setDonationDialog(false);
    };

    const exportCSV = () => {
        dt.current.exportCSV();
    };

    const donationDialogFooter = (
        <React.Fragment>
            <Button label="Cancel" icon="pi pi-times" outlined onClick={hideDialog} />
        </React.Fragment>
    );

    const leftToolbarTemplate = () => (
        <div className="flex flex-wrap gap-2">
            <Button label="New" icon="pi pi-plus me-1" severity="success" onClick={openNew} />
        </div>
    );

    const rightToolbarTemplate = () => <Button label="Export" icon="pi pi-upload" className="p-button-help" onClick={exportCSV} />;
    const actionBodyTemplate = (rowData: any) => (
        <>
            <Button icon="pi pi-eye" rounded outlined className="mr-2" onClick={() => viewDonation(rowData)} />
            <Button icon="pi pi-print" rounded outlined className="mr-2" onClick={() => handlePrint()} />
        </>
    );

    const header = () => {
        const value = filters['global'] ? filters['global'].value : '';
        return (
            <div className="flex flex-wrap gap-2 align-items-center justify-content-between">
                <h4 className="m-0">My Donations</h4>
                <span className="p-input-icon-left mb-1">
                    <i className="pi pi-search" />
                    <InputText type="search" value={value || ''} onChange={(e) => onGlobalFilterChange(e)} placeholder="Search Donations" />
                </span>
            </div>
        )
    }

    const deleteGodDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" outlined onClick={hideDeleteGodDialog} />
            <Button label="Yes" icon="pi pi-check" severity="danger" onClick={deleteGod} />
        </>
    );

    return (
        <div>
            <div style={{ display: "none" }}><PrintComponent ref={componentRef} /></div>
            <Toast ref={toast} />
            <div className="">

                <DataTable
                    ref={dt}
                    filters={filters} onFilter={(e: any) => setFilters(e.filters)}
                    value={DonationList}
                    selection={selectedDonations}
                    onSelectionChange={(e: any) => setSelectedDonations(e.value)}
                    dataKey="_id"
                    paginator
                    rows={10}
                    rowsPerPageOptions={[5, 10, 25]}
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    currentPageReportTemplate="Showing {first} to {last} of {totalRecords} Donations"
                    globalFilter={globalFilter}
                    header={header}
                >
                    <Column field="donationType" header="Donation type" />
                    <Column field="donatedAmount" header="Amount" />
                    <Column field="taxReceiptNo" header="Tax receipt no" />
                    <Column field="transStatus" header="Tran Status" />
                    <Column body={actionBodyTemplate} exportable={false} style={{ minWidth: '6rem', textAlign: 'center' }} />
                </DataTable>
            </div>

            <Dialog visible={donationDialog} style={{ width: '60rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }}  modal className="p-fluid" footer={donationDialogFooter} onHide={hideDialog}>
                 <InvoiceDonationComp donationId={donationId} donationData={DonationList}/> 
            </Dialog>

            <DeleteDiaLog
                deleteonClick={deleteGodDialog}
                deleteDialogFooter={deleteGodDialogFooter}
                hideDeleteDialog={hideDeleteGodDialog}
                deleteTitle={god.name}
                dataLength={god}
            />


        </div>
    );
}
