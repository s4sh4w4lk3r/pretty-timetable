import React from "react";
import styles from "./Modal.module.css"

type Props = {
    isVisible: boolean,
    title: string,
    children: JSX.Element,
    onClose: (e?: React.MouseEvent<HTMLDivElement, MouseEvent> | React.MouseEvent<HTMLSpanElement, MouseEvent>) => void
}
export default function Modal(props: Props) {
    const { isVisible = false, title, children, onClose } = props;
    const keydownHandler = ({ key }: { key: string }) => {
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
        <div className={styles.modal}
            onClick={onClose}>

            <div
                className={styles.modalDialog}
                onClick={e => e.stopPropagation()}>
                <div className={styles.modalHeader}>
                    <h3
                        className={styles.modalTitle}>
                        {title}
                    </h3>

                    <span
                        className={styles.modalClose}
                        onClick={onClose}>
                        &times;
                    </span>
                </div>

                <div className={styles.modalBody}>
                    <div
                        className={styles.modalContent}>
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}