import { AuthService } from './../../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { EventData } from './../../../models/Event';
import { Router, ActivatedRoute } from '@angular/router';
import { EventsService } from './../../../services/events.service';
import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.css']
})
export class EventDetailComponent implements OnInit {

  event:EventData;
  id:string;
  precent:number;
  constructor(private eventSrv:EventsService,private spinner: NgxSpinnerService,private router:Router,private route:ActivatedRoute,private flashmessage:FlashMessagesService,private authSrv:AuthService) { }

  ngOnInit() {
    this.spinner.show();
    this.id = this.route.snapshot.paramMap.get('id');
    this.eventSrv.getEventDetails(this.id).subscribe(event=>{
      this.event = event;
      this.precent = event.participants.length > 0?Math.floor((event.participants.length/event.maxparticipants)*100) : 0;
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
      this.spinner.hide();
      const error =  err.error.message || err.error.errors[0]['msg'];
      this.flashmessage.show(error,{cssClass:'alert-danger text-center font-weight-bold',timeout:3000});
      setTimeout(()=>{
        this.router.navigateByUrl('/');
      },3000)  
    })
  }

  joinEvent(eventId:string){
    this.spinner.show();
    this.eventSrv.joinEvent(eventId).subscribe(isJoined=>{
      this.spinner.hide();
      if(isJoined)
      {
        this.flashmessage.show('You are joined the event',{cssClass:'alert-success text-center font-weight-bold',timeout:4000});
      }
    },err=>{
      this.spinner.hide();
      const error =  err.error.message || err.error.errors[0]['msg'];
      this.flashmessage.show(error,{cssClass:'alert-danger text-center font-weight-bold',timeout:4000});  
    })
  }

}
