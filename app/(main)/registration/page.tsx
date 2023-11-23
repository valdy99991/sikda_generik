'use client';
import React, { useRef, useState } from 'react';
import Queue from './queue/page';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { Dialog } from 'primereact/dialog';
import { useRouter } from 'next/navigation';
import { TabView, TabPanel } from 'primereact/tabview';
import { Toast } from 'primereact/toast';
import QueuePatient from './patient-queue/page';
import Crud from '../pages/crud/page';
import Link from 'next/link';
import QueuePCare from './pcare-queue/page';

const BPJSRegistrationPage = ({ children }: any) => {
    // interface ConfirmContent {
    //     title: string;
    //     nik: string;
    //     nama: string;
    //     umur?: number;
    //     noAntrian?: number;
    // }

    const router = useRouter();
    // const [search, setSearch] = useState('');
    // const [searchType, setSearchType] = useState();
    // const [confirmDialog, setConfirmDialog] = useState(false);
    // const [confirmContent, setConfirmContent] = useState<ConfirmContent>();

    const toast = useRef(null);
    const toastTopCenter = useRef(null);

    const showMessage = (event, ref, severity) => {
        const label = event.target.innerText;

        ref.current.show({ severity: severity, summary: label, detail: label, life: 3000 });
    };

    // const listSearchType = [
    //     {
    //         display: 'NIK',
    //         code: 'NIK'
    //     },
    //     {
    //         display: 'Nama',
    //         code: 'NAMA'
    //     },
    //     {
    //         display: 'No Antrian',
    //         code: 'NO_ANTRIAN'
    //     }
    // ];

    // const onSearch = () => {
    //     setConfirmDialog(true);
    //     setConfirmContent({
    //         title: 'Data Pasien Ditemukan',
    //         nik: '31232020291021',
    //         nama: 'Joko Susilo'
    //     });
    // };

    const hideDialogConfirm = () => {
        setConfirmDialog(false);
    };

    const handleDialogConfirm = () => {
        setConfirmDialog(false);
        router.push('/registration/encounter');
    };

    const confirmDialogFooter = (
        <>
            <Button label="Kembali" icon="pi pi-times" text onClick={hideDialogConfirm} />
            <Button label="Lanjutkan Ke Pendaftaran" icon="pi pi-check" text onClick={handleDialogConfirm} />
        </>
    );

    return (
        <div>
            <div className="flex flex-column md:align-items-start">
                <h5>Pendaftaran</h5>
                <Toast ref={toastTopCenter} position="top-center" />
                <div className="flex flex-wrap gap-2">
                    <Button label="Berhasil mendaftarkan pasien baru" onClick={(e) => showMessage(e, toastTopCenter, 'success')} />
                    <Button label="Gagal mendaftarkan pasien baru" className="p-button-danger" onClick={(e) => showMessage(e, toastTopCenter, 'error')} />
                </div>
                <div className="mt-3">
                    <TabView>
                        <TabPanel header="Data Pasien">
                            <Queue />
                        </TabPanel>
                        <TabPanel header="Antrian Pasien">
                            <QueuePatient />
                        </TabPanel>
                        <TabPanel header="Antrian PCare BPJS">
                            <QueuePCare />
                        </TabPanel>
                    </TabView>
                </div>
            </div>
        </div>
    );
};

export default BPJSRegistrationPage;
