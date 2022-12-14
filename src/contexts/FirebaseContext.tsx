/* eslint-disable import/no-duplicates */
import { createContext, ReactNode, useEffect, useReducer, useState } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { managerLogin } from '_apis_/login';
import { PATH_AUTH, PATH_DASHBOARD } from 'routes/paths';
// @types
import { ActionMap, AuthState, AuthUser, FirebaseContextType } from '../@types/authentication';
import { setSession } from '../utils/jwt';
//
import { firebaseConfig } from '../config';

// ----------------------------------------------------------------------

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
  firebase.firestore();
}

const initialState: AuthState = {
  isAuthenticated: false,
  isInitialized: false,
  user: null
};

enum Types {
  Initial = 'INITIALISE'
}

type FirebaseAuthPayload = {
  [Types.Initial]: {
    isAuthenticated: boolean;
    user: AuthUser;
  };
};

type FirebaseActions = ActionMap<FirebaseAuthPayload>[keyof ActionMap<FirebaseAuthPayload>];

const reducer = (state: AuthState, action: FirebaseActions) => {
  if (action.type === 'INITIALISE') {
    const { isAuthenticated, user } = action.payload;
    return {
      ...state,
      isAuthenticated,
      isInitialized: true,
      user
    };
  }

  return state;
};

const AuthContext = createContext<FirebaseContextType | null>(null);

function AuthProvider({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<firebase.firestore.DocumentData | undefined>();
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(
    () =>
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          user
            .getIdToken(true)
            .then((idToken) => {
              localStorage.setItem('firebaseToken', idToken);

              managerLogin.createLogin(idToken).then((response) => {
                if (response.data.value == null) {
                  axios
                    .get('/api/v1/account-info', {
                      params: { jwtToken: response.data.token }
                    })
                    .then((response) => {
                      const user = response.data;
                      dispatch({
                        type: Types.Initial,
                        payload: {
                          isAuthenticated: true,
                          user
                        }
                      });
                    });
                } else {
                  dispatch({
                    type: Types.Initial,
                    payload: { isAuthenticated: false, user }
                  });
                  navigate(PATH_AUTH.register);
                }
              });
            })
            .catch((error) => {
              console.log(error);
            });
        } else {
          dispatch({
            type: Types.Initial,
            payload: { isAuthenticated: false, user: null }
          });
        }
      }),
    [dispatch]
  );

  const login = (email: string, password: string) =>
    firebase.auth().signInWithEmailAndPassword(email, password);

  const loginWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    return firebase.auth().signInWithPopup(provider);
  };

  const loginWithFaceBook = () => {
    const provider = new firebase.auth.FacebookAuthProvider();
    return firebase.auth().signInWithPopup(provider);
  };

  const loginWithTwitter = () => {
    const provider = new firebase.auth.TwitterAuthProvider();
    return firebase.auth().signInWithPopup(provider);
  };

  const register = (email: string, password: string, firstName: string, lastName: string) =>
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((res) => {
        firebase
          .firestore()
          .collection('users')
          .doc(res.user?.uid)
          .set({
            uid: res.user?.uid,
            email,
            displayName: `${firstName} ${lastName}`
          });
      });

  const logout = async () => {
    await firebase.auth().signOut();
  };

  const resetPassword = async (email: string) => {
    await firebase.auth().sendPasswordResetEmail(email);
  };

  const auth = { ...state.user };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        method: 'firebase',
        user: {
          id: auth.student_id,
          email: auth.email,
          photoURL: auth.imageUrl,
          displayName: auth.name,
          role_id: auth.role_id,
          phoneNumber: auth.phoneNumber || ''
        },
        login,
        register,
        loginWithGoogle,
        loginWithFaceBook,
        loginWithTwitter,
        logout,
        resetPassword,
        updateProfile: () => {}
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
