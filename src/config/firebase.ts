import auth from '@react-native-firebase/auth';

export const signIn = async (email?: any, password?: any) => {
  const signed = await auth()
    .signInWithEmailAndPassword(email, password)
    .then(res => console.log('SIGNED ==> ', res))
    .catch(err => err);

  return signed;
};
