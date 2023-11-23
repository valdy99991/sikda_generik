/* eslint-disable react/jsx-no-undef */
'use client';
import React, { useRef, useState } from 'react';
// import Queue from './queue/page';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { redirect, useRouter } from 'next/navigation';
import { BreadCrumb } from 'primereact/breadcrumb';
import { RadioButton } from 'primereact/radiobutton';
import { PhoneInput } from 'react-international-phone';
import { Toast } from 'primereact/toast';
import 'react-international-phone/style.css';

const AddOrganization = ({ children }: any) => {
    interface ConfirmContent {
        title: string;
        nik: string;
        nama: string;
        umur?: number;
        noAntrian?: number;
    }

    const [value, setValue] = useState();

    const router = useRouter();
    const [search, setSearch] = useState('');
    const [searchType, setSearchType] = useState();
    const [confirmDialog, setConfirmDialog] = useState(false);
    const [confirmContent, setConfirmContent] = useState<ConfirmContent>();
    const [ingredient, setIngredient] = useState('');
    const [visible, setVisible] = useState(false);
    const [phone, setPhone] = useState('');

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

    const handleYes = () => {
        setVisible(false);
        router.push('/master-data/organization');
    };

    const footerContent = (
        <div>
            <Button label="Batal" icon="pi pi-times" onClick={() => setVisible(false)} className="p-button-text" />
            <Button label="Simpan" icon="pi pi-check" onClick={() => handleYes()} autoFocus />
        </div>
    );

    const items = [{ label: 'Update Pengguna' }];
    const home = { label: 'Kembali', url: '/auth/user' };
    const toastTopCenter = useRef(null);
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
                                Kode
                            </label>
                            <InputText style={{ borderRadius: '99px', width: '335px', marginLeft: '130px' }} className="mr-6 mt-4" id="namapengguna" aria-describedby="namapengguna-help" placeholder="Contoh : Budi" />
                        </div>
                        <div className="col-12">
                            <label className="required" htmlFor="namapengguna">
                                Nama
                            </label>
                            <InputText style={{ borderRadius: '99px', width: '335px', marginLeft: '123px' }} className="mr-6 mt-4" id="namapengguna" aria-describedby="namapengguna-help" placeholder="Contoh : Budi" />
                        </div>
                        <div className="col-12 mt-3">
                            <label className="required" style={{ marginRight: '123px' }} htmlFor="tempatlahir">
                                Status
                            </label>
                            <RadioButton inputId="laki" name="laki" value="laki" onChange={(e) => setIngredient(e.value)} checked={ingredient === 'laki'} />
                            <label htmlFor="laki" className="ml-2 mr-4">
                                Aktif
                            </label>
                            <RadioButton inputId="perempuan" name="perempuan" value="perempuan" onChange={(e) => setIngredient(e.value)} checked={ingredient === 'perempuan'} />
                            <label htmlFor="perempuan" className="ml-2">
                                Tidak Aktif
                            </label>
                        </div>
                        <div className="col-12 flex gap-5 mt-5">
                            <label className="required" htmlFor="namapengguna">
                                Nomor Telepon
                            </label>
                            <PhoneInput defaultCountry="ua" style={{ marginTop: '-10px', marginLeft: '35px' }} value={phone} onChange={(phone) => setPhone(phone)} />
                        </div>
                        <div className="col-12">
                            <label className="required" htmlFor="namapengguna">
                                Email
                            </label>
                            <InputText style={{ borderRadius: '99px', width: '335px', marginLeft: '123px' }} className="mr-6 mt-4" id="namapengguna" aria-describedby="namapengguna-help" placeholder="Contoh : Budi" />
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

export default AddOrganization;
