'use client';
import React, { useEffect, useRef, useState } from 'react';
<<<<<<< HEAD
import { DataTable } from 'primereact/datatable';
import { InputText } from 'primereact/inputtext';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { TabView, TabPanel } from 'primereact/tabview';
import { ProductService } from '../../../../demo/service/ProductService';
import Link from 'next/link';
import { Dialog } from 'primereact/dialog';

const Organization = ({ children }: any) => {
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
=======
import { Organizations, RequestOrganization } from '../../../types/organization';
import DetailPage from './detail';
import ListPage from './list';
import { STATUS } from '../../../enum/organization';
import { RadioButton, RadioButtonChangeEvent } from 'primereact/radiobutton';
import OrganizationService from '../../../service/OrganizationService';
import { Response } from '../../../types/response';
import RandomGenerator from '../../../helper/random';
import { selectOrganizationId } from '../../../../redux/auth/authSlice';
import { useSelector } from 'react-redux';
import Formatter from '../../../helper/formatter';
import { Meta } from '../../../types/global';

const OrganizationPage = () => {
    let emptyRequest: RequestOrganization = {
        name: '',
        code: '',
        email: '',
        phone: '',
        active: true
    };
    let emptyOrganization: Organizations = {
        active: true,
        name: RandomGenerator.generateString(10),
        code: RandomGenerator.generateString(6),
        contactDetail: {
            phone: RandomGenerator.generateNumber(12).toString(),
            email: RandomGenerator.generateEmail(),
        }
    };
    const [activeIndex, setActiveIndex] = useState(0);
    const [organizations, setOrganizations] = useState<Organizations|null>(null);
    const [organizationDialog, setEditDialog] = useState(false);
    const [detailDialog, setDetailDialog] = useState(false);
    const [deleteDialog, setDeleteDialog] = useState(false);
    const [deleteSelectedDialog, setDeleteSelectedDialog] = useState(false);
    const [organization, setOrganization] = useState<Organizations>(emptyOrganization);
    const [selectedOrganizations, setSelectedOrganizations] = useState<Organizations[]|null>(null);
    const [submitted, setSubmitted] = useState(false);
    const [modalName, setModalName] = useState('');
    const toast = useRef<Toast>(null);
    const dt = useRef<DataTable<any>>(null);

    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(10);
    const [searchTerm, setSearchTerm] = useState('');
    const [meta, setMeta] = useState<Meta>({
        total:0,
        lastPage:0,
        currentPage:page,
        perPage:perPage,
        prev:null,
        next:null,
        first:0
    })
    const [isLoading, setIsLoading] = useState(false);
    const orgId = useSelector(selectOrganizationId)


    const tabItems = [{ label: 'Detail' }, { label: 'Organisasi' }];

    useEffect(() => {
        setIsLoading(true);
        OrganizationService.getAll(searchTerm,orgId, page, perPage).then((response) => {
            const data:Response = response.data
            if(data?.data){
                let _data:Organizations = data?.data
                if(data.meta){
                    let _meta = data.meta
                    _meta.first = meta.first
                    setMeta(_meta)
                }
                setOrganizations(_data)
            }
        }).finally(() => {
            setIsLoading(false);
        });
    },[searchTerm,orgId,page,perPage,meta.first]);

    const openNew = () => {
        setOrganization(emptyOrganization);
        setSubmitted(false);
        setModalName('Tambah');
        setEditDialog(true);
    };

    const hideDialog = () => {
        setSubmitted(false);
        setEditDialog(false);
    };
    const hideDetailDialog = () => {
        setSubmitted(false);
        setDetailDialog(false);
    };

    const hideDeleteDialog = () => {
        setDeleteDialog(false);
    };

    const hideDeleteSelectedDialog = () => {
        setDeleteSelectedDialog(false);
    };

    const saveOrganization = async () => {
        setSubmitted(true);
        let Payload:RequestOrganization = emptyRequest

        if (organization.code.trim()) {
            Payload = {
                id: organization.id,
                name: organization.name,
                code: organization.code,
                email: organization.contactDetail?.email || "",
                phone: organization.contactDetail?.phone || "",
                active: organization.active
            }
            let _organizations:Organizations[] = organizations?[...(organizations as any)]:[];
            let _organization:Organizations = { ...organization };
            if (organization.id) {
                const index = findIndexById(organization.id);
                _organizations[index] = _organization;
                
                await OrganizationService.update(Payload).then((response) => {
                    let data:Response = response.data
                    if(data?.data){
                        let _org = data?.data
                        _organization.id = _org.id;
                        _organizations[index] = _organization;
                        setOrganizations(_organizations as any);
                        toast.current?.show({
                            severity: 'success',
                            summary: 'Successful',
                            detail: 'Organization Updated',
                            life: 3000
                        });
                    }
                })
            } else {
                delete Payload.id
                await OrganizationService.create(Payload).then((response) => {
                    let data:Response = response.data
                    if(data?.data){
                        let _org = data?.data
                        _organization.id = _org.id;
                        _organizations.push(_organization);
                        setOrganizations(_organizations as any);
                        toast.current?.show({
                            severity: 'success',
                            summary: 'Successful',
                            detail: 'Organization Created',
                            life: 3000
                        });
                        console.log(_org,_organizations,"response");
                    }
                }).catch((error)=>{
                    toast.current?.show({
                        severity: 'error',
                        summary: 'Error',
                        detail: error.response.data.message,
                        life: 3000
                    })
                })
            }
            setEditDialog(false);
            setOrganization(emptyOrganization);
>>>>>>> 390fdd40271ebf6debb0d50546b56c9f323bd7ce
        }
    ];
    useEffect(() => {
        ProductService.getProductsSmall().then((response) => setProducts(response));
    }, []);
    const header = (
        <>
            <div className="flex justify-content-between">
                <div className="flex flex-column md:align-items-start">
                    <div className="flex md:justify-content-between">
                        <div className="col-12 md:col-5 mt-5 flex gap-1">
                            <span className="p-input-icon-left flex">
                                <i className="pi pi-search" />
                                <InputText
                                    style={{ borderRadius: '99px', width: '414px' }}
                                    className="inputtext"
                                    placeholder="Cari kode atau nama organisasi/faskes "
                                    onChange={(e) => {
                                        setSearch(e.target.value);
                                    }}
                                    value={search}
                                />
                            </span>
                            <Button style={{ background: '#EBF3FF', color: '#3899FE', border: 'none', width: '80px' }} label="Cari" />
                        </div>
                        <div className="col-12 md:col-2">
                            <h6>TIPE</h6>
                            <Dropdown
                                value={searchType}
                                onChange={(e) => {
                                    setSearchType(e.target.value);
                                }}
                                style={{ borderRadius: '99px', width: '200px' }}
                                options={listSearchType}
                                optionLabel="display"
                                optionValue="code"
                                placeholder="Semua Tipe"
                            />
                        </div>
                        <div className="col-12 md:col-2">
                            <h6>STATUS</h6>
                            <Dropdown
                                value={searchType}
                                onChange={(e) => {
                                    setSearchType(e.target.value);
                                }}
                                style={{ borderRadius: '99px', width: '200px' }}
                                options={listSearchType}
                                optionLabel="display"
                                optionValue="code"
                                placeholder="Semua status"
                            />
                        </div>
                        <div className="col-12 md:col-2 mt-4">
                            <Link href={'/master-data/organization/add'}>
                                <Button label="Tambah Organisasi / Faskes" style={{ width: '288px', height: '48px' }} icon="pi pi-fw pi-plus" onClick={() => setVisible(false)} autoFocus />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );

<<<<<<< HEAD
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
    const actionBodyTemplate = (rowData: Location) => {
        return (
            <>
                <Button icon="pi pi-info-circle" severity="info" className="mr-2 " onClick={() => setVisible(true)} />
                <Dialog header="Detail Informasi Pasien" visible={visible} style={{ width: '50vw', background: '#EBF3FF' }} onHide={() => setVisible(false)}>
                    <p style={{ fontWeight: '600', fontSize: '14px' }}>
                        NIK <span style={{ marginLeft: '159px', fontWeight: '400', fontSize: '14px' }}>: 1234567890123456</span>
                    </p>
                    <p style={{ fontWeight: '600', fontSize: '14px' }}>
                        Nama Pasien <span style={{ marginLeft: '100px', fontWeight: '400', fontSize: '14px' }}>: Bambang</span>
                    </p>
                    <p style={{ fontWeight: '600', fontSize: '14px' }}>
                        Tempat Lahir <span style={{ marginLeft: '100px', fontWeight: '400', fontSize: '14px' }}>: Jakarta</span>
                    </p>
                    <p style={{ fontWeight: '600', fontSize: '14px' }}>
                        Tanggal Lahir <span style={{ marginLeft: '96px', fontWeight: '400', fontSize: '14px' }}>: 20 September 1998</span>
                    </p>
                    <p style={{ fontWeight: '600', fontSize: '14px' }}>
                        Umur <span style={{ marginLeft: '145px', fontWeight: '400', fontSize: '14px' }}>: 25 tahun</span>
                    </p>
                    <p style={{ fontWeight: '600', fontSize: '14px' }}>
                        Alamat <span style={{ marginLeft: '135px', fontWeight: '400', fontSize: '14px' }}>: Jl. Masjid Al-Ahad RT 06 RW 02 No. 20, Kel. Halim Perdana Kusuma, Kec. Halim Perdana Kusuma, Jakarta Timur</span>
                    </p>
                    <p style={{ fontWeight: '600', fontSize: '14px' }}>
                        No. Antrian <span style={{ marginLeft: '107px', fontWeight: '400', fontSize: '14px' }}>: 10</span>
                    </p>
                </Dialog>
                <Button icon="pi pi-pencil" severity="success" className="mr-2 " onClick={() => editModal(rowData)} />
                <Button icon="pi pi-trash" severity="danger" onClick={() => setShowDelete(true)} />
                <Dialog header="Hapus Data Pasien" visible={showDelete} style={{ width: '327px' }} onHide={() => setShowDelete(false)} footer={footerContent}>
                    <div className="align-items-center">Apakah Anda ingin menghapus data pasien yang dipilih?</div>
                </Dialog>
            </>
        );
    };
    // useEffect(() => {
    //     ProductService.getProductsSmall().then((response) => setProducts(response));
    // }, []);
=======
    const detailModal = (organization: Organizations) => {
        console.log(organization)
        setOrganization({ ...organization });
        setDetailDialog(true);
    };

    const editModal = (organization: Organizations) => {
        setOrganization({ ...organization });
        setModalName('Edit');
        setEditDialog(true);
    };

    const confirmDelete = (organization: Organizations) => {
        setOrganization(organization);
        setDeleteDialog(true);
    };

    const deleteOrganization = async () => {
        if(organization && organization.id){
            await OrganizationService.delete(organization.id).then((response) => {
                let _organizations = (organizations as any)?.filter((val: any) => val.id !== organization.id);
                setOrganizations(_organizations);
                setDeleteDialog(false);
                setOrganization(emptyOrganization);
                toast.current?.show({
                    severity: 'success',
                    summary: 'Berhasil',
                    detail: 'Organisasi berhasil di hapus',
                    life: 3000
                });
            })
        }
    };

    const findIndexById = (id: string) => {
        let index = -1;
        for (let i = 0; i < (organizations as any)?.length; i++) {
            if ((organizations as any)[i].id === id) {
                index = i;
                break;
            }
        }

        return index;
    };

    const exportCSV = () => {
        dt.current?.exportCSV();
    };

    const confirmDeleteSelected = () => {
        setDeleteSelectedDialog(true);
    };

    const deleteSelected = async () => {
        if(selectedOrganizations){
            let isSuccess = true
            let _organizations = (organizations as any)
            selectedOrganizations.map(async (org)=>{
                if(org && org.id){
                    await OrganizationService.delete(org.id).then((response) => {
                        _organizations = _organizations?.filter((val: any) => !(selectedOrganizations as any).includes(val));
                        setOrganizations(_organizations);
                    }).catch((error)=>{
                        isSuccess = false
                        toast.current?.show({
                            severity: 'error',
                            summary: 'Error',
                            detail: "Org "+org.name+" : "+error.response.data.message,
                            life: 3000
                        })
                    })
                }
            })
            if(isSuccess){
                setDeleteSelectedDialog(false);
                setSelectedOrganizations(null);
                toast.current?.show({
                    severity: 'success',
                    summary: 'Berhasil',
                    detail: 'Organisasi berhasil di hapus',
                    life: 3000
                });
            }
        }
    };

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, name: string) => {
        const val = (e.target && e.target.value) || '';
        let _organization = { ...organization };
        switch (name) {
            case 'name':
                _organization.name = val;
                break;
            case 'code':
                _organization.code = val;
                break;
            case 'telp':
                _organization.contactDetail.phone = val
                break;
            case 'email':
                _organization.contactDetail.email = val
                break;
        }

        setOrganization(_organization);
    };

    const onStatusChange = (e: RadioButtonChangeEvent) => {
        let _organization = { ...organization };
        console.log(e.value);
        _organization['active'] = e.value;
        setOrganization(_organization);
    };

    const leftToolbarTemplate = () => {
        return (
            <React.Fragment>
                <div className="my-2">
                    <Button label="Tambah" icon="pi pi-plus" severity="success" className=" mr-2" onClick={openNew} />
                    <Button label="Hapus" icon="pi pi-trash" severity="danger" onClick={confirmDeleteSelected} disabled={!selectedOrganizations || !(selectedOrganizations as any).length} />
                </div>
            </React.Fragment>
        );
    };

    const rightToolbarTemplate = () => {
        return (
            <React.Fragment>
                <FileUpload mode="basic" accept="image/*" maxFileSize={1000000} chooseLabel="Import" className="mr-2 inline-block" />
                <Button label="Export" icon="pi pi-upload" severity="help" onClick={exportCSV} />
            </React.Fragment>
        );
    };

    const statusBodyTemplate = (rowData: Organizations) => {
        return <>{rowData.active ? 'Aktif' : 'Tidak Aktif'}</>;
    };

    const actionBodyTemplate = (rowData: Organizations) => {
        return (
            <>
                <Button icon="pi pi-bars" rounded severity="info" className="mr-2" onClick={() => detailModal(rowData)} />
                <Button icon="pi pi-pencil" rounded severity="success" className="mr-2" onClick={() => editModal(rowData)} />
                <Button icon="pi pi-trash" rounded severity="warning" onClick={() => confirmDelete(rowData)} />
            </>
        );
    };

    const header = (
        <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
            <h5 className="m-0">Kelola Organisasi</h5>
            <span className="block mt-2 md:mt-0 p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" onInput={(e) => setSearchTerm(e.currentTarget.value)} placeholder="Search..." />
            </span>
        </div>
    );

    const editDialogFooter = (
        <>
            <Button label="Batal" icon="pi pi-times" text onClick={hideDialog} />
            <Button label="Simpan" icon="pi pi-check" text onClick={saveOrganization} />
        </>
    );

    const detailDialogFooter = (
        <>
            <Button label="Batal" icon="pi pi-times" text onClick={hideDetailDialog} />
        </>
    );
    const deleteDialogFooter = (
        <>
            <Button label="Tidak" icon="pi pi-times" text onClick={hideDeleteDialog} />
            <Button label="Iya" icon="pi pi-check" text onClick={deleteOrganization} />
        </>
    );
    const deleteSelectedDialogFooter = (
        <>
            <Button label="Tidak" icon="pi pi-times" text onClick={hideDeleteSelectedDialog} />
            <Button label="Iya" icon="pi pi-check" text onClick={deleteSelected} />
        </>
    );

    const createdAtTemplate = (rowData: Organizations) => {
        return <>{Formatter.formatDate(rowData.createdAt)}</>;
    };

    const updatedAtTemplate = (rowData: Organizations) => {
        return <>{Formatter.formatDate(rowData.updatedAt)}</>;
    }

    const onPage = (event:any) => {
        setPerPage(event.rows);
        setPage(event.page + 1);
        let _meta = {...meta}
        _meta.first = event.first;
        setMeta(_meta);
    };

>>>>>>> 390fdd40271ebf6debb0d50546b56c9f323bd7ce
    return (
        <div className="grid ">
            <div className="col-12">
                <div className="card">
                    <div className="flex justify-content-between mb-3">
                        <h5>Kelola Organisasi/Faskes</h5>
                    </div>
                    <DataTable
                        ref={dt}
<<<<<<< HEAD
                        value={product}
                        dataKey="name"
                        paginator
                        rows={5}
                        // rowsPerPageOptions={[5, 10, 25]}
=======
                        value={organizations}
                        selection={selectedOrganizations}
                        onSelectionChange={(e) => setSelectedOrganizations(e.value as any)}
                        dataKey="id"
                        lazy
                        paginator
                        first={meta.first}
                        totalRecords={meta.total}
                        rows={perPage}
                        onPage={onPage}
                        rowsPerPageOptions={[5, 10, 25, 100]}
>>>>>>> 390fdd40271ebf6debb0d50546b56c9f323bd7ce
                        className="datatable-responsive"
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks CurrentPageReport NextPageLink LastPageLink RowsPerPageDropdown"
                        currentPageReportTemplate="Menampilkan {first} sampai {last} dari {totalRecords} Data"
                        globalFilter={searchTerm}
                        emptyMessage="Tidak ada data"
                        header={header}
<<<<<<< HEAD
                        scrollable
                        scrollHeight="400px"
                    >
                        <Column field="kode" header="KODE" sortable headerStyle={{ minWidth: '15rem' }}></Column>
                        <Column field="nama" header="NAMA" sortable headerStyle={{ minWidth: '15rem' }}></Column>
                        <Column field="tipe" header="TIPE" sortable headerStyle={{ minWidth: '15rem' }}></Column>
                        <Column field="status" header="STATUS" sortable headerStyle={{ minWidth: '15rem' }}></Column>
                        <Column header="Aksi" body={actionBodyTemplate} headerStyle={{ minWidth: '20rem' }}></Column>
                    </DataTable>
                    <p></p>
=======
                        loading={isLoading}
                        responsiveLayout="scroll"
                    >
                        <Column selectionMode="multiple" headerStyle={{ width: '4rem' }}></Column>
                        <Column field="code" header="Kode" sortable headerStyle={{ minWidth: '15rem' }}></Column>
                        <Column field="name" header="Nama" sortable headerStyle={{ minWidth: '15rem' }}></Column>
                        <Column field="status" header="Status" sortable body={statusBodyTemplate} headerStyle={{ minWidth: '15rem' }}></Column>
                        <Column body={createdAtTemplate} header="Dibuat" sortable headerStyle={{ minWidth: '15rem' }}></Column>
                        <Column body={updatedAtTemplate} header="Diubah" sortable headerStyle={{ minWidth: '15rem' }}></Column>
                        <Column body={actionBodyTemplate} headerStyle={{ minWidth: '10rem' }}></Column>
                    </DataTable>

                    <Dialog visible={organizationDialog} header={`${modalName || 'Detail'} Data`} modal className="p-fluid" footer={editDialogFooter} onHide={hideDialog}>
                        <div className="field">
                            <label htmlFor="code">Kode</label>
                            <InputText
                                id="code"
                                value={organization.code}
                                onChange={(e) => onInputChange(e, 'code')}
                                required
                                autoFocus
                                className={classNames({
                                    'p-invalid': submitted && !organization.code
                                })}
                            />
                            {submitted && !organization.code && <small className="p-invalid">Kode is required.</small>}
                        </div>
                        <div className="field">
                            <label htmlFor="name">Nama</label>
                            <InputText
                                id="name"
                                value={organization.name}
                                onChange={(e) => onInputChange(e, 'name')}
                                required
                                autoFocus
                                className={classNames({
                                    'p-invalid': submitted && !organization.name
                                })}
                            />
                            {submitted && !organization.name && <small className="p-invalid">Name is required.</small>}
                        </div>
                        <div className="field">
                            <label htmlFor="name">Status</label>
                            <div className="formgrid grid">
                                <div className="field-radiobutton col-6">
                                    <RadioButton inputId="status" name="status" value={true} onChange={onStatusChange} checked={organization.active === STATUS.ACTIVE} />
                                    <label htmlFor="status">Aktif</label>
                                </div>
                                <div className="field-radiobutton col-6">
                                    <RadioButton inputId="status" name="status" value={false} onChange={onStatusChange} checked={organization.active === STATUS.INACTIVE} />
                                    <label htmlFor="status">Tidak Aktif</label>
                                </div>
                            </div>
                        </div>
                        <div className="field">
                            <label htmlFor="">Telp</label>
                            <InputText
                                id="telp"
                                value={organization.contactDetail?.phone}
                                onChange={(e) => onInputChange(e, 'telp')}
                                className={classNames({
                                    'p-invalid': submitted && !organization.contactDetail.phone
                                })}
                            />
                        </div>
                        <div className="field">
                            <label htmlFor="">Email</label>
                            <InputText
                                id="email"
                                value={organization.contactDetail?.email}
                                onChange={(e) => onInputChange(e, 'email')}
                                className={classNames({
                                    'p-invalid': submitted && !organization.contactDetail?.email
                                })}
                            />
                        </div>
                    </Dialog>

                    <Dialog visible={detailDialog} style={{ minWidth: '1024px' }} header="Detail Data" modal className="p-fluid" footer={detailDialogFooter} onHide={hideDetailDialog}>
                        <TabMenu model={tabItems} activeIndex={activeIndex} onTabChange={(e) => setActiveIndex(e.index)} />
                        <div className="m-4">
                            {activeIndex == 0 && <ListPage organization={organization} />}
                            {activeIndex == 1 && <DetailPage organization={organization} />}
                        </div>
                    </Dialog>

                    <Dialog visible={deleteDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteDialogFooter} onHide={hideDeleteDialog}>
                        <div className="flex align-items-center justify-content-center">
                            <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                            {organization && (
                                <span>
                                    Apakah anda yakin ingin menghapus <b>{organization.name}</b>?
                                </span>
                            )}
                        </div>
                    </Dialog>

                    <Dialog visible={deleteSelectedDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteSelectedDialogFooter} onHide={hideDeleteSelectedDialog}>
                        <div className="flex align-items-center justify-content-center">
                            <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                            {organization && <span>Apakah anda yakin ingin menghapus semua item yang dipilih?</span>}
                        </div>
                    </Dialog>
>>>>>>> 390fdd40271ebf6debb0d50546b56c9f323bd7ce
                </div>
            </div>
        </div>
    );
};

export default Organization;
