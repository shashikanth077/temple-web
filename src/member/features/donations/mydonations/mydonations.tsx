import React, { useState, useEffect, useRef } from 'react';
import { FilterMatchMode } from 'primereact/api';
import { useNavigate } from 'react-router-dom';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { useSelector } from 'react-redux';
import { classNames } from 'primereact/utils';
import { Toolbar } from 'primereact/toolbar';
import moment from 'moment';
import TaxReceipt from '../taxReceipt';
import { mydonationsActions } from './donationSlice';
import { selectDonationDetails } from './donationsSelectors';
import InvoiceDonationComp from './viewDonationInvoice';
import DeleteDiaLog from 'sharedComponents/dialogs/dialogs';
import { useRedux, useUser } from 'hooks';
import { clearState } from 'storeConfig/apiStatus/apiSlice';
import { getApiState } from 'storeConfig/apiStatus/apiSelector';

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


    const navigate = useNavigate();
    const { loading, error, successMessage } = useSelector(getApiState);

    const [filters, setFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    });

    const [Donations, setDonations] = useState<any>([]);
    const [donationDialog, setDonationDialog] = useState(false);
    const [taxReceiptDialog, setTaxReceiptDialog] = useState(false)
    const [deleteGodDialog, setDeleteGodDialog] = useState(false);
    const [god, setGod] = useState(emptyGod);
    const [selectedDonations, setSelectedDonations] = useState<any>(null);
    const [globalFilter, setGlobalFilter] = useState(null);
    const [donationId, setDonationId] = useState<string>('');
    const toast = useRef<any>(null);
    const dt = useRef<any>(null);
    const { dispatch, appSelector } = useRedux();
    const [loggedInUser] = useUser();

    const handlePrint = (rowData: any) => {
        setTaxReceiptDialog(true);
        setDonationId(rowData._id);
    }


    useEffect(() => {
        dispatch(mydonationsActions.getDonations({ userid: loggedInUser.id }));
    }, [dispatch]);

    const DonationList: any = appSelector(selectDonationDetails);

    const [serialNumbers, setSerialNumbers] = useState<number[]>([]);

    const calculateSerialNumbers = (data: any) => {
        const newSerialNumbers = data.map((_: any, index: number) => index + 1);
        setSerialNumbers(newSerialNumbers);
    };

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

    useEffect(() => {
        if (DonationList) {
            calculateSerialNumbers(DonationList);
        }
    }, [DonationList]);

    const serialNumberTemplate = (rowData: any, column: any) => {
        const index = dt.current?.props.value?.indexOf(rowData) ?? 0;
        return <span>{serialNumbers[index]}</span>;
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
        setTaxReceiptDialog(false);
    };

    const exportCSV = () => {
        dt.current.exportCSV();
    };

    const donationDialogFooter = (
        <React.Fragment>
            <Button label="Cancel" icon="pi pi-times" outlined onClick={hideDialog} />
        </React.Fragment>
    );

    const formatDate = (rowData: any) => moment(rowData?.donationDate).format('DD-MM-YYYY');


    const rightToolbarTemplate = () => <Button label="Export" icon="pi pi-upload" className="p-button-help" onClick={exportCSV} />;
    const actionBodyTemplate = (rowData: any) => (
        <>
            <Button icon="pi pi-eye" rounded outlined className="mr-2" onClick={() => viewDonation(rowData)} />
            <Button icon="pi pi-print" rounded outlined className="mr-2" onClick={() => handlePrint(rowData)} />
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
            <Toast ref={toast} />
            <Toolbar className="mb-4" right={rightToolbarTemplate} />
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
                    <Column
                        key="serialNumber"
                        header="SI #"
                        body={serialNumberTemplate}
                        style={{ textAlign: 'center', width: '1rem' }}
                    />
                    <Column field="donationType" header="Donation type" sortable />
                    <Column field="amount" header="Amount" sortable />
                    <Column field="taxReceiptNo" header="Tax receipt no" sortable />
                    <Column field="donationDate" body={formatDate} header="Date" sortable />
                    <Column
                        field="transStatus"
                        sortable
                        style={{ width: "2rem" }}
                        header="Trans Status"
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
                    <Column body={actionBodyTemplate} exportable={false} style={{ minWidth: '6rem', textAlign: 'center' }} />
                </DataTable>
            </div>

            <Dialog visible={donationDialog} style={{ width: '60rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} modal className="p-fluid" footer={donationDialogFooter} onHide={hideDialog}>
                <InvoiceDonationComp donationId={donationId} donationData={DonationList} />
            </Dialog>

            <Dialog visible={taxReceiptDialog} style={{ width: '60rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} modal className="p-fluid" footer={donationDialogFooter} onHide={hideDialog}>
                <TaxReceipt donationId={donationId} donationData={DonationList} />
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
