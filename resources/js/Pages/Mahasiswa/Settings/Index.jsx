import MahasiswaLayout from '@/Layouts/MahasiswaLayout'
import Edit from '@/Pages/Profile/Edit'
import { Head } from '@inertiajs/react'
import React, { useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify'

export default function Dashboard({ flash }) {

    useEffect(()=> {
        if(flash.message.success){
            toast.success(flash.message.success);
        }
        if(flash.message.error){
            toast.error(flash.message.error);
        }
    }, [flash]);

    return (
        <MahasiswaLayout
            header={'Pengaturan'}
        >
        <Head title="Pengaturan" />
        <ToastContainer />
            <Edit />
        </MahasiswaLayout>
    )
}