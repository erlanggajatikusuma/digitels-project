import auth from '@react-native-firebase/auth';

export const signIn = async (email?: any, password?: any) => {
  const signed = await auth()
    .signInWithEmailAndPassword(email, password)
    .then(res => res)
    .catch(err => err);

  return signed;
};

export const register = async (email, password) => {
  const registered = await auth()
    .createUserWithEmailAndPassword(email, password)
    .then(res => res)
    .catch(err => err);

  return registered;
};
