import React from "react";
import MainSection from "../components/main-section/main-section";
import Modal from "../components/modal/modal";
import { useModal } from "../hooks/useModal";
import { useSelector } from "../hooks/useSelector";

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