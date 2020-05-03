// tslint:disable-next-line: eofline
import Swal from 'sweetalert2'
export const URL_MICROSERVICIOS = 'http://192.168.99.100:8090';

export const CRED_CLIENTE_MICROSERVICIOS = 'matrix-app-angular' + ':' + '12345';

export const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 4000,
    timerProgressBar: true,
    onOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  });