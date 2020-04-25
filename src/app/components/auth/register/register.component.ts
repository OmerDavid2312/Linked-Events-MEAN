import { AuthData } from './../../../models/Auth';
import { AuthService } from './../../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  email:string;
  password:string;
  username:string;

  user:AuthData;
  constructor(private authSrv:AuthService,private flashmessage:FlashMessagesService,private router:Router) { }

  ngOnInit() {
  }

  onSubmit(){

    if(!this.email.trim() || !this.password.trim() || !this.username.trim()){
      return this.flashmessage.show('Please fill out the form',{cssClass:'alert-danger',timeout:4000});
    }

    this.user = {email:this.email,password:this.password,name:this.username};
    this.authSrv.registerUser(this.user).subscribe(res=>{
      this.flashmessage.show('You have successfully registered',{cssClass:'alert-success text-center font-weight-bold',timeout:3000});
      setTimeout(()=>{
        this.router.navigateByUrl('/login');

      },3000);

    },err=>{
       const error =  err.error.message || err.error.errors[0]['msg'];
       this.flashmessage.show(error,{cssClass:'alert-danger text-center font-weight-bold',timeout:4000});    
      });
    
  }

}
