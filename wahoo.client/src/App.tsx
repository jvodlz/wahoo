import { AuthProvider } from "./components/AuthProvider";
import Routes from "./routes/index";

function App() {
    return (
        <AuthProvider>
            <Routes />
        </AuthProvider>
    );

}
export default App;
