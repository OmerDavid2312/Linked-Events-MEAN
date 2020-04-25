import { Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  username:string
  constructor(private auth_srv:AuthService,private router:Router) { 
    this.username = localStorage.getItem('user');
  }

  ngOnInit() {
  }

  logout(){
    this.auth_srv.logout();
    this.router.navigateByUrl('/login');
  }

}
