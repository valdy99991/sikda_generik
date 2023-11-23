'use client';
import React, { useEffect, useRef, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { InputText } from 'primereact/inputtext';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { TabView, TabPanel } from 'primereact/tabview';
import { ProductService } from '../../../../demo/service/ProductService';
import Link from 'next/link';
import { Dialog } from 'primereact/dialog';

const RoleQueue = ({ children }: any) => {
    const dt = useRef<DataTable<any>>(null);
    const [queues, setQueues] = useState(null);
    const [product, setProducts] = useState([]);
    const [globalFilter, setGlobalFilter] = useState('');
    const [editDialog, setEditDialog] = useState(false);
    const [detailDialog, setDetailDialog] = useState(false);
    const [deleteDialog, setDeleteDialog] = useState(false);
    const [search, setSearch] = useState('');
    const [searchType, setSearchType] = useState();
    const [visible, setVisible] = useState(false);
    const [showDelete, setShowDelete] = useState(false);

    const listSearchType = [
        {
            display: 'No.Antrian',
            code: 'NoAntrian'
        },
        {
            display: 'Nama',
            code: 'NAMA_PASIEN'
        },
        {
            display: 'KK',
            code: 'KK'
        }
    ];

    const header = (
        <>
            <div className="flex justify-content-between">
                <div className="flex flex-column md:align-items-start">
                    <div className="flex md:justify-content-between">
                        <div className="col-12 md:col-8 mt-5">
                            <span className="p-input-icon-left flex gap-2">
                                <i className="pi pi-search" />
                                <InputText
                                    style={{ borderRadius: '99px', width: '800px' }}
                                    className="inputtext"
                                    placeholder="Cari Nama Pasien "
                                    onChange={(e) => {
                                        setSearch(e.target.value);
                                    }}
                                    value={search}
                                />
                                <Button style={{ background: '#3899FE', border: 'none', width: '80px' }} label="Cari" />
                            </span>
                        </div>
                    </div>
                </div>
                <div className="col-12 md:col-4 mt-5 flex">
                    <Link href={'/auth/role/aturRole'}>
                        <Button label="Atur Role" icon="pi pi-sliders-h" className="mr-4" outlined />
                    </Link>
                    <Link href={'/auth/role/addRole'}>
                        <Button label="Tambah Role" style={{ background: '#EBF3FF' }} icon="pi pi-plus" outlined />
                    </Link>
                </div>
            </div>
        </>
    );

    const detailModal = (queue: any) => {
        setQueues({ ...queue });
        setDetailDialog(true);
    };

    const editModal = (queue: any) => {
        setQueues({ ...queue });
        setEditDialog(true);
    };

    const confirmDelete = (queue: any) => {
        setQueues(queue);
        setDeleteDialog(true);
    };

    const footerContent = (
        <div>
            <Button label="No" icon="pi pi-times" onClick={() => setVisible(false)} className="p-button-text" />
            <Button label="Yes" icon="pi pi-check" onClick={() => setVisible(false)} autoFocus />
        </div>
    );
    const footerContentDelete = (
        <div>
            <Button label="Batal" icon="pi pi-times" onClick={() => setVisible(false)} className="p-button-text" />
            <Button label="Hapus" icon="pi pi-check" onClick={() => setVisible(false)} autoFocus />
        </div>
    );
    const actionBodyTemplate = (rowData: Location) => {
        return (
            <>
                <Button icon="pi pi-trash" severity="danger" onClick={() => setShowDelete(true)} />
                <Dialog header="Hapus Role Pengguna" visible={showDelete} style={{ width: '327px' }} onHide={() => setShowDelete(false)} footer={footerContentDelete}>
                    <div className="align-items-center">Apakah Anda ingin menghapus role Admin yang dipilih? </div>
                </Dialog>
            </>
        );
    };
    useEffect(() => {
        ProductService.getProductsSmall().then((response) => setProducts(response));
    }, []);
    return (
        <div className="grid ">
            <div className="col-12">
                <div className="card">
                    <DataTable
                        ref={dt}
                        value={product}
                        dataKey="name"
                        paginator
                        rows={5}
                        // rowsPerPageOptions={[5, 10, 25]}
                        className="datatable-responsive"
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks CurrentPageReport NextPageLink LastPageLink RowsPerPageDropdown"
                        currentPageReportTemplate="Menampilkan {first} sampai {last} dari {totalRecords} Data"
                        globalFilter={globalFilter}
                        emptyMessage="Tidak ada data"
                        header={header}
                        scrollable
                        scrollHeight="400px"
                    >
                        <Column field="nomor" header="NO" sortable headerStyle={{ minWidth: '15rem' }}></Column>
                        <Column field="role" header="ROLE" sortable headerStyle={{ minWidth: '15rem' }}></Column>
                        <Column field="tgldibuat" header="TANGGAL DIBUAT" sortable headerStyle={{ minWidth: '15rem' }}></Column>
                        <Column header="Aksi" body={actionBodyTemplate} headerStyle={{ minWidth: '20rem' }}></Column>
                    </DataTable>
                </div>
            </div>
        </div>
    );
};

export default RoleQueue;
