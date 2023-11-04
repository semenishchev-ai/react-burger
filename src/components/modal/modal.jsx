import React from "react";
import PropTypes from 'prop-types';
import ReactDOM from "react-dom";
import ModalOverlay from "../modal-overlay/modal-overlay";
import styles from './modal.module.css';
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";

const modalRoot = document.getElementById('react-modals');

function Modal({children, header, onClose}) {
    React.useEffect(() => {
        const onEsc = (event) => {
            if (event.key === "Escape") {
                onClose();
            }
        }
        document.addEventListener('keydown', onEsc);
        return () => {
            document.removeEventListener('keydown', onEsc);
        }
    }, [onClose])



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

Modal.propTypes = {
    children: PropTypes.element,
    header: PropTypes.string,
    onClose: PropTypes.func
}

export default Modal;