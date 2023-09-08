import React, { useContext, useState, useEffect } from "react"
import { auth } from "../firebase"
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut,
    sendPasswordResetEmail,
} from "@firebase/auth"

const AuthContext = React.createContext()

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({ children }) {
    const [user, setUser] = useState()
    const [loading, setLoading] = useState(true)

    async function signup(email, password) {
        return createUserWithEmailAndPassword(auth, email, password)
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

    const value = {
        user,
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
