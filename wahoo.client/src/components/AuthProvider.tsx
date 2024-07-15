import {
    createContext,
    useContext,
    useState,
    useEffect,
    useMemo
} from "react";
import axios from "axios";

interface AuthContextType {
    isAuthorized: boolean;
    setIsAuthorized: React.Dispatch<React.SetStateAction<boolean>>
}

const AuthContext = createContext<AuthContextType>({
    isAuthorized: false,
    setIsAuthorized: () => { }
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isAuthorized, setIsAuthorized] = useState<boolean>(false);

    useEffect(() => {
        const getAuthConfirmation = async () => {
            await axios.get("/pingauth")
                .then((response) => {
                    if (response.status === 200) {
                        setIsAuthorized(true);
                        console.log("Authorized");
                    }
                    else if (response.status === 401) {
                        console.log("Unauthorized");
                        setIsAuthorized(false);
                    } else {
                        console.log("Unexpected status:", response.status);
                    }

                }).catch((error) => {
                    console.error(error);
                    setIsAuthorized(false);
                })
        };
        getAuthConfirmation();
    }, []);

    const contextValue = useMemo(() => ({
        isAuthorized, setIsAuthorized
    }),
        [isAuthorized]
    );

    return (
        <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);
