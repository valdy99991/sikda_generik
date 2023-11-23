/* eslint-disable react/jsx-no-undef */
'use client';
import React, { useRef, useState } from 'react';
// import Queue from './queue/page';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { Dialog } from 'primereact/dialog';
import { redirect, useRouter } from 'next/navigation';
import { TabView, TabPanel } from 'primereact/tabview';
// import Queue from '../queue/page';
// import QueuePatient from '../patient-queue/page';
// import Crud from '../../pages/crud/page';
// import Umum from '../umum/page';
// import Jamkesda from '../jamkesda/page';
// import Jknbpjs from '../jknbpjs/page';
import { BreadCrumb } from 'primereact/breadcrumb';
import { RadioButton } from 'primereact/radiobutton';
import { Toast } from 'primereact/toast';
import Link from 'next/link';

// import QueuePatient from './patient-queue/page';
// import Crud from '../pages/crud/page';

const UpdatePengguna = ({ children }: any) => {
    interface ConfirmContent {
        title: string;
        nik: string;
        nama: string;
        umur?: number;
        noAntrian?: number;
    }

    const router = useRouter();
    const [search, setSearch] = useState('');
    const [searchType, setSearchType] = useState();
    const [confirmDialog, setConfirmDialog] = useState(false);
    const [confirmContent, setConfirmContent] = useState<ConfirmContent>();
    const [ingredient, setIngredient] = useState('');
    const [visible, setVisible] = useState(false);

    const listSearchType = [
        {
            display: 'NIK',
            code: 'NIK'
        },
        {
            display: 'Nama',
            code: 'NAMA'
        },
        {
            display: 'No Antrian',
            code: 'NO_ANTRIAN'
        }
    ];

    // const onSearch = () => {
    //     setConfirmDialog(true);
    //     setConfirmContent({
    //         title: 'Data Pasien Ditemukan',
    //         nik: '31232020291021',
    //         nama: 'Joko Susilo'
    //     });
    // };

    // const hideDialogConfirm = () => {
    //     setConfirmDialog(false);
    // };

    // const handleDialogConfirm = () => {
    //     setConfirmDialog(false);
    //     router.push('/registration/encounter');
    // };

    const handleYes = () => {
        setVisible(false);
        router.push('/auth/user');
    };

    const footerContent = (
        <div>
            <Button label="Batal" icon="pi pi-times" onClick={() => setVisible(false)} className="p-button-text" />
            <Button label="Simpan" icon="pi pi-check" onClick={() => handleYes()} autoFocus />
        </div>
    );

    // const confirmDialogFooter = (
    //     <>
    //         <Button label="Kembali" icon="pi pi-times" text onClick={hideDialogConfirm} />
    //         <Button label="Lanjutkan Ke Pendaftaran" icon="pi pi-check" text onClick={handleDialogConfirm} />
    //     </>
    // );
    const items = [{ label: 'Update Pengguna' }];
    const home = { label: 'Kembali', url: '/auth/user' };

    const toastTopCenter = useRef(null);

    // const redirectRegis = () => {
    //     redirect('/registration');
    // };

    const showMessage = () => {};

    return (
        <div>
            {/* style={{ width: '1389px' }} */}
            <div className="flex flex-column md:align-items-start ">
                <Toast ref={toastTopCenter} position="top-center" />
                <div className="card">
                    <h5 className="mb-5">Update Pengguna</h5>
                    <BreadCrumb model={items} home={home} />
                    <div className="flex flex-column mt-4">
                        <div className="col-12">
                            <label className="required" htmlFor="namapengguna">
                                Nama Pengguna
                            </label>
                            <InputText style={{ borderRadius: '99px', width: '335px', marginLeft: '130px' }} className="mr-6 mt-4" id="namapengguna" aria-describedby="namapengguna-help" placeholder="Contoh : Budi" />
                        </div>
                        <div className="col-12">
                            <label className="required mr-7" htmlFor="namapengguna">
                                Pilih Organisasi / Faskes
                            </label>
                            <Dropdown
                                value={searchType}
                                onChange={(e) => {
                                    setSearchType(e.target.value);
                                }}
                                style={{ borderRadius: '99px', width: '335px', marginLeft: '29px' }}
                                options={listSearchType}
                                optionLabel="display"
                                optionValue="code"
                                placeholder="Nama organisasi/faskes"
                            />
                        </div>
                        <div className="col-12">
                            <label className="required mr-7" htmlFor="role">
                                Role
                            </label>
                            <Dropdown
                                value={searchType}
                                onChange={(e) => {
                                    setSearchType(e.target.value);
                                }}
                                style={{ borderRadius: '99px', width: '335px', marginLeft: '150px' }}
                                options={listSearchType}
                                optionLabel="display"
                                optionValue="code"
                                placeholder="Pilih Role"
                            />
                        </div>
                        <div className="col-12">
                            <label className="required" htmlFor="username">
                                Username
                            </label>
                            <InputText style={{ borderRadius: '99px', width: '335px', marginLeft: '170px' }} className="mr-6" placeholder="Contoh : admin_nama organisasi" />
                        </div>
                        <div className="col-12">
                            <label htmlFor="password" className="required">
                                Password
                            </label>
                            <span className="p-input-icon-right">
                                <i className="pi pi-fw pi-eye" />
                                <InputText style={{ borderRadius: '99px', width: '335px', marginLeft: '175px', background: '#CED2D9' }} placeholder="Password" disabled />
                            </span>
                            <Link href={'/auth/changepass'} className="ml-3">
                                Ganti Password
                            </Link>
                        </div>

                        <Button label="Simpan Perubahan" style={{ border: 'none', width: '642px', marginTop: '30px' }} onClick={() => setVisible(true)} />
                        <Dialog header="Simpan Perubahan" visible={visible} style={{ width: '327px' }} onHide={() => setVisible(false)} footer={footerContent}>
                            <div className="align-items-center">Apakah Anda ingin menyimpan perubahan?</div>
                        </Dialog>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UpdatePengguna;
