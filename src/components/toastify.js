import { toast, Bounce } from 'react-toastify';

function toastSuccess(message) {
  return toast.success(message, {
    position: "top-right",
    autoClose: 2500,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    transition: Bounce,
  })
}

function toastError(message) {
  return toast.error(message, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    transition: Bounce,
  })
}

function toastInfo(message) {
   return toast.info(message, {
    position: "top-right",
    // autoClose: 2500,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    transition: Bounce,
  })
}

export { toastSuccess, toastError, toastInfo }
