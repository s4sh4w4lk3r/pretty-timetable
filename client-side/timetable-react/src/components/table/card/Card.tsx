import styles from "./Card.module.css"
export default function Card({ teacher, subject, cabinet }: { teacher: string, subject: string, cabinet: string }) {
    return (
        <div className={styles.card}>
            <p className={styles.subject}>{subject}</p>
            <div className={styles.info}>
                <p className={styles.teacher}>{teacher}</p>
                <p className={styles.cabinet}>{cabinet}</p>
            </div>
        </div>
    )
}


