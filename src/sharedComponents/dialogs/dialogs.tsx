import React from 'react';
import { Dialog } from 'primereact/dialog';

interface DeleteDialogProps{
    deleteonClick:any;
    deleteTitle:string;
    deleteDialogFooter:any;
    hideDeleteDialog:any;
    dataLength:any;
}

export default function DeleteDiaLog(props:DeleteDialogProps) {
    const {
        deleteonClick, deleteTitle, dataLength, deleteDialogFooter, hideDeleteDialog,
    } = props;

    return (
        <Dialog visible={deleteonClick} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Confirm" modal footer={deleteDialogFooter} onHide={hideDeleteDialog}>
            <div className="confirmation-content">
                <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                {dataLength && (
                    <span>
                        Are you sure you want to delete <b>{deleteTitle}</b>?
                    </span>
                )}
            </div>
        </Dialog>
    );
}
