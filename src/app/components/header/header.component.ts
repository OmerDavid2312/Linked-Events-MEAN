import { EventData } from './../../models/Event';
import { EventsService } from './../../services/events.service';
import { Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { ToastrService } from 'ngx-toastr';

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  username:string
  isFetched:boolean = false;
  NotficationEvents:EventData[] = [];
  nowDate:string = new Date().toLocaleDateString();
  
  constructor(private auth_srv:AuthService,private router:Router,private eventSrv:EventsService,private toastSrv:ToastrService) { 
    this.username = localStorage.getItem('user');
    
  }

  ngOnInit() {
    this.getNotfications();
  }

  logout(){
    this.auth_srv.logout();
    this.router.navigateByUrl('/login');
  }

  getNotfications(){
    this.isFetched = false

    this.eventSrv.getJoinedEvents().subscribe(joinedEvents=>{
      joinedEvents.map(res=>{
        //check if one of the joined today is today
        if(this.nowDate == new Date(res.eventdate).toLocaleDateString())
        {
          this.NotficationEvents.push(res);
        }
         
      });
      this.isFetched = true
    })
  }
  showNotfications(){
    
    if(this.NotficationEvents.length == 0)
    {
      this.toastSrv.info('You are not attending any events today','No Notfications');
    }
    else if( this.NotficationEvents.length == 1)
    {
      this.toastSrv.info(`You are attending in ${this.NotficationEvents.length} Event today !`,`${this.NotficationEvents.length} Notfications`);
    }
    else
    {
      this.toastSrv.info(`You are attending in ${this.NotficationEvents.length} Event today !`,`${this.NotficationEvents.length} Notfications`);
    }
  }


}
