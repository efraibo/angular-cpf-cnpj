import { Directive, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[formControlName][appCpfCnpjMask]',
})
export class MaskDirective {

  constructor(public ngControl: NgControl) { }

  @HostListener('ngModelChange', ['$event'])
  onModelChange(event) {
    this.onInputChange(event, false);
  }

  @HostListener('keydown.backspace', ['$event'])
  keydownBackspace(event) {
    this.onInputChange(event.target.value, true);
  }  

  onInputChange(event, backspace) {
    let newVal = event.replace(/\D/g, '');
    //if (backspace && newVal.length <= 6) {
    //  newVal = newVal.substring(0, newVal.length - 1);
    //}

    //^\d{3}\.?\d{3}\.?\d{3}\-?\d{2}$ -> CPF
    //^\d{2}\.?\d{3}\.?\d{3}\/?\d{4}\-?\d{2}$ -> CNPJ
    if (newVal.length === 0) {
      newVal = '';
    } else if (newVal.length < 4) {
      newVal = newVal.replace(/^(\d{0,3})/, '$1.');
    } else if (newVal.length < 7) {
      newVal = newVal.replace(/^(\d{0,3})(\d{0,3})/, '$1.$2.');    
    } else if (newVal.length < 12 ) {
      newVal = newVal.replace(/^(\d{0,3})(\d{0,3})(\d{0,3})(\d{0,2})$/, '$1.$2.$3-$4');
    } else if (newVal.length < 12 ) {
      newVal = newVal.replace(/^(\d{0,3})(\d{0,3})(\d{0,3})(\d{0,2})$/, '$1.$2.$3-$4');
    } else if (newVal.length < 13) {
      newVal = newVal.replace(/^(\d{0,2})(\d{0,3})(\d{0,3})(\d{0,4})$/, '$1.$2.$3/$4');
    } else if (newVal.length < 15) {
      newVal = newVal.replace(/^(\d{0,2})(\d{0,3})(\d{0,3})(\d{0,4})(\d{0,2})$/, '$1.$2.$3/$4-$5');
    }
    this.ngControl.valueAccessor.writeValue(newVal);
  }
}
