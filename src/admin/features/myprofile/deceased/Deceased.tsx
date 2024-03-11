import React, { useState, useRef, useEffect } from 'react';
import { FilterMatchMode } from 'primereact/api';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { useNavigate } from 'react-router-dom';
import { Button } from 'primereact/button';
import { useSelector } from 'react-redux';
import moment from 'moment';
import { selectDeasedList } from '../myProfileSelectors';
import { myprofileActions } from '../myProfileSlice';
import { useRedux, useUser } from 'hooks';
import DeleteDiaLog from 'sharedComponents/dialogs/dialogs';
import { clearState } from 'storeConfig/apiStatus/apiSlice';
import Loader from 'sharedComponents/loader/loader';
import { getApiState } from 'storeConfig/apiStatus/apiSelector';

/* eslint-disable */
interface DeceasedPersons{
    _id:string;
    relationship:string;
    personName: string;
    star: string;
    gotram: string;
    masam:string;
    deathDate:string;
    placeOfDeath:string;
    paksha:string;
    deathTime:string;
}

function ManageDeceased() {

    const navigate = useNavigate();
    const { loading, error, successMessage } = useSelector(getApiState);

    const emptyDeceased:DeceasedPersons = {
        _id:'',
        relationship:'',
        personName: '',
        star: '',
        gotram:'',
        masam:'',
        deathDate:'',
        placeOfDeath:'',
        paksha:'',
        deathTime:'',
    };

    const [filters, setFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    });

    const showToast = (severity:any, summary:any, detail:any) => {
        toast.current.show({ severity, summary, detail });
    };

    const [famlies, setFamilies] = useState<any>([]);
    const [DeceasedDialog, setDeceasedDialog] = useState(false);
    const [deleteDeceasedDialog, setDeleteDeceasedDialog] = useState(false);
    const [Deceased, setDeceased] = useState(emptyDeceased);
    const [selectedDeceaseds, setSelectedDeceaseds] = useState<any>(null);
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState(null);
    const toast = useRef<any>(null);
    const dt = useRef<any>(null);
    const { dispatch,  appSelector } = useRedux();
    const [loggedInUser] = useUser();

    const editDeceased = (EditData:any) => {
        let url = '/myprofile/edit-deceased/'+EditData._id;
        navigate(url);
    }
    const confirmDeleteDeceased = (Deceased:any) => {
        setDeceased(Deceased);
        setDeleteDeceasedDialog(true);
    };

    useEffect(() => {
        dispatch(myprofileActions.getDeceasedListByUserId({ userid: loggedInUser.id }));
    }, [dispatch]);

    const DeasedList:any = appSelector(selectDeasedList);
    console.log("DeasedList",DeasedList);

    const actionBodyTemplate = (rowData:any) => (
        <>
            <Button icon="pi pi-pencil" rounded outlined className="mr-2" onClick={() => editDeceased(rowData)} />
            <Button icon="pi pi-trash" rounded outlined severity="danger" onClick={() => confirmDeleteDeceased(rowData)} />
        </>
    );

    const deleteDeceased = () => {
        dispatch(myprofileActions.deleteDeceased({userid:loggedInUser.id,id:Deceased._id}));
        setDeleteDeceasedDialog(true);
    };   

    const openNew = () => {
        navigate("/myprofile/add-deceased");
    }

    const LeftToolbarTemplate = () => (
        <div className="flex flex-wrap gap-2 mb-2">
            <Button label="New" className='submit-btn' icon="pi pi-plus me-1" severity="success" onClick={openNew} />
        </div>
    );

    const hideDeleteDeceasedDialog = () => {
        setDeleteDeceasedDialog(false);
    };


    const deleteDeceasedDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" outlined onClick={hideDeleteDeceasedDialog} />
            <Button label="Yes" icon="pi pi-check" severity="danger" onClick={deleteDeceased} />
        </>
    );

    const dateFormatBody = (rowData:any) => {
        return moment(rowData.startDate).format('YYYY-MM-DD');
    }

    useEffect(() => {
        if (successMessage) {
            showToast('success', 'Success', successMessage);
            dispatch(clearState());
        }

        if (error) {
            showToast('error', 'Error', error);
            dispatch(clearState());
        }
    }, [successMessage, error, dispatch])

    return (
        <>
            <Toast ref={toast} />
            {loading && <Loader />}
            <h5><b>Deceased Ancestors:</b></h5>
           <LeftToolbarTemplate />
            <DataTable
                ref={dt}
                filters={filters}
                onFilter={(e:any) => setFilters(e.filters)}
                value={DeasedList}
                selection={selectedDeceaseds}
                onSelectionChange={(e:any) => setSelectedDeceaseds(e.value)}
                dataKey="_id"
                paginator
                rows={10}
            >
                <Column field="relationship" header="Relationship"  style={{ minWidth: '0.9rem' }} />
                <Column field="personName" header="personName" sortable style={{ minWidth: '1rem' }} />
                <Column field="deathDate" body={dateFormatBody} header="deathDate"  style={{ minWidth: '1rem' }} />
                <Column field="deathTime" header="deathTime"  style={{ minWidth: '1rem' }} />
                <Column field="star" header="Star"  style={{ minWidth: '0.3rem' }} />
                <Column field="gotram" header="Gotram"  style={{ minWidth: '0.3rem' }} />
                <Column body={actionBodyTemplate} exportable={false} style={{ minWidth: '1rem', textAlign: 'center' }} />
            </DataTable>
      

            <DeleteDiaLog
                deleteonClick={deleteDeceasedDialog}
                deleteDialogFooter={deleteDeceasedDialogFooter}
                hideDeleteDialog={hideDeleteDeceasedDialog}
                deleteTitle={Deceased.personName}
                dataLength={Deceased}
            />
        </>
    );
}

export default ManageDeceased;
