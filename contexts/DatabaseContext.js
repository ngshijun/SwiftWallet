import React, { useContext, useState, useEffect } from "react"
import { db } from "../firebase"
import { query, onSnapshot, collection, where } from "@firebase/firestore"
import { useAuth } from "./AuthContext"

const DatabaseContext = React.createContext()

export function useDatabase() {
    return useContext(DatabaseContext)
}

export function DatabaseProvider({ children }) {
    const { user } = useAuth()
    const [email, setEmail] = useState("")
    const [balance, setBalance] = useState(0)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (user) {
            const q = query(
                collection(db, "users"),
                where("email", "==", user.email)
            )
            onSnapshot(q, (querySnapshot) => {
                const data = querySnapshot.docs.map((doc) => doc.data())
                console.log(data)
                setEmail(data[0].email)
                setBalance(data[0].balance)
            })
        }
        setLoading(false)
    }, [])

    const value = {
        email,
        balance,
    }

    return (
        <DatabaseContext.Provider value={value}>
            {!loading && children}
        </DatabaseContext.Provider>
    )
}
