

import axios from 'axios';
import { getAuth, signInWithCredential, GoogleAuthProvider } from 'firebase/auth';
import '@/lib/firebase';

export const LoginService = async (googleToken: string) => {
  try {
    const auth = getAuth();
    const credential = GoogleAuthProvider.credential(googleToken);
    const userCred = await signInWithCredential(auth, credential);
    const idToken = await userCred.user.getIdToken();

    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/api/auth/signin`,
      { token: idToken },
      { withCredentials: true }
    );
    console.log('LoginService response:', response.data);
    return response.data;
  } catch (error: any) {
    console.error('LoginService error:', error.response?.data || error.message);
    throw error;
  }
};