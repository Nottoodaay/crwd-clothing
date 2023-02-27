import { initializeApp } from 'firebase/app'
import { 
    getAuth,
    signInWithPopup, 
    GoogleAuthProvider,
    createUserWithEmailAndPassword 
} from 'firebase/auth'

import{
    getFirestore,
    doc,
    getDoc,
    setDoc
}from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyBGE2ssM2Ko2HJarel9lhE_K3cCfzVzoA0",
    authDomain: "crwd-clothing-database.firebaseapp.com",
    projectId: "crwd-clothing-database",
    storageBucket: "crwd-clothing-database.appspot.com",
    messagingSenderId: "83379705228",
    appId: "1:83379705228:web:5898788677e9ec3155b2a9"
  };
  
const firebaseApp = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider()
provider.setCustomParameters({
    prompt: 'select_account'
})

export const auth = getAuth()
export const  signInWithGooglePopup = () => signInWithPopup(auth, provider)

export const db = getFirestore()

export const createUserDocumentFromAuth = async(userAuth, additionalInformation={}) =>{
    if(!userAuth) return

    const userDocRef = doc(db, 'users', userAuth.uid)

    const userSnapshot = await getDoc(userDocRef)

    if(!userSnapshot.exists()){
        const{ displayName, email } = userAuth
        const createdAt = new Date()

        try{
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
                ...additionalInformation
            })
        }catch(err){
            console.log('error creating the user', Error.message)
        }
    }

    return userDocRef
}

export const createAuthUserWithEmailAndPassword = async(email, password) =>{
    if(!email || !password) return

    return await createUserWithEmailAndPassword(auth, email, password)
}