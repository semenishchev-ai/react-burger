import React, { useEffect } from "react";
import AppHeader from "../app-header/app-header";
import MainSection from "../main-section/main-section";
import Modal from "../modal/modal";
import { useModal } from "../../hooks/useModal";

const url = "https://norma.nomoreparties.space/api/ingredients";

function App () {
    const [ingredients, setIngregients] = React.useState([])
    const [dataFetched, setDataFetched] = React.useState(false)
    const { isModalOpen, openModal, closeModal, modalChild, modalHeader } = useModal();

    useEffect(() => {
        fetch(url)
        .then((res) => {
            if (res.ok) {
                return res.json()
            }
            return Promise.reject(`Ошибка ${res.status}`);
        })
        .then((res) => {
            setIngregients(res.data)
            setDataFetched(true)
        })
        .catch(console.error);
    }, [])
    

    return (
        <>
            <AppHeader />
            {dataFetched && (<MainSection ingredients={ingredients} onModalOpen={openModal}/>)}
            {dataFetched && isModalOpen && (<Modal header={modalHeader} onClose={closeModal}>
                {modalChild}
                </Modal>)}
        </>
    )
}

export default App;