import React, { useContext, useState, useEffect } from "react"
import { auth, db } from "../firebase"
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut,
    sendPasswordResetEmail,
} from "@firebase/auth"
import { addDoc, collection, onSnapshot, query, where } from "@firebase/firestore"

const AuthContext = React.createContext()

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({ children }) {
    const [user, setUser] = useState()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [balance, setBalance] = useState(0)
    const [countryCode, setCountryCode] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")
    const [loading, setLoading] = useState(true)

    async function signup(email, password, countryCode, phoneNumber) {
        await addDoc(collection(db, "users"), {
            email,
            countryCode,
            phoneNumber,
            password,
            balance: 0,
        })
        await createUserWithEmailAndPassword(auth, email, password)
    }

    async function login(email, password) {
        return signInWithEmailAndPassword(auth, email, password)
        // setPersistence(auth, browserSessionPersistence)
        //     .then(() => {
        //         // Existing and future Auth states are now persisted in the current
        //         // session only. Closing the window would clear any existing state even
        //         // if a user forgets to sign out.
        //         // ...
        //         // New sign-in will be persisted with session persistence.

        //     })
        //     .catch((error) => {
        //         // Handle Errors here.
        //     })
    }

    function logout() {
        return signOut(auth)
    }

    function resetPassword(email) {
        return sendPasswordResetEmail(auth, email)
    }

    function updateEmail(email) {
        return user.updateEmail(email)
    }

    function updatePassword(password) {
        return user.updatePassword(password)
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user)
            setLoading(false)
        })
        return unsubscribe
    }, [])

    useEffect(() => {
        if (user) {
            const q = query(collection(db, "users"), where("email", "==", user.email))
            onSnapshot(q, (querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    setEmail(doc.data().email)
                    setBalance(doc.data().balance)
                    setCountryCode(doc.data().countryCode)
                    setPhoneNumber(doc.data().phoneNumber)
                })
            })
        }
    }, [user])

    const value = {
        user,
        balance,
        email,
        signup,
        login,
        logout,
        resetPassword,
        updateEmail,
        updatePassword,
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}
