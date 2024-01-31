import React, { useState, useEffect, useRef } from 'react';
import { FilterMatchMode } from 'primereact/api';
import { useNavigate } from 'react-router-dom';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { useSelector } from 'react-redux';
import { classNames } from 'primereact/utils';
import { Toolbar } from 'primereact/toolbar';
import { Dialog } from 'primereact/dialog';
import { useReactToPrint } from 'react-to-print';
import jsPDF from 'jspdf';
import { saveAs } from 'file-saver';
import PrintComponent from './PrintCertificate';
import { selectVolunters } from './volunteerSelector';
import { adminVolunteersActions } from './volunteerSlice';
import { useRedux } from 'hooks';
import { clearState } from 'storeConfig/api/apiSlice';

/* eslint-disable */

export function Managevolunteers() {
    const navigate = useNavigate();
    const { loading, error, successMessage } = useSelector(
        (state: any) => state.apiState,
    );

    const componentRef = useRef(null);

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    const [filters, setFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    });

    const showToast = (severity: any, summary: any, detail: any) => {
        toast.current.show({ severity, summary, detail });
    };

    const [selectedvolunteerss, setSelectedvolunteerss] = useState<any>(null);
    const [globalFilter, setGlobalFilter] = useState(null);
    const toast = useRef<any>(null);
    const dt = useRef<any>(null);
    const { dispatch, appSelector } = useRedux();
    const [actionType, setActionType] = useState<string>("");

    const [selectedVolunteer, setSelectedVolunteer] = useState<any>(null);
    const [displayConfirmation, setDisplayConfirmation] = useState(false);

    useEffect(() => {
        dispatch(adminVolunteersActions.getVolunteers());
    }, [dispatch]);

    const volunteersDetails: any = appSelector(selectVolunters);

    const onGlobalFilterChange = (event: any) => {
        const value = event.target.value;
        let _filters = { ...filters };
        _filters["global"].value = value;
        setFilters(_filters);
    };

    const exportCSV = () => {
        dt.current.exportCSV();
    };

    const confirmDialog = (rowData: any, type: string) => {
        setSelectedVolunteer(rowData);
        setActionType(type);
        setDisplayConfirmation(true);
    };

    const onHide = () => {
        setSelectedVolunteer(null);
        setActionType("");
        setDisplayConfirmation(false);
    };

    const handleAction = () => {
        if (selectedVolunteer && actionType) {
            if (actionType === "approve") {
                dispatch(
                    adminVolunteersActions.updateVolunteer({
                        status: "approved",
                        _id: selectedVolunteer._id,
                    }),
                );
            } else if (actionType === "reject") {
                dispatch(
                    adminVolunteersActions.updateVolunteer({
                        status: "rejected",
                        _id: selectedVolunteer._id,
                    }),
                );
            }

            onHide(); // Hide the dialog after handling the action
        }
    };

    const rightToolbarTemplate = () => (
        <Button
            label="Export"
            icon="pi pi-upload"
            className="p-button-help"
            onClick={exportCSV}
        />
    );

    const actionBodyTemplate = (rowData: any) => (
        <>
            {rowData.approveStatus !== "approved" &&
                rowData.approveStatus !== "rejected" && (
                    <>
                        <Button
                            icon="pi pi-check"
                            className="mr-2"
                            onClick={() => confirmDialog(rowData, "approve")}
                        />
                        <Button
                            icon="pi pi-times"
                            className="mr-2"
                            onClick={() => confirmDialog(rowData, "reject")}
                        />
                    </>
                )}
            {rowData.approveStatus === "approved" && (
                <>
                    <Button icon="pi pi-check" className="mr-2" disabled />
                    <Button
                        icon="pi pi-print"
                        rounded
                        outlined
                        className="mr-2"
                        onClick={() => handlePrint()}
                    />
                </>
            )}
            {rowData.approveStatus === "rejected" && (
                <Button icon="pi pi-times" className="mr-2" disabled />
            )}
        </>
    );

    const header = () => {
        const value = filters["global"] ? filters["global"].value : "";
        return (
            <div className="flex flex-wrap gap-2 align-items-center justify-content-between">
                <h4 className="m-0">Manage volunteer section</h4>
                <span className="p-input-icon-left mb-1">
                    <i className="pi pi-search" />
                    <InputText
                        type="search"
                        value={value || ""}
                        onChange={(e) => onGlobalFilterChange(e)}
                        placeholder="Search volunteerss"
                    />
                </span>
            </div>
        );
    };

    const verifiedBodyTemplate = (rowData: any) => {
        return (
            <i
                className={classNames("pi", {
                    "true-icon pi-check-circle": rowData.iswhatsupnumber,
                    "false-icon pi-times-circle": !rowData.iswhatsupnumber,
                })}
            ></i>
        );
    };

    useEffect(() => {
        if (successMessage) {
            showToast("success", "Success", successMessage);
            dispatch(clearState());
        }

        if (error) {
            showToast("error", "Error", error);
            dispatch(clearState());
        }
    }, [successMessage, error, dispatch]);

    return (
        <div>
            <Toast ref={toast} />
            <div style={{ display: "none" }}>
                {" "}
                <PrintComponent ref={componentRef} />
            </div>
            <div className="">
                <Toolbar className="mb-4" right={rightToolbarTemplate} />
                <DataTable
                    ref={dt}
                    filters={filters}
                    onFilter={(e: any) => setFilters(e.filters)}
                    value={volunteersDetails}
                    selection={selectedvolunteerss}
                    onSelectionChange={(e: any) =>
                        setSelectedvolunteerss(e.value)
                    }
                    dataKey="_id"
                    paginator
                    rows={10}
                    rowsPerPageOptions={[5, 10, 25]}
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    currentPageReportTemplate="Showing {first} to {last} of {totalRecords} volunteerss"
                    globalFilter={globalFilter}
                    header={header}
                >
                    <Column field="name" header="Name" sortable />
                    <Column field="email" header="Email address" sortable />
                    <Column field="phone" header="phone" />
                    <Column
                        field="iswhatsupnumber"
                        header="Is WhatApp number?"
                        body={verifiedBodyTemplate}
                    />
                    <Column
                        body={actionBodyTemplate}
                        exportable={false}
                        style={{ minWidth: "6rem", textAlign: "center" }}
                    />
                </DataTable>

                <Dialog
                    visible={displayConfirmation}
                    onHide={onHide}
                    header="Confirmation"
                    footer={
                        <div>
                            <Button
                                label="Yes"
                                icon="pi pi-check"
                                onClick={handleAction}
                            />
                            <Button
                                label="No"
                                icon="pi pi-times"
                                onClick={onHide}
                                className="p-button-secondary"
                            />
                        </div>
                    }
                >
                    <p>
                        Are you sure you want to{" "}
                        {actionType === "approve" ? "approve" : "reject"} this
                        volunteer?
                    </p>
                </Dialog>
            </div>
        </div>
    );
}

export default React.memo(Managevolunteers);
