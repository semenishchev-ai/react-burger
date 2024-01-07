import React, { FC } from "react";
import styles from './modal-overlay.module.css';

interface IModalOverlayProps {
    onClick: () => void;
}

const ModalOverlay: FC<IModalOverlayProps> = ({onClick}) => {
    return (
        <div className={styles.modal_overlay} onClick={onClick}></div>
    )
}

export default ModalOverlay;