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
  
  constructor(private eventSrv:EventsService,private spinner: NgxSpinnerService,private flashmessage:FlashMessagesService) { }

  ngOnInit() {
    this.isFetched=false;
    this.spinner.show();
    this.eventSrv.getJoinedEvents().subscribe(joinedEvents=>{
      this.joinedEvents = joinedEvents;
      this.isFetched = true;
      setTimeout(()=>{
        this.spinner.hide();
      },700)

    },err=>{
      this.isFetched = true;
      this.spinner.hide();
      const error =  err.error.message || err.error.errors[0]['msg'];
      this.flashmessage.show(error,{cssClass:'alert-danger text-center font-weight-bold',timeout:4000});  
    })
  }

}
