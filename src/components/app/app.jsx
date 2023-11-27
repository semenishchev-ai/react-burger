import React, { useEffect } from "react";
import AppHeader from "../app-header/app-header";
import MainSection from "../main-section/main-section";
import Modal from "../modal/modal";
import { useModal } from "../../hooks/useModal";
import { fetchIngredients } from "../../services/actions/actions";
import { useDispatch, useSelector } from "react-redux";

function App () {
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

export default App;