import React, { useState, useRef, useEffect } from 'react';
import { FilterMatchMode } from 'primereact/api';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { useNavigate } from 'react-router-dom';
import { Button } from 'primereact/button';
import { useSelector } from 'react-redux';
import { selectFamilies } from '../myProfileSelectors';
import { myprofileActions } from '../myProfileSlice';
import { useRedux, useUser } from 'hooks';

import DeleteDiaLog from 'sharedComponents/dialogs/dialogs';
import { clearState } from 'storeConfig/apiStatus/apiSlice';
import Loader from 'sharedComponents/loader/loader';
import { getApiState } from 'storeConfig/apiStatus/apiSelector';

/* eslint-disable */
interface Families{
    _id:string;
    relationship:string;
    firstName: string;
    lastName: string;
    dateOfbirth: string;
    star: string;
    gotram: string;
}

function ManageFamily() {

    const navigate = useNavigate();
    const { loading, error, successMessage } = useSelector(getApiState);

    const showToast = (severity:any, summary:any, detail:any) => {
        toast.current.show({ severity, summary, detail });
    };

    const emptyFamily:Families = {
        _id:'',
        relationship: '',
        firstName: '',
        lastName: '',
        dateOfbirth: '',
        star: '',
        gotram: ''
    };

    const [filters, setFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    });

    const [famlies, setFamilies] = useState<any>([]);
    const [FamilyDialog, setFamilyDialog] = useState(false);
    const [deleteFamilyDialog, setDeleteFamilyDialog] = useState(false);
    const [family, setFamily] = useState(emptyFamily);
    const [selectedFamilys, setSelectedFamilys] = useState<any>(null);
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState(null);
    const toast = useRef<any>(null);
    const dt = useRef<any>(null);
    const { dispatch,  appSelector } = useRedux();
    const [loggedInUser] = useUser();

    const editFamily = (EditData:any) => {
        let url = '/myprofile/editfamily/'+EditData._id;
        navigate(url);
    }
    const confirmDeleteFamily = (Family:any) => {
        setFamily(Family);
        setDeleteFamilyDialog(true);
    };

    useEffect(() => {
        dispatch(myprofileActions.getFamily({ userid: loggedInUser.id }));
    }, [dispatch]);

    const Families:any = appSelector(selectFamilies);

    const actionBodyTemplate = (rowData:any) => (
        <>
            <Button icon="pi pi-pencil" rounded outlined className="mr-2" onClick={() => editFamily(rowData)} />
            <Button icon="pi pi-trash" rounded outlined severity="danger" onClick={() => confirmDeleteFamily(rowData)} />
        </>
    );

    const hideDialog = () => {
        setSubmitted(false);
        setFamilyDialog(false);
    };

    const deleteFamily = () => {
        dispatch(myprofileActions.deleteFamily({userid:loggedInUser.id,id:family._id}));
        setDeleteFamilyDialog(false);
    };   

    const openNew = () => {
        navigate("/myprofile/addfamily");
    }

    const LeftToolbarTemplate = () => (
        <div className="flex flex-wrap gap-2 mb-2">
            <Button label="New" className='submit-btn' icon="pi pi-plus me-1" severity="success" onClick={openNew} />
        </div>
    );

    const hideDeleteFamilyDialog = () => {
        setDeleteFamilyDialog(false);
    };

    useEffect(() => {
        if (successMessage) {
            showToast('success', 'Success', successMessage);
            dispatch(clearState());
            //reset();
        }

        if (error) {
            showToast('error', 'Error', error);
            dispatch(clearState());
        }
    }, [successMessage, error, dispatch]);

    const deleteFamilyDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" outlined onClick={hideDeleteFamilyDialog} />
            <Button label="Yes" icon="pi pi-check" severity="danger" onClick={deleteFamily} />
        </>
    );

    return (
        <>
           <Toast ref={toast} />
            {loading && <Loader />}
            <h5><b>Family:</b></h5>
           <LeftToolbarTemplate />
            <DataTable
                ref={dt}
                filters={filters}
                onFilter={(e:any) => setFilters(e.filters)}
                value={Families}
                selection={selectedFamilys}
                onSelectionChange={(e:any) => setSelectedFamilys(e.value)}
                dataKey="_id"
                paginator
                rows={10}
            >
                <Column field="relationship" header="Relationship"  style={{ minWidth: '0.9rem' }} />
                <Column field="firstName" header="FirstName" sortable style={{ minWidth: '1rem' }} />
                <Column field="lastName" header="LastName"  style={{ minWidth: '1rem' }} />
                <Column field="star" header="Star"  style={{ minWidth: '0.3rem' }} />
                <Column field="gotram" header="Gotram"  style={{ minWidth: '0.3rem' }} />
                <Column body={actionBodyTemplate} exportable={false} style={{ minWidth: '1rem', textAlign: 'center' }} />
            </DataTable>
      

            <DeleteDiaLog
                deleteonClick={deleteFamilyDialog}
                deleteDialogFooter={deleteFamilyDialogFooter}
                hideDeleteDialog={hideDeleteFamilyDialog}
                deleteTitle={family.firstName}
                dataLength={family}
            />
        </>
    );
}

export default ManageFamily;
