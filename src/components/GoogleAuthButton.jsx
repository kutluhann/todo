"use client"

import { authenticateUser } from '@/actions';
import { GoogleOAuthProvider, useGoogleLogin } from '@react-oauth/google';

function Button() {
  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      console.log(tokenResponse)
      const response = await fetch(
        'https://www.googleapis.com/oauth2/v3/userinfo',
        { headers: { Authorization: `Bearer ${tokenResponse.access_token}` } },
      );
      
      const userInfo = await response.json()
      
      const res = await authenticateUser(userInfo.sub)

      if (res?.error) {
        alert(res.error)
      }
    },
    onError: errorResponse => console.log(errorResponse),
  });

  return(
    <button 
      className="p-2 w-full bg-gray-200 font-semibold text-sm rounded-md text-center hover:bg-slate-100 duration-75 transition-all"
      onClick={() => googleLogin()}
    >
      Sign in
    </button>
  )
}

export default function GoogleAuthButton() {
 
  return (
    <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}>
      <Button />
    </GoogleOAuthProvider>
  )
}
