import { AbstractControl, ValidatorFn } from '@angular/forms';

export function passwordsMatch(control: AbstractControl): { [key: string]: string } | null {
  if ((control.dirty || control.touched) && control.get('pwd').value === control.get('confirm').value) {
    return null;
  }

  return { custom: `Passwords don't match` };
}

export function passwordFormat(control: AbstractControl): { [key: string]: string } | null {
  const symbol = RegExp(/[-!$%^&*()_+|~=`:";'<>?,.\/]/, 'i');
  const num = RegExp(/[a-zA-Z]/, 'i');
  const letter = RegExp(/[0-9]/, 'i');

  if (num.test(control.value) && symbol.test(control.value) && letter.test(control.value)) {
    return null;
  }

  return { passwordFormat: 'Should consist of characters, symbols and numbers' };
}

export function emailMatch(control: AbstractControl): { [key: string]: string } | null {

  const pattern = new RegExp(/.+\@.+\..+/, 'i');

  if (pattern.test(control.value)) {
    return null;
  }

  return { custom: `Invalid Email Address` };
}

// export function passwordsMatch(params: any): ValidatorFn {
//   console.log(params);
//   return (control: AbstractControl): { [key: string]: boolean } | null => {
//     if ((control.dirty || control.touched) && control.get('pws').value === control.get('confirm').value) {
//       console.log('valid...');
//       return null;
//     }
//   };
// }
