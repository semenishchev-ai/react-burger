import React, { FC, ReactElement } from "react";
import ReactDOM from "react-dom";
import ModalOverlay from "../modal-overlay/modal-overlay";
import styles from './modal.module.css';
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";

const modalRoot = document.getElementById('react-modals');

interface IModalProps {
    children: ReactElement;
    header: string;
    onClose: () => void;
}

const Modal: FC<IModalProps> = ({children, header, onClose}) => {
    React.useEffect(() => {
        const onEsc = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                onClose();
            }
        }
        document.addEventListener('keydown', onEsc);
        return () => {
            document.removeEventListener('keydown', onEsc);
        }
    }, [onClose])

    if (!modalRoot) {
        return null;
    }

    return ReactDOM.createPortal(
        <>
            <ModalOverlay onClick={onClose} />
            <div className={styles.modal}>
                <div className={styles.header_group}>
                    <h1 className={styles.header + ' text text_type_main-large'}>
                        {header}
                    </h1>
                    <div className={styles.close_icon}>
                        <CloseIcon type="primary" onClick={onClose}/>
                    </div>
                </div>
                <div>
                    {children}
                </div>
            </div>
        </>, modalRoot
    )
}

export default Modal;