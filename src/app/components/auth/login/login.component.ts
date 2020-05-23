import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from './../../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import {AuthData} from '../../../models/Auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email:string;
  password:string;

  user:AuthData;
  constructor(private flashmessage:FlashMessagesService,private authSrv:AuthService,private router:Router,private spinner:NgxSpinnerService) { }

  ngOnInit() {
  }


  onSubmit(){
    if(!this.email.trim() || !this.password.trim()){
      return this.flashmessage.show('Please fill out the form',{cssClass:'alert-danger',timeout:4000});
    }
    if(this.password.trim().length <5)
    {
      return this.flashmessage.show('password must containt at least 5 characters',{cssClass:'alert-danger text-center font-weight-bold',timeout:4000});
    }
    this.spinner.show();

    this.user = {email:this.email,password:this.password};
    this.authSrv.loginUser(this.user).subscribe(res=>{
      //store token
      localStorage.setItem('token',res.token);
      //store username
      localStorage.setItem('user',res.user);
      this.spinner.hide();
      
      this.flashmessage.show('You have successfully logged in',{cssClass:'alert-success text-center font-weight-bold',timeout:2000});
      setTimeout(()=>{
        this.router.navigateByUrl('/');

      },2000);

    },err=>{
       const error =  err.error.message || err.error.errors[0]['msg'];
       this.flashmessage.show(error,{cssClass:'alert-danger text-center font-weight-bold',timeout:4000});
       this.spinner.hide();    
      });
    
  }

}
