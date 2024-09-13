import Swal from 'sweetalert2'


export const ENV = {
    baseURL: import.meta.env.VITE_BASE_URL,
    storeAdminData: (data) => {
        localStorage.setItem('token', data?.token)
        localStorage.setItem('adminData', JSON.stringify(data?.existingAdmin))
    },
    showAlert: (title, text, icon, showCancelButton, confirmButtonText, cancelButtonText) => {
       return Swal.fire({ title, text, icon, showCancelButton, confirmButtonText, cancelButtonText })
    }
}