import { MyEventsService } from './../../../services/my-events.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { EventData } from './../../../models/Event';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-manage-event',
  templateUrl: './manage-event.component.html',
  styleUrls: ['./manage-event.component.css']
})
export class ManageEventComponent implements OnInit {

  event:EventData;
  precent:number;
  id:string;

  constructor(private myeventSrv:MyEventsService,private spinner: NgxSpinnerService,private router:Router,private route:ActivatedRoute,private flashmessage:FlashMessagesService) { }


  ngOnInit() {
    this.spinner.show();
    this.id = this.route.snapshot.paramMap.get('id');
    this.myeventSrv.getCreatedEventById(this.id).subscribe(event=>{
      this.event = event;
      this.precent = event.participants.length > 0?Math.floor((event.participants.length/event.maxparticipants)*100) : 0;
      setTimeout(()=>{
        this.spinner.hide();

      },1000)
     
      
    },err=>{
      this.spinner.hide();
      const error =  err.error.message || err.error.errors[0]['msg'];
      this.flashmessage.show(error,{cssClass:'alert-danger text-center font-weight-bold',timeout:4000});  
      setTimeout(()=>{
        this.router.navigateByUrl('/myevents');
      },4001)
    })
  }

}
