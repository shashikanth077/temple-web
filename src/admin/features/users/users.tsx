import React, { useState, useEffect, useRef } from 'react';
import { FilterMatchMode } from 'primereact/api';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import classNames from 'classnames';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { Toolbar } from 'primereact/toolbar';
import { InputText } from 'primereact/inputtext';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { adminUserActions } from './userSlice';
import { selectUsers } from './userSelector';
import DeleteDiaLog from 'sharedComponents/dialogs/dialogs';
import { useRedux, useUser } from 'hooks';
import { clearState } from 'storeConfig/api/apiSlice';
import { User } from 'models';

/* eslint-disable */
export default function Users() {
    
    const emptyUser:User = {
        _id:'dummy',
        TermConcent:false,
        email:'',
        firstName:'',
        phonenumber:'',
        lastName:'',
        countrycode:'',
        roles: [], 
        viewRoles:[],
        activated:false
        
    }
     
    const navigate = useNavigate();
    const [filters, setFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    });

    const [users, setusers] = useState<any>([]);
    const [deleteuserDialog, setDeleteuserDialog] = useState(false);
    const [deactiveDialog,setDeActivateuserDialog] = useState(false);
    const [user, setuser] = useState(emptyUser);
    const [selectedusers, setSelectedusers] = useState<any>(null);
    const [globalFilter, setGlobalFilter] = useState(null);
    const toast = useRef<any>(null);
    const dt = useRef<any>(null);
    const [loggedInUser] = useUser();
    const { dispatch, appSelector } = useRedux();
    const { loading, error, successMessage } = useSelector((state:any) => state.apiState);

    const showToast = (severity:any, summary:any, detail:any) => {
        toast.current.show({ severity, summary, detail });
    };
      
    const openNew = () => {
        navigate("/admin/users/add");
    };

    const hideDeleteUserDialog = () => {
        setDeleteuserDialog(false);
    };

    const hideDeactiveUserDialog = () => {
        setDeActivateuserDialog(false);
    };

    const onGlobalFilterChange = (event:any) => {
        const value = event.target.value;
        let _filters = { ...filters };
        _filters['global'].value = value;
        setFilters(_filters);
    };

    const edituser = (data:any) => {
        navigate("/admin/users/edit/"+data._id);
    };

    const confirmDeActivate = (data:any) => {
        setuser(data);
        setDeActivateuserDialog(true);
    }

    const confirmDeleteuser = (user:any) => {
        setuser(user);
        setDeleteuserDialog(true);
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

    const deleteUser = () => {
        const _users = users.filter((val:any) => val !== user._id);
        setusers(_users);
        dispatch(adminUserActions.deleteUser({_id:user._id}))
        setDeleteuserDialog(false);
        setuser(emptyUser);
        
    };

    const deactiveUser = () => {
        const _users = users.filter((val:any) => val !== user._id);
        setusers(_users);

        let reqObject:any = {};

        if(user.activated) {
            reqObject.activated = false;
            reqObject._id = user._id
        } else {
            reqObject.activated = true;
            reqObject._id = user._id;
        }

        dispatch(adminUserActions.deleteUser(reqObject))
        setDeActivateuserDialog(false);
        setuser(emptyUser);
    };

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
            <Button icon="pi pi-pencil" rounded outlined className="mr-2" onClick={() => edituser(rowData)} />
            {/* <Button icon="pi pi-trash" className="mr-2"  rounded outlined severity="danger" onClick={() => confirmDeleteuser(rowData)} /> */}
            <Button icon="pi pi-times" rounded outlined onClick={() => confirmDeActivate(rowData)} />
        </>
    );
   
    const verifiedBodyTemplate = (rowData:any) => {
        return <i className={classNames('pi', { 'true-icon pi-check-circle': rowData.activated, 'false-icon pi-times-circle': !rowData.activated })}></i>;
    };
    
   const rolesBodyTemplate = (rowData:any) => {
        return (
            <div>
              {/* Map over the split values and apply styles */}
              {rowData.viewRoles.map((value:any, index:number) => (
                <span key={index} className='roles-list'>
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
            <h4 className="m-0">Manage users</h4>
            <span className="p-input-icon-left mb-1">
                <i className="pi pi-search" />
                <InputText type="search" value={value || ''} onChange={(e) => onGlobalFilterChange(e)} placeholder="Search users" />
            </span>
        </div>
        )
    }
    
    const deleteuserDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" outlined onClick={hideDeleteUserDialog} />
            <Button label="Yes" icon="pi pi-check" severity="danger" onClick={deleteUser} />
        </>
    );

    const deActiveuserDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" outlined onClick={hideDeactiveUserDialog} />
            <Button label="Yes" icon="pi pi-check" severity="danger" onClick={deactiveUser} />
        </>
    );

    console.log("loggedInUser",loggedInUser);
    const userDetails:any = appSelector(selectUsers);
    let filteredUsers;
    if(userDetails.length > 0) {
         filteredUsers = userDetails?.filter((user: any) => user._id !== user.id);
    }
        
    return (
        <div>
            <Toast ref={toast} />
            {filteredUsers && filteredUsers.length > 0 &&
            <>
            <div className="">
                <Toolbar className="mb-4" left={leftToolbarTemplate} right={rightToolbarTemplate} />

                <DataTable
                    ref={dt}
                    filters={filters} onFilter={(e:any) => setFilters(e.filters)}
                    value={filteredUsers}
                    selection={selectedusers} 
                    onSelectionChange={(e:any) => setSelectedusers(e.value)} 
                    dataKey="_id"
                    paginator
                    rows={10}
                    rowsPerPageOptions={[5, 10, 25]}
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    currentPageReportTemplate="Showing {first} to {last} of {totalRecords} users"
                    globalFilter={globalFilter}
                    header={header}
                >
                    <Column field="firstName" header="First name" sortable style={{ minWidth: '10rem' }} />
                    <Column field="lastName" header="Last name" sortable style={{ minWidth: '10rem' }} />
                    <Column field="email" header="Login name" sortable style={{ minWidth: '10rem' }} />
                    <Column field="activated" header="IsActive" body={verifiedBodyTemplate} />
                    <Column field="viewRoles" header="Roles" body={rolesBodyTemplate} />
                    <Column body={actionBodyTemplate} exportable={false} style={{ minWidth: '6rem',textAlign:'center' }} />
                </DataTable>
            </div>

            <DeleteDiaLog 
                deleteonClick={deleteuserDialog}
                deleteDialogFooter={deleteuserDialogFooter}
                hideDeleteDialog={hideDeleteUserDialog}
                deleteTitle={user.firstName}
                dataLength={user}
            />

            <DeleteDiaLog 
                deleteonClick={deactiveDialog}
                deleteDialogFooter={deActiveuserDialogFooter}
                hideDeleteDialog={hideDeactiveUserDialog}
                deleteTitle={user.firstName}
                dataLength={user}
            />

            </>
            }
        </div>
    );
}
