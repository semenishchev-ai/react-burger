import React from "react";
import PropTypes from 'prop-types';
import styles from './modal-overlay.module.css';

function ModalOverlay({onClick}) {
    return (
        <div className={styles.modal_overlay} onClick={onClick}></div>
    )
}

ModalOverlay.propTypes = {
    onClick: PropTypes.func
}

export default ModalOverlay;