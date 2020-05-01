import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidatorsService {

  constructor() { }


  samePasswordValidator(pass1: string, pass2: string){

    return (formGroup: FormGroup) => {
      const pass1ctrl = formGroup.controls[pass1];
      const pass2ctrl = formGroup.controls[pass2];

      if (pass1ctrl.value === pass2ctrl.value){
          pass2ctrl.setErrors(null);
      } else {
        pass2ctrl.setErrors({notSame: true});
      }
    }
  }

}
