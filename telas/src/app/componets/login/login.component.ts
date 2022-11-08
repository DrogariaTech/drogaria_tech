import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { fromEventPattern } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  type: string = 'password';
  istext: boolean = false;
  eyeIcon: String = 'fa-eye-slash';
  loginForm!: FormGroup;
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
     username:['', Validators.required],
     password:['', Validators.required]

    });
  }

  hideShowPass() {
    this.istext = !this.istext;
    this.istext ? (this.eyeIcon = 'fa-eye') : (this.eyeIcon = 'fa-eye-slash');
    this.istext ? (this.type = 'text') : (this.type = 'password');
  }
  onSubmit(){
    if(this.loginForm.valid){
      console.log(this.loginForm.value)
      //enviar usuario para banco de dados
    }
    else{
      console.log("Formato não validado")
      //tipo de formato não valido
      alert("Formato é invalido")

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
