import React from "react";
import styles from "./Modal.module.css"

export default function Modal({ isVisible = false, title, content, footer, onClose }) {
    const keydownHandler = ({ key }) => {
        switch (key) {
            case 'Escape':
                onClose();
                break;
            default:
        }
    };

    React.useEffect(() => {
        document.addEventListener('keydown', keydownHandler);
        return () => document.removeEventListener('keydown', keydownHandler);
    });

    return !isVisible ? null : (
        <div className={styles.modal} onClick={onClose}>
            <div className={styles.modalDialog} onClick={e => e.stopPropagation()}>
                <div className={styles.modalHeader}>
                    <h3 className={styles.modalTitle}>{title}</h3>
                    <span className={styles.modalClose} onClick={onClose}>
                        &times;
                    </span>
                </div>
                <div className={styles.modalBody}>
                    <div className={styles.modalContent}>{content}</div>
                </div>
                {footer && <div className={styles.modalFooter}>{footer}</div>}
            </div>
        </div>
    );
};