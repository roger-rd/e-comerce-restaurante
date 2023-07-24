import { createContext, useContext, useEffect, useState } from "react"

export const UserContext = createContext()

export default function UserContextProvider({ children }) {
    const [usuario, setUsuario] = useState(null);
    const [platos, setPlatos] = useState([]);
    const [error, setError] = useState();

    const getData = async () => {
        try {
            const response = await fetch("/platos.json")
            if (!response.ok) throw "NO SE PUEDE DESPLEGAR LA INFORMACIÓN"
            const data = await response.json()
            setPlatos(data)
        } catch (error) {
            setError(error)
        }
    }
    

    useEffect(() => {                    
        getData();
    }, [])

    return (
        <UserContext.Provider value={{usuario,setUsuario, platos, setPlatos, error, setError }}>
            {children}
        </UserContext.Provider>
    )
}

export const useUserContext = () => useContext(UserContext);