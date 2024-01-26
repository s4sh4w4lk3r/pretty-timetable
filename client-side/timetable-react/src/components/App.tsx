import Table from "./Table/Table";
import { SubGroup } from "../api/graphql/__generated__/graphql";
import Main from "./Layouts/Main/Main";
import Header from "./Layouts/Header/Header";
import Footer from "./Layouts/Footer/Footer";
import { useAuth } from "react-oidc-context";

function getWeekNumber(date: Date) {
    date.setHours(0, 0, 0, 0);
    date.setDate(date.getDate() + 3 - ((date.getDay() + 6) % 7));
    const week1 = new Date(date.getFullYear(), 0, 4);
    return 1 + Math.round(((date.getTime() - week1.getTime()) / 86400000 - 3 + ((week1.getDay() + 6) % 7)) / 7);
}

export type GroupType = {
    id: number;
    subgroup: SubGroup;
};

// TODO: провести рефакторинг, сделать побольше переносов строк, поменьше передавать стейты напрямую в компоненты
// TODO: прикрутить аутентификацию

export default function App() {
    const currentWeekNumber = getWeekNumber(new Date(2024, 8, 2));
    const auth = useAuth();

    switch (auth.activeNavigator) {
        case "signinSilent":
            return <div>Signing you in...</div>;
        case "signoutRedirect":
            return <div>Signing you out...</div>;
    }

    if (auth.isLoading) {
        return <div>Loading...</div>;
    }

    if (auth.error) {
        return <div>Oops... {auth.error.message}</div>;
    }

    if (auth.isAuthenticated) {
        return (
            <div>
                Hello {auth.user?.profile.sub} <button onClick={() => void auth.removeUser()}>Log out</button>
            </div>
        );
    }

    return <button onClick={() => void auth.signinRedirect()}>Log in</button>;

    return (
        <>
            <Header></Header>

            <Main>
                <Table weekNumber={currentWeekNumber} />
            </Main>

            <Footer></Footer>
        </>
    );
}
