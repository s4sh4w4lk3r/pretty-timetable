import styles from "./Main.module.css";
export default function Main({ children }: { children?: JSX.Element | JSX.Element[] | undefined }) {
    return <main className={styles.main}>{children}</main>;
}
