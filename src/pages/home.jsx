import React from "react";
import AppHeader from "../components/app-header/app-header";
import MainSection from "../components/main-section/main-section";
import Modal from "../components/modal/modal";
import { useModal } from "../hooks/useModal";
import { useSelector } from "react-redux";

function HomePage() {
    const dataFetched = useSelector(store =>  store.mainReducer.isFetched);
    const { isModalOpen, openModal, closeModal, modalChild, modalHeader } = useModal();
     
    return (
        <>
            {dataFetched && (<MainSection onModalOpen={openModal}/>)}
            {dataFetched && isModalOpen && (<Modal header={modalHeader} onClose={closeModal}>
                {modalChild}
                </Modal>)}
        </>
    )
}

export default HomePage;