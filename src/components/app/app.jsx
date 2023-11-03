import React, { useEffect } from "react";
import AppHeader from "../app-header/app-header";
import MainSection from "../main-section/main-section";
import Modal from "../modal/modal";

const url = "https://norma.nomoreparties.space/api/ingredients";

function App () {
    const [ingredients, setIngregients] = React.useState([])
    const [dataFetched, setDataFetched] = React.useState(false)
    const [modalOpened, setModalOpened] = React.useState(false)
    const [modalChild, setModalChild] = React.useState(<></>);
    const [modalHeader, setModalHeader] = React.useState('');

    const onModalOpen = (header, content) => {
        setModalOpened(true)
        setModalChild(content)
        setModalHeader(header)
    }

    const onModalClose = () => {
        setModalOpened(false)
    }

    useEffect(() => {
        fetch(url)
        .then((res) => res.json())
        .then((res) => {
            setIngregients(res.data)
            setDataFetched(true)
        })
        .catch((err) => console.log("Server error"));
    }, [ingredients])
    

    return (
        <>
            <AppHeader />
            {dataFetched && <MainSection ingredients={ingredients} onModalOpen={onModalOpen}/>}
            {dataFetched && modalOpened && <Modal header={modalHeader} onClose={onModalClose}>
                {modalChild}
                </Modal>}
        </>
    )
}

export default App;