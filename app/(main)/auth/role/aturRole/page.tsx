/* eslint-disable react/jsx-no-undef */
'use client';
import React, { useRef, useState } from 'react';
// import Queue from './queue/page';

import { Button } from 'primereact/button';
import { redirect, useRouter } from 'next/navigation';
import { BreadCrumb } from 'primereact/breadcrumb';
import { Toast } from 'primereact/toast';
import CustomCheckBox from '../checkedBox/page';
import { Checkbox } from 'primereact/checkbox';
import { Dialog } from 'primereact/dialog';

// import QueuePatient from './patient-queue/page';
// import Crud from '../pages/crud/page';

const AturRole = ({ children }: any) => {
    interface ConfirmContent {
        title: string;
        nik: string;
        nama: string;
        umur?: number;
        noAntrian?: number;
    }

    const router = useRouter();
    // const [search, setSearch] = useState('');
    // const [searchType, setSearchType] = useState();
    const [confirmDialog, setConfirmDialog] = useState(false);
    const [toggle, setToggle] = useState(1);
    const [confirmContent, setConfirmContent] = useState<ConfirmContent>();
    const [checked, setChecked] = useState(false);
    const [show, setShow] = useState(false);

    // const [ingredient, setIngredient] = useState('');

    const updateToggle = (id: any) => {
        setToggle(id);
    };

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

    const onSearch = () => {
        setConfirmDialog(true);
        setConfirmContent({
            title: 'Data Pasien Ditemukan',
            nik: '31232020291021',
            nama: 'Joko Susilo'
        });
    };

    const hideDialogConfirm = () => {
        setConfirmDialog(false);
    };

    const handleDialogConfirm = () => {
        setConfirmDialog(false);
        router.push('/auth/role');
    };

    const confirmDialogFooter = (
        <>
            <Button label="Batal" icon="pi pi-times" text onClick={hideDialogConfirm} />
            <Button label="Simpan" style={{ backgroundColor: '#3899FE', color: 'white' }} icon="pi pi-check" text onClick={handleDialogConfirm} />
        </>
    );
    const items = [{ label: 'Atur Role' }];
    const home = { label: 'Kembali', url: '/registration' };

    const toastTopCenter = useRef(null);
    return (
        <div>
            {/* style={{ width: '1389px' }} */}
            <div className="flex flex-column md:align-items-start ">
                <div className="card">
                    <h5>Atur Role Pengguna</h5>
                    <div className="flex ">
                        <BreadCrumb model={items} home={home} className="border-0" />
                        <Button label="Simpan Perubahan" style={{ border: 'none', width: '192px', marginLeft: '900px' }} onClick={() => setShow(true)} />
                    </div>
                    <div className="flex mt-6">
                        <div className="col-6 customs-tab">
                            <h6>Nama Role</h6>
                            <ul className="flex flex-column">
                                <li className="flex-fill" onClick={() => updateToggle(1)}>
                                    Admin
                                </li>
                                <li className="flex-fill" onClick={() => updateToggle(2)}>
                                    Loket
                                </li>
                                <li className="flex-fill" onClick={() => updateToggle(3)}>
                                    Poli
                                </li>
                                <li className="flex-fill" onClick={() => updateToggle(4)}>
                                    Farmasi
                                </li>
                                <li className="flex-fill" onClick={() => updateToggle(5)}>
                                    Kasir
                                </li>
                            </ul>
                        </div>
                        <div className="col-6 ml-4">
                            <h6>Hak Akses Menu</h6>
                            <div className={toggle === 1 ? 'show-content' : 'content'}>
                                <div className="flex mt-4">
                                    <Checkbox onChange={(e) => setChecked(e.checked)} checked={checked}></Checkbox>
                                    <label htmlFor="" style={{ marginLeft: '8px', fontWeight: '400', fontSize: '14px' }}>
                                        Pilih Semua
                                    </label>
                                </div>
                                <div className="flex mt-4">
                                    <Checkbox onChange={(e) => setChecked(e.checked)} checked={checked}></Checkbox>
                                    <label htmlFor="" style={{ marginLeft: '8px', fontWeight: '400', fontSize: '14px' }}>
                                        Menu Pendaftaran
                                    </label>
                                </div>
                                <div className="flex mt-4">
                                    <Checkbox onChange={(e) => setChecked(e.checked)} checked={checked}></Checkbox>
                                    <label htmlFor="" style={{ marginLeft: '8px', fontWeight: '400', fontSize: '14px' }}>
                                        Akses Pengguna - Menu Pengguna
                                    </label>
                                </div>
                                <div className="flex mt-4">
                                    <Checkbox onChange={(e) => setChecked(e.checked)} checked={checked}></Checkbox>
                                    <label htmlFor="" style={{ marginLeft: '8px', fontWeight: '400', fontSize: '14px' }}>
                                        Akses Pengguna - Menu Role
                                    </label>
                                </div>
                                <div className="flex mt-4">
                                    <Checkbox onChange={(e) => setChecked(e.checked)} checked={checked}></Checkbox>
                                    <label htmlFor="" style={{ marginLeft: '8px', fontWeight: '400', fontSize: '14px' }}>
                                        Master Data - Organisasi/Faskes
                                    </label>
                                </div>
                            </div>
                            <div className={toggle === 2 ? 'show-content' : 'content'}>
                                {' '}
                                <div className="flex mt-4">
                                    <Checkbox onChange={(e) => setChecked(e.checked)} checked={checked}></Checkbox>
                                    <label htmlFor="" style={{ marginLeft: '8px', fontWeight: '400', fontSize: '14px' }}>
                                        Pilih Semua
                                    </label>
                                </div>
                                <div className="flex mt-4">
                                    <Checkbox onChange={(e) => setChecked(e.checked)} checked={checked}></Checkbox>
                                    <label htmlFor="" style={{ marginLeft: '8px', fontWeight: '400', fontSize: '14px' }}>
                                        Menu Pendaftaran
                                    </label>
                                </div>
                                <div className="flex mt-4">
                                    <Checkbox onChange={(e) => setChecked(e.checked)} checked={checked}></Checkbox>
                                    <label htmlFor="" style={{ marginLeft: '8px', fontWeight: '400', fontSize: '14px' }}>
                                        Akses Pengguna - Menu Pengguna
                                    </label>
                                </div>
                                <div className="flex mt-4">
                                    <Checkbox onChange={(e) => setChecked(e.checked)} checked={checked}></Checkbox>
                                    <label htmlFor="" style={{ marginLeft: '8px', fontWeight: '400', fontSize: '14px' }}>
                                        Akses Pengguna - Menu Role
                                    </label>
                                </div>
                                <div className="flex mt-4">
                                    <Checkbox onChange={(e) => setChecked(e.checked)} checked={checked}></Checkbox>
                                    <label htmlFor="" style={{ marginLeft: '8px', fontWeight: '400', fontSize: '14px' }}>
                                        Master Data - Organisasi/Faskes
                                    </label>
                                </div>
                            </div>
                            <div className={toggle === 3 ? 'show-content' : 'content'}>
                                {' '}
                                <div className="flex mt-4">
                                    <Checkbox onChange={(e) => setChecked(e.checked)} checked={checked}></Checkbox>
                                    <label htmlFor="" style={{ marginLeft: '8px', fontWeight: '400', fontSize: '14px' }}>
                                        Pilih Semua
                                    </label>
                                </div>
                                <div className="flex mt-4">
                                    <Checkbox onChange={(e) => setChecked(e.checked)} checked={checked}></Checkbox>
                                    <label htmlFor="" style={{ marginLeft: '8px', fontWeight: '400', fontSize: '14px' }}>
                                        Menu Pendaftaran
                                    </label>
                                </div>
                                <div className="flex mt-4">
                                    <Checkbox onChange={(e) => setChecked(e.checked)} checked={checked}></Checkbox>
                                    <label htmlFor="" style={{ marginLeft: '8px', fontWeight: '400', fontSize: '14px' }}>
                                        Akses Pengguna - Menu Pengguna
                                    </label>
                                </div>
                                <div className="flex mt-4">
                                    <Checkbox onChange={(e) => setChecked(e.checked)} checked={checked}></Checkbox>
                                    <label htmlFor="" style={{ marginLeft: '8px', fontWeight: '400', fontSize: '14px' }}>
                                        Akses Pengguna - Menu Role
                                    </label>
                                </div>
                                <div className="flex mt-4">
                                    <Checkbox onChange={(e) => setChecked(e.checked)} checked={checked}></Checkbox>
                                    <label htmlFor="" style={{ marginLeft: '8px', fontWeight: '400', fontSize: '14px' }}>
                                        Master Data - Organisasi/Faskes
                                    </label>
                                </div>
                            </div>
                            <div className={toggle === 4 ? 'show-content' : 'content'}>
                                {' '}
                                <div className="flex mt-4">
                                    <Checkbox onChange={(e) => setChecked(e.checked)} checked={checked}></Checkbox>
                                    <label htmlFor="" style={{ marginLeft: '8px', fontWeight: '400', fontSize: '14px' }}>
                                        Pilih Semua
                                    </label>
                                </div>
                                <div className="flex mt-4">
                                    <Checkbox onChange={(e) => setChecked(e.checked)} checked={checked}></Checkbox>
                                    <label htmlFor="" style={{ marginLeft: '8px', fontWeight: '400', fontSize: '14px' }}>
                                        Menu Pendaftaran
                                    </label>
                                </div>
                                <div className="flex mt-4">
                                    <Checkbox onChange={(e) => setChecked(e.checked)} checked={checked}></Checkbox>
                                    <label htmlFor="" style={{ marginLeft: '8px', fontWeight: '400', fontSize: '14px' }}>
                                        Akses Pengguna - Menu Pengguna
                                    </label>
                                </div>
                                <div className="flex mt-4">
                                    <Checkbox onChange={(e) => setChecked(e.checked)} checked={checked}></Checkbox>
                                    <label htmlFor="" style={{ marginLeft: '8px', fontWeight: '400', fontSize: '14px' }}>
                                        Akses Pengguna - Menu Role
                                    </label>
                                </div>
                                <div className="flex mt-4">
                                    <Checkbox onChange={(e) => setChecked(e.checked)} checked={checked}></Checkbox>
                                    <label htmlFor="" style={{ marginLeft: '8px', fontWeight: '400', fontSize: '14px' }}>
                                        Master Data - Organisasi/Faskes
                                    </label>
                                </div>
                            </div>
                            <div className={toggle === 5 ? 'show-content' : 'content'}>
                                {' '}
                                <div className="flex mt-4">
                                    <Checkbox onChange={(e) => setChecked(e.checked)} checked={checked}></Checkbox>
                                    <label htmlFor="" style={{ marginLeft: '8px', fontWeight: '400', fontSize: '14px' }}>
                                        Pilih Semua
                                    </label>
                                </div>
                                <div className="flex mt-4">
                                    <Checkbox onChange={(e) => setChecked(e.checked)} checked={checked}></Checkbox>
                                    <label htmlFor="" style={{ marginLeft: '8px', fontWeight: '400', fontSize: '14px' }}>
                                        Menu Pendaftaran
                                    </label>
                                </div>
                                <div className="flex mt-4">
                                    <Checkbox onChange={(e) => setChecked(e.checked)} checked={checked}></Checkbox>
                                    <label htmlFor="" style={{ marginLeft: '8px', fontWeight: '400', fontSize: '14px' }}>
                                        Akses Pengguna - Menu Pengguna
                                    </label>
                                </div>
                                <div className="flex mt-4">
                                    <Checkbox onChange={(e) => setChecked(e.checked)} checked={checked}></Checkbox>
                                    <label htmlFor="" style={{ marginLeft: '8px', fontWeight: '400', fontSize: '14px' }}>
                                        Akses Pengguna - Menu Role
                                    </label>
                                </div>
                                <div className="flex mt-4">
                                    <Checkbox onChange={(e) => setChecked(e.checked)} checked={checked}></Checkbox>
                                    <label htmlFor="" style={{ marginLeft: '8px', fontWeight: '400', fontSize: '14px' }}>
                                        Master Data - Organisasi/Faskes
                                    </label>
                                </div>
                            </div>
                        </div>
                        <Dialog header="Simpan Perubahan" visible={show} style={{ width: '327px' }} onHide={() => setShow(false)} footer={confirmDialogFooter}>
                            <div className="align-items-center">Apakah Anda ingin menyimpan perubahan? Pilih Metode Masuk</div>
                        </Dialog>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AturRole;

//  {/* <TabView>
//                             <TabPanel header="Data Pasien">
//                                 {/* <Queue /> */} <p>Data PAsien</p>
//                                 </TabPanel>
//                                 <TabPanel header="Antrian Pasien">
//                                     {/* <QueuePatient /> */} <p>Antrian PAsien</p>
//                                 </TabPanel>
//                                 <TabPanel header="Antrian PCare BPJS">
//                                     {/* <QueuePCare /> */} <p>Antrian PCare BPJS</p>
//                                 </TabPanel>
//                             </TabView> */}
