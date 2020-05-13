import { AuthService } from './../../../services/auth.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { EventData } from './../../../models/Event';
import { EventsService } from './../../../services/events.service';
import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-joined-events',
  templateUrl: './joined-events.component.html',
  styleUrls: ['./joined-events.component.css']
})
export class JoinedEventsComponent implements OnInit {

  joinedEvents:EventData[] = [];
  isFetched:boolean =false
  nowDate:Date = new Date();
  
  constructor(private eventSrv:EventsService,private spinner: NgxSpinnerService,private flashmessage:FlashMessagesService,private router:Router,private authSrv:AuthService) { }

  ngOnInit() {
    this.isFetched=false;
    this.spinner.show();
    this.eventSrv.getJoinedEvents().subscribe(joinedEvents=>{
      this.joinedEvents = joinedEvents;
      this.isFetched = true;
      this.spinner.hide();
    },err=>{
     //unauthorized
      if(err.status == 401)
      {
        this.authSrv.logout();
        this.router.navigateByUrl('/login');
        this.spinner.hide();
        return;
      }
      this.isFetched = true;
      this.spinner.hide();
      const error =  err.error.message || err.error.errors[0]['msg'];
      this.flashmessage.show(error,{cssClass:'alert-danger text-center font-weight-bold',timeout:4000});  
    })
  }
  getDate(date:string){
    
    return new Date(date);
    
  }

}
