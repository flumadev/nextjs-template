import React, { createContext, ReactNode, useEffect, useState } from 'react';
import Router, { useRouter } from 'next/router';
import { setCookie, parseCookies } from 'nookies';

import {
  recoverUserInformation,
  signInRequest,
} from '../services/auth.service';

interface IProvider {
  children: ReactNode;
}

interface IAuthContext {
  isAuthenticated: boolean;
  user: IUser | null;
  SignIn: (data: ISignInData) => Promise<void>;
}

interface ISignInData {
  email: string;
  password: string;
}

interface IUser {
  name: string;
  email: string;
  avatar_url: string;
}

export const AuthContext = createContext({} as IAuthContext);

export const AuthProvider = ({ children }: IProvider) => {
  const [user, setUser] = useState<IUser | null>(null);

  const isAuthenticated = !!user;

  useEffect(() => {
    const { token: token } = parseCookies();

    if (token) {
      recoverUserInformation().then(({ user }) => {
        setUser(user);
      });
    }
  }, []);

  async function SignIn({ email, password }: ISignInData) {
    const response = await signInRequest({
      email,
      password,
    });

    setCookie(undefined, 'token', response.data.token, {
      maxAge: 60 * 60 * 1,
    });

    setUser(user);

    Router.push('/dashboard');
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, SignIn, user }}>
      {children}
    </AuthContext.Provider>
  );
};
