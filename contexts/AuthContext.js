import React, { useContext, useState, useEffect } from "react"
import { auth, db } from "../firebase"
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut,
    sendPasswordResetEmail,
} from "@firebase/auth"
import {
    addDoc,
    collection,
    onSnapshot,
    query,
    where,
    setDoc,
    doc,
    orderBy,
} from "@firebase/firestore"

const AuthContext = React.createContext()

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({ children }) {
    const [user, setUser] = useState()
    const [username, setUsername] = useState("")
    const [userEmail, setUserEmail] = useState("")
    const [password, setPassword] = useState("")
    const [userBalance, setUserBalance] = useState(0)
    const [userCountryCode, setUserCountryCode] = useState("")
    const [userPhoneNumber, setUserPhoneNumber] = useState("")
    const [loading, setLoading] = useState(true)
    const [history, setHistory] = useState([])

    async function signup(username, email, password, countryCode, phoneNumber) {
        await createUserWithEmailAndPassword(auth, email, password).then(
            (userCredential) => {
                console.log(userCredential.user.uid)
                setDoc(doc(db, "users", userCredential.user.uid), {
                    username,
                    email,
                    countryCode,
                    phoneNumber,
                    password,
                    balance: 0,
                })
            }
        )
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
            const q = query(
                collection(db, "users"),
                where("email", "==", user.email)
            )
            onSnapshot(q, (querySnapshot) => {
                setUsername(null)
                setUserEmail(null)
                setUserBalance(null)
                setUserCountryCode(null)
                setUserPhoneNumber(null)
                querySnapshot.forEach((doc) => {
                    setUsername(doc.data().username)
                    setUserEmail(doc.data().email)
                    setUserBalance(doc.data().balance)
                    setUserCountryCode(doc.data().countryCode)
                    setUserPhoneNumber(doc.data().phoneNumber)
                })
            })
            const q1 = query(collection(db, "users", user.uid, "transactions"), orderBy("time", "desc"))
            onSnapshot(q1, (querySnapshot) => {
                setHistory([])
                querySnapshot.forEach((doc) => {
                    setHistory((history) => [...history, doc.data()])
                })
            })
        }
    }, [user])

    async function transaction(senderId, receiverId, amount, description) {
        date = new Date()
        time = formatDate(date)
        await addDoc(collection(db, "users", senderId, "transactions"), {
            type: "debit",
            amount,
            description,
            time,
        })
        await addDoc(collection(db, "users", receiverId, "transactions"), {
            type: "credit",
            amount,
            description,
            time,
        })
    }
      

    const value = {
        user,
        username,
        userBalance,
        userEmail,
        userCountryCode,
        userPhoneNumber,
        history,
        signup,
        login,
        logout,
        resetPassword,
        updateEmail,
        updatePassword,
        transaction,
    }

    const formatDate = (date) => {
        const year = date.getFullYear()
        const month = String(date.getMonth() + 1).padStart(2, "0")
        const day = String(date.getDate()).padStart(2, "0")
        return `${year}/${month}/${day}`
    }

    const formatTime = (date) => {
        const hours = String(date.getHours()).padStart(2, "0")
        const minutes = String(date.getMinutes()).padStart(2, "0")
        const seconds = String(date.getSeconds()).padStart(2, "0")
        return `${hours}:${minutes}:${seconds}`
    }
    

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}
