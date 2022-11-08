import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  type: string = 'password';
  istext: boolean = false;
  eyeIcon: String = 'fa-eye-slash';
  signUpForm!: FormGroup;
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.signUpForm = this.fb.group({
      primeiroNome: ['', Validators.required],
      sobrenome: ['', Validators.required],
      usuario: ['', Validators.required],
      email: ['', Validators.required],
      senha: ['', Validators.required],
    });
  }

  hideShowPass() {
    this.istext = !this.istext;
    this.istext ? (this.eyeIcon = 'fa-eye') : (this.eyeIcon = 'fa-eye-slash');
    this.istext ? (this.type = 'text') : (this.type = 'password');
  }
  onSingup(){
    if(this.signUpForm.valid){
      console.log(this.signUpForm.value)
    } else{
      this.validadeAllformFileds(this.signUpForm)

    }
  }
  private validadeAllformFileds(formGroup: FormGroup){
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if(control instanceof FormControl){
        control.markAsDirty({onlySelf:true})
      } else if(control instanceof FormGroup){
        this.validadeAllformFileds(control)
      }

    })

  }
}
