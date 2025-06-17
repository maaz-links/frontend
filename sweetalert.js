// src/utils/sweetalert.js
import Swal from 'sweetalert2';

const CustomSwal = Swal.mixin({
  customClass: {
    confirmButton: 'my-confirm-button',
    cancelButton: 'my-cancel-button',
    popup: 'my-swal-popup',
  },
  buttonsStyling: false, // disables default styling
});

export default CustomSwal;
