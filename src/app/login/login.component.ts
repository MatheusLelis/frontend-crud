import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loading = false

  constructor(
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    private httpClient: HttpClient,
    private router: Router
  ) {

    this.loginForm = this.formBuilder.group({
      login: ['', Validators.required],
      senha: ['', Validators.required]
    })

  }

  login(login: string, senha: string){
    return this.httpClient.post(`${environment.url}/usuarios/login`, {
      login,
      senha
    })
  }

  ngOnInit(): void {
  }

  onSubmit() {
    console.log(this.loginForm.value);
    this.loading = true
    this.login(this.loginForm.value.login, this.loginForm.value.senha).subscribe((retornoLogin: any) => {
      this.loading = false
      console.log("retornoLogin = ", retornoLogin)
      if(retornoLogin.erro){
        this.openSnackBar(retornoLogin.msg)
      }else{
        this.router.navigate(['listagem'])
      }
    })
  }

  recuperarSenha(){
    console.log("rcuperar senha")
  }

  openSnackBar(mensagem: string) {

    const config: MatSnackBarConfig = {
      duration: 5000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: 'snack'
    }

    this._snackBar.open(mensagem, '', config);
  }

}
