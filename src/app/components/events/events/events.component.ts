import { FlashMessagesService } from 'angular2-flash-messages';
import { EventData } from './../../../models/Event';
import { EventsService } from './../../../services/events.service';
import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {
  
  events:EventData[];
  isFetched:boolean=false;
  
  constructor(private eventSrv:EventsService,private spinner: NgxSpinnerService,private flashmessage:FlashMessagesService) { }

  ngOnInit() {
    this.isFetched=false;
    this.spinner.show();
    this.eventSrv.getEvents().subscribe(events=>{
      this.events=events;  
      this.spinner.hide();
      this.isFetched =true;
    },err=>{
      this.spinner.hide();
      const error =  err.error.message || err.error.errors[0]['msg'];
      this.flashmessage.show(error,{cssClass:'alert-danger text-center font-weight-bold',timeout:4000});  
    })
  }

  



}
