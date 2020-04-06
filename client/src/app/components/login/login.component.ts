import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public router: Router, public loginService: LoginService) { }
  user = {
    email:  '',
    password: ''
  };
  ngOnInit(): void {
  }

  // login(form: NgForm){
  //   this.loginService.postLogin(form.value)
  //   .subscribe(res  =>{
  //     console.log('losvalues');
  //     console.log(form.value);
  //     let data = JSON.stringify(res);
  //     let dataLogin = JSON.parse(data);
  //     console.log(dataLogin.User);
  //     console.log(data);
  //     console.log(res);
  //     // this.router.navigate(['/main/home']);
  //     console.log(Object.keys(res));
  //     if (dataLogin.UserEmail){
  //       this.router.navigate(['/main/home']);
  //     }else{
  //       console.log('Error not found');
        
  //     }
 
      
  //   })
  // }

  login(){
    this.loginService.postLogin(this.user)
    .subscribe(res =>{
      console.log(res);
      let data = JSON.stringify(res);
      let dataJson = JSON.parse(data);
      localStorage.setItem('token', dataJson.token)
      if(dataJson.token){
        this.router.navigate(['/main/home']);
      }else{
        console.log('Something was wrong :(');
        
      }
      

      
    },
    err =>console.log(err)
    )
    
  }


}
