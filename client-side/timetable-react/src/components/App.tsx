import Footer from "./footer/Footer"
import Header from "./header/Header"
import NavigationBar from "./navigationBar/NavigationBar"
import Table from "./table/Table"
export default function App() {
    return (<>
        <Header/>
        <NavigationBar/>
        <main>
            <Table></Table>
        </main>

        <Footer/>
    </>)

}