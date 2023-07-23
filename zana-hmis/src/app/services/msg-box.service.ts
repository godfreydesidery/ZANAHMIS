import { Injectable } from '@angular/core';
import swal from 'sweetalert2';


@Injectable({
  providedIn: 'root'
})
export class MsgBoxService {

  constructor() { }

  public showSuccessMessage(message : string){
    swal.fire({
      icon: 'info',
      title: 'Success',
      text: message
    })
  }

  public showErrorMessage(message : string){
    swal.fire({
      icon: 'error',
      title: 'Error',
      text: message
    })
  }
}
