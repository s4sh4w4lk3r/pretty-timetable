import styles from "./Header.module.css";
export default function Header({ children }: { children?: JSX.Element | JSX.Element[] }) {
    return <header className={styles.header}>{children}</header>;
}
