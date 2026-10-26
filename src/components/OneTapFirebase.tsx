'use client';

import { useEffect, useRef } from 'react';
import { LoginService } from '@/Service/LoginService';
import { useAuth } from '@/contexts/AuthContext';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
  signInWithCredential,
} from 'firebase/auth';
import '@/lib/firebase';

declare global {
  interface Window {
    google?: any;
    triggerGoogleLogin?: () => void;
  }
}

export default function OneTapFirebase() {
  const { refreshUser } = useAuth();
  const initialized = useRef(false);
  const popupInFlight = useRef(false);

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
        script.onerror = () => reject(new Error('Google script load failed'));
        document.body.appendChild(script);
      });

    // ==========================================
    // Core: Firebase authenticate + backend call
    // ==========================================
    const finishLogin = async (firebaseUser: any) => {
      const idToken = await firebaseUser.getIdToken();
      await LoginService(idToken);   // Backend ko Firebase token bhejein
      await refreshUser();
      window.location.href = '/dashboard';
    };

    // ==========================================
    // Popup login (user-initiated)
    // ==========================================
    const popupLogin = async (): Promise<boolean> => {
      if (popupInFlight.current) return false;
      popupInFlight.current = true;
      try {
        const auth = getAuth();
        const provider = new GoogleAuthProvider();
        provider.setCustomParameters({ prompt: 'select_account' });
        const result = await signInWithPopup(auth, provider);
        // ✅ Firebase already authenticated — direct getIdToken()
        await finishLogin(result.user);
        return true;
      } catch (err: any) {
        if (err?.code === 'auth/popup-closed-by-user') return true;

        if (err?.code === 'auth/popup-blocked') {
          console.warn('[Popup] Blocked → redirect');
          try {
            const auth = getAuth();
            const provider = new GoogleAuthProvider();
            provider.setCustomParameters({ prompt: 'select_account' });
            await signInWithRedirect(auth, provider);
            return true;
          } catch (redirectErr) {
            console.error('[Redirect] Failed:', redirectErr);
            return false;
          }
        }
        console.error('Popup login failed:', err);
        return false;
      } finally {
        popupInFlight.current = false;
      }
    };

    // ==========================================
    // Redirect result (popup blocked fallback)
    // ==========================================
    const checkRedirectResult = async () => {
      try {
        const result = await getRedirectResult(getAuth());
        if (result?.user) {
          await finishLogin(result.user);
        }
      } catch (err) {
        console.warn('[Redirect] getRedirectResult failed:', err);
      }
    };

    // ==========================================
    // One Tap callback
    // ==========================================
    const handleOneTap = async (response: any) => {
      try {
        if (!response?.credential) return;

        // ✅ One Tap credential se Firebase authenticate karein
        // response.credential Google ID token hai, GoogleAuthProvider accept karta hai
        const auth = getAuth();
        const credential = GoogleAuthProvider.credential(response.credential);
        const userCred = await signInWithCredential(auth, credential);
        await finishLogin(userCred.user);
      } catch (err) {
        console.error('OneTap handler failed:', err);
      }
    };

    // ==========================================
    // Init One Tap + hybrid global trigger
    // ==========================================
    const initGoogle = async () => {
      const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

      if (!clientId) {
        console.warn('[OneTap] Client ID missing → popup only');
        window.triggerGoogleLogin = popupLogin as any;
        return;
      }

      try {
        await loadScript();
      } catch (err) {
        console.warn('[OneTap] Script failed → popup only', err);
        window.triggerGoogleLogin = popupLogin as any;
        return;
      }

      try {
        window.google.accounts.id.initialize({
          client_id: clientId,
          callback: handleOneTap,
          auto_select: true,
          cancel_on_tap_outside: true,
        });
      } catch (err) {
        console.warn('[OneTap] Initialize failed → popup only', err);
        window.triggerGoogleLogin = popupLogin as any;
        return;
      }

      // Pehli visit par One Tap silently show karein
      const dismissed = localStorage.getItem('oneTapDismissed');
      if (!dismissed) {
        try {
          window.google.accounts.id.prompt((notification: any) => {
            if (notification.isDismissedMoment?.()) {
              localStorage.setItem('oneTapDismissed', 'true');
            }
          });
        } catch (e) {
          console.warn('[OneTap] prompt() failed:', e);
        }
      }

      // ---------- Hybrid global trigger ----------
      window.triggerGoogleLogin = () => {
        let oneTapHandled = false;

        try {
          window.google.accounts.id.prompt((notification: any) => {
            if (
              notification.isNotDisplayed?.() ||
              notification.isSkippedMoment?.() ||
              notification.isDismissedMoment?.()
            ) {
              console.log('[OneTap] Not displayed → popup fallback');
              popupLogin();
            }
          });
          oneTapHandled = true;
        } catch (err) {
          console.warn('[OneTap] prompt() threw → popup fallback', err);
          oneTapHandled = false;
        }

        if (!oneTapHandled) {
          popupLogin();
        }
      };
    };

    checkRedirectResult();
    initGoogle();

    return () => {
      try {
        window.google?.accounts.id.cancel();
      } catch {}
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
//       new Promise<void>((resolve, reject) => {
//         if (window.google) return resolve();
//         const script = document.createElement('script');
//         script.src = 'https://accounts.google.com/gsi/client';
//         script.async = true;
//         script.onload = () => resolve();
//         script.onerror = () => reject(new Error('Failed to load Google Identity script'));
//         document.body.appendChild(script);
//       });

//     const initGoogle = async () => {
//       const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

//       if (!clientId) {
//         console.error(
//           '[OneTap] NEXT_PUBLIC_GOOGLE_CLIENT_ID is missing. ' +
//           'Add it to .env.local and restart the dev server.'
//         );
//         return;
//       }

//       try {
//         await loadScript();
//       } catch (err) {
//         console.error('[OneTap] Google script failed to load', err);
//         return;
//       }

//       window.google.accounts.id.initialize({
//         client_id: clientId,
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
//         await refreshUser();
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









// // 'use client';

// // import { useEffect, useRef } from 'react';
// // import { LoginService } from '@/Service/LoginService';
// // import { useAuth } from '@/contexts/AuthContext';

// // declare global {
// //   interface Window {
// //     google?: any;
// //     triggerGoogleLogin?: () => void;
// //   }
// // }

// // export default function OneTapFirebase() {
// //   const { refreshUser } = useAuth();
// //   const initialized = useRef(false);

// //   useEffect(() => {
// //     if (initialized.current) return;
// //     initialized.current = true;

// //     const loadScript = () =>
// //       new Promise<void>((resolve) => {
// //         if (window.google) return resolve();
// //         const script = document.createElement('script');
// //         script.src = 'https://accounts.google.com/gsi/client';
// //         script.async = true;
// //         script.onload = () => resolve();
// //         document.body.appendChild(script);
// //       });

// //     const initGoogle = async () => {
// //       await loadScript();

// //       window.google.accounts.id.initialize({
// //         client_id: '108929175956-h5vf5gogaipvg2fvlg0snu1om881gudt.apps.googleusercontent.com',
// //         callback: handleOneTap,
// //         auto_select: true,
// //         cancel_on_tap_outside: true,
// //       });

// //       const dismissed = localStorage.getItem('oneTapDismissed');
// //       if (!dismissed) {
// //         window.google.accounts.id.prompt((notification: any) => {
// //           if (notification.isDismissedMoment()) {
// //             localStorage.setItem('oneTapDismissed', 'true');
// //           }
// //         });
// //       }

// //       window.triggerGoogleLogin = () => {
// //         window.google.accounts.id.prompt();
// //       };
// //     };

// //     const handleOneTap = async (response: any) => {
// //       try {
// //         if (!response?.credential) return;
// //         await LoginService(response.credential);
// //         await refreshUser(); // ✅ Reload user from backend
// //         localStorage.removeItem('oneTapDismissed');
// //         window.location.href = '/';
// //       } catch (err) {
// //         console.error('OneTap error', err);
// //       }
// //     };

// //     initGoogle();

// //     return () => {
// //       window.google?.accounts.id.cancel();
// //     };
// //   }, [refreshUser]);

// //   return null;
// // }