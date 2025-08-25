import ProdiSection from '@/Components/Home/ProdiSection';
import InfoSection from '@/Components/Home/InfoSection';
import InfoBar from '@/Components/Home/InfoBar';
import JoinUsSection from '@/Components/Home/JoinusSection';
import HeroSlider from '@/Components/Home/HeroSlider';
import Footer from '@/Components/Home/Footer';
import Navbar from '@/Components/Home/Navbar';
import { Head } from '@inertiajs/react';
import { ToastContainer, toast } from 'react-toastify';
import { useEffect } from 'react';
import WhatsAppButton from '@/Components/Home/WhatsAppButton';
import FAQ from '@/Components/Home/FAQ';

export default function Welcome({ flash, faqs, slides }) {

    useEffect(()=> {
        if(flash.message.success){
            toast.success(flash.message.success);
        }
        if(flash.message.error){
            toast.error(flash.message.error);
        }
    }, [flash]);
    
    return (
        <>
            <Navbar />
            <ToastContainer />
            <Head title="Beranda" />
            
            <HeroSlider slides={slides} />
            <InfoBar />
            <InfoSection />
            <ProdiSection />
            <JoinUsSection />
            <FAQ faqs={faqs} />
            <Footer />
            <WhatsAppButton />
        </>
    );
}
