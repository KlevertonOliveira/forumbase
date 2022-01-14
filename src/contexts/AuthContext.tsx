import React, { ReactNode, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, sendPasswordResetEmail, GoogleAuthProvider, UserCredential, User, signInWithPopup } from 'firebase/auth';
import { auth } from '../libs/firebaseConfig';

type AuthContextProps = {
  currentUser: User | null;
  signUp: (email: string, password: string) => Promise<UserCredential>;
  login: (email: string, password: string) => Promise<UserCredential>;
  logout: () => Promise<void>;
  loginWithGooglePopup: () => Promise<UserCredential>;
};

type AuthContextProviderProps = {
  children: ReactNode;
};

export const AuthContext = React.createContext({} as AuthContextProps);

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {

  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const firebaseAuth = auth;

  const provider = new GoogleAuthProvider();

  async function signUp(email: string, password: string) {
    return await createUserWithEmailAndPassword(firebaseAuth, email, password);
  }

  async function login(email: string, password: string) {
    return await signInWithEmailAndPassword(firebaseAuth, email, password);
  }

  async function logout() {
    return await signOut(firebaseAuth);
  }

  async function loginWithGooglePopup() {
    return await signInWithPopup(firebaseAuth, provider);
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider value={
      {
        currentUser,
        signUp,
        login,
        logout,
        loginWithGooglePopup,
      }
    }>
      {!loading && children}
    </AuthContext.Provider>
  );
};