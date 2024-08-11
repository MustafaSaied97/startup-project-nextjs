import { toast } from 'react-toastify';
export function notify(message, options) {
  toast(message, {
    type: 'info',
    theme: 'colored',
    position: 'top-right',
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    // transition: 'Bounce',

    ...options,
  });
}
