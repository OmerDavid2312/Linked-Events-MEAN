import { ToastrService } from 'ngx-toastr';
import { EventData } from './../../../models/Event';
import { Component, OnInit, Input } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction'; // for dateClick



@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  calendarPlugins = [dayGridPlugin,interactionPlugin];
  @Input() events: EventData[];
  eventToShow:{title:String,date:Date}[] = [];
  constructor(private toast :ToastrService) { 
   
  }

  ngOnInit() {  
    if(this.events)
    {
      for (let event of this.events) {
        this.eventToShow.push({
          title:event.name,
          date: new Date(event.eventdate)});
      }
     
    }  
  }
  handleDateClick(info){
      this.toast.info(info.event.title,new Date(info.event.start).toLocaleDateString());  
  }
 

}
