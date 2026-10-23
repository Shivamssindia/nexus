'use client';

import { useEffect, useRef } from 'react';
import { LoginService } from '@/Service/LoginService';
import { useAuth } from '@/contexts/AuthContext';

declare global {
  interface Window {
    google?: any;
    triggerGoogleLogin?: () => void;
  }
}

export default function OneTapFirebase() {
  const { refreshUser } = useAuth();
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    const loadScript = () =>
      new Promise<void>((resolve, reject) => {
        if (window.google) return resolve();
        const script = document.createElement('script');
        script.src = 'https://accounts.google.com/gsi/client';
        script.async = true;
        script.onload = () => resolve();
        script.onerror = () => reject(new Error('Failed to load Google Identity script'));
        document.body.appendChild(script);
      });

    const initGoogle = async () => {
      const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

      if (!clientId) {
        console.error(
          '[OneTap] NEXT_PUBLIC_GOOGLE_CLIENT_ID is missing. ' +
          'Add it to .env.local and restart the dev server.'
        );
        return;
      }

      try {
        await loadScript();
      } catch (err) {
        console.error('[OneTap] Google script failed to load', err);
        return;
      }

      window.google.accounts.id.initialize({
        client_id: clientId,
        callback: handleOneTap,
        auto_select: true,
        cancel_on_tap_outside: true,
      });

      const dismissed = localStorage.getItem('oneTapDismissed');
      if (!dismissed) {
        window.google.accounts.id.prompt((notification: any) => {
          if (notification.isDismissedMoment()) {
            localStorage.setItem('oneTapDismissed', 'true');
          }
        });
      }

      window.triggerGoogleLogin = () => {
        window.google.accounts.id.prompt();
      };
    };

    const handleOneTap = async (response: any) => {
      try {
        if (!response?.credential) return;
        await LoginService(response.credential);
        await refreshUser();
        localStorage.removeItem('oneTapDismissed');
        window.location.href = '/';
      } catch (err) {
        console.error('OneTap error', err);
      }
    };

    initGoogle();

    return () => {
      window.google?.accounts.id.cancel();
    };
  }, [refreshUser]);

  return null;
}









// 'use client';

// import { useEffect, useRef } from 'react';
// import { LoginService } from '@/Service/LoginService';
// import { useAuth } from '@/contexts/AuthContext';

// declare global {
//   interface Window {
//     google?: any;
//     triggerGoogleLogin?: () => void;
//   }
// }

// export default function OneTapFirebase() {
//   const { refreshUser } = useAuth();
//   const initialized = useRef(false);

//   useEffect(() => {
//     if (initialized.current) return;
//     initialized.current = true;

//     const loadScript = () =>
//       new Promise<void>((resolve) => {
//         if (window.google) return resolve();
//         const script = document.createElement('script');
//         script.src = 'https://accounts.google.com/gsi/client';
//         script.async = true;
//         script.onload = () => resolve();
//         document.body.appendChild(script);
//       });

//     const initGoogle = async () => {
//       await loadScript();

//       window.google.accounts.id.initialize({
//         client_id: '108929175956-h5vf5gogaipvg2fvlg0snu1om881gudt.apps.googleusercontent.com',
//         callback: handleOneTap,
//         auto_select: true,
//         cancel_on_tap_outside: true,
//       });

//       const dismissed = localStorage.getItem('oneTapDismissed');
//       if (!dismissed) {
//         window.google.accounts.id.prompt((notification: any) => {
//           if (notification.isDismissedMoment()) {
//             localStorage.setItem('oneTapDismissed', 'true');
//           }
//         });
//       }

//       window.triggerGoogleLogin = () => {
//         window.google.accounts.id.prompt();
//       };
//     };

//     const handleOneTap = async (response: any) => {
//       try {
//         if (!response?.credential) return;
//         await LoginService(response.credential);
//         await refreshUser(); // ✅ Reload user from backend
//         localStorage.removeItem('oneTapDismissed');
//         window.location.href = '/';
//       } catch (err) {
//         console.error('OneTap error', err);
//       }
//     };

//     initGoogle();

//     return () => {
//       window.google?.accounts.id.cancel();
//     };
//   }, [refreshUser]);

//   return null;
// }