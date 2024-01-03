import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AppHeader from "../components/app-header/app-header";
import MainSection from "../components/main-section/main-section";
import Modal from "../components/modal/modal";
import { useModal } from "../hooks/useModal";
import { fetchIngredients } from "../services/actions/actions";

function HomePage() {
    const { isModalOpen, openModal, closeModal, modalChild, modalHeader } = useModal();
    const dataFetched = useSelector(store =>  store.mainReducer.isFetched);   

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchIngredients())
    }, [dispatch])

    return (
        <>
            <AppHeader />
            {dataFetched && (<MainSection onModalOpen={openModal}/>)}
            {dataFetched && isModalOpen && (<Modal header={modalHeader} onClose={closeModal}>
                {modalChild}
                </Modal>)}
        </>
    )
}

export default HomePage;