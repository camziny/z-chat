import { createContext } from 'react'

const AuthContext = createContext({
    userId: "",
    setUserId: (newUserId: string) => {},
})

export default AuthContext