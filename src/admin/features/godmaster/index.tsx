import React, { useState, useEffect, useRef } from 'react';
import { classNames } from 'primereact/utils';
import { FilterMatchMode } from 'primereact/api';
import { useNavigate } from 'react-router-dom';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { Toolbar } from 'primereact/toolbar';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { useSelector } from 'react-redux';
import { admingodActions } from './godSlice';
import { selectGods } from 'admin/features/godmaster/godSelector';
import DeleteDiaLog from 'sharedComponents/dialogs/dialogs';
import { useRedux } from 'hooks';
import { clearState } from 'storeConfig/api/apiSlice';
import Image from 'sharedComponents/Image/image';

interface Gods {
    _id:string;
    name: string;
    holidayOfworkshop: string;
}

/* eslint-disable */
export default function ManageGods() {
    
    const emptyGod:Gods = {
        _id:"dummy",
        name:'',
        holidayOfworkshop: ''
    }
    
    const navigate = useNavigate();
    const { loading, error, successMessage } = useSelector((state:any) => state.apiState);

    const [filters, setFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    });

    const [gods, setGods] = useState<any>([]);
    const [deleteGodDialog, setDeleteGodDialog] = useState(false);
    const [god, setGod] = useState(emptyGod);
    const [selectedGods, setSelectedGods] = useState<any>(null);
    const [globalFilter, setGlobalFilter] = useState(null);
    const toast = useRef<any>(null);
    const dt = useRef<any>(null);
    const { dispatch, appSelector } = useRedux();

    useEffect(() => {
        dispatch(admingodActions.getGodDetails());
    }, [dispatch]);
   
    const GodDetails:any = appSelector(selectGods);
   
    const showToast = (severity:any, summary:any, detail:any) => {
        toast.current.show({ severity, summary, detail });
    };

    const openNew = () => {
        navigate("/admin/gods/add");
    };

    const hideDeleteGodDialog = () => {
        setDeleteGodDialog(false);
    };

    const onGlobalFilterChange = (event:any) => {
        const value = event.target.value;
        let _filters = { ...filters };
        _filters['global'].value = value;
        setFilters(_filters);
    };

    const editGod = (data:any) => {
        navigate("/admin/gods/god/edit/"+data._id);
    };

    const confirmDeleteGod = (God:any) => {
        setGod(God);
        setDeleteGodDialog(true);
    };

    const deleteGod = () => {
        const _Gods = gods.filter((val:any) => val !== god._id);
        setGods(_Gods);
        dispatch(admingodActions.deletegod({_id:god._id}))
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

    const exportCSV = () => {
        dt.current.exportCSV();
    };

  
    const leftToolbarTemplate = () => (
        <div className="flex flex-wrap gap-2">
            <Button label="New" icon="pi pi-plus me-1" severity="success" onClick={openNew} />
        </div>
    );

    const imageBodyTemplate = (rowData:any) => <Image  imageUrl={`${rowData?.image}`} altText={rowData.name} classname="shadow-2 border-round" style={{ width: '64px' }} />;
    const rightToolbarTemplate = () => <Button label="Export" icon="pi pi-upload" className="p-button-help" onClick={exportCSV} />;
    const actionBodyTemplate = (rowData:any) => (
        <>
            <Button icon="pi pi-pencil" rounded outlined className="mr-2" onClick={() => editGod(rowData)} />
            <Button icon="pi pi-trash" rounded outlined severity="danger" onClick={() => confirmDeleteGod(rowData)} />
        </>
    );
  
    const WorkshipDayTemplate = (rowData:any) => {
        return (
            <div>
              {/* Map over the split values and apply styles */}
              {rowData.worshipDay.map((value:any, index:number) => (
                <span key={index} className='days-list'>
                  {value}
                </span>
              ))}
            </div>
          );
    };

    const header = () => {
        const value = filters['global'] ? filters['global'].value : '';
        return (
            <div className="flex flex-wrap gap-2 align-items-center justify-content-between">
            <h4 className="m-0">Manage God Section</h4>
            <span className="p-input-icon-left mb-1">
                <i className="pi pi-search" />
                <InputText type="search" value={value || ''} onChange={(e) => onGlobalFilterChange(e)} placeholder="Search Gods" />
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
            <div className="">
                <Toolbar className="mb-4" left={leftToolbarTemplate} right={rightToolbarTemplate} />

                <DataTable
                    ref={dt}
                    filters={filters} onFilter={(e:any) => setFilters(e.filters)}
                    value={GodDetails}
                    selection={selectedGods} 
                    onSelectionChange={(e:any) => setSelectedGods(e.value)} 
                    dataKey="_id"
                    paginator
                    rows={10}
                    rowsPerPageOptions={[5, 10, 25]}
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    currentPageReportTemplate="Showing {first} to {last} of {totalRecords} Gods"
                    globalFilter={globalFilter}
                    header={header}
                >
                    <Column field="name" header="Name" sortable style={{ minWidth: '1rem' }} />
                    <Column field="worshipDay" body={WorkshipDayTemplate} header="Day of workship" />
                    <Column field="image" header="Image" body={imageBodyTemplate} />
                    <Column body={actionBodyTemplate} exportable={false} style={{ minWidth: '6rem',textAlign:'center' }} />
                </DataTable>
            </div>
          
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
