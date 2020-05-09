import { AuthService } from './../../../services/auth.service';
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
  isFetched:boolean = false;

  constructor(private myeventSrv:MyEventsService,private spinner: NgxSpinnerService,private router:Router,private route:ActivatedRoute,private flashmessage:FlashMessagesService,private authSrv:AuthService) { }


  ngOnInit() {
    this.isFetched = false;
    this.spinner.show();
    this.id = this.route.snapshot.paramMap.get('id');
    this.myeventSrv.getCreatedEventById(this.id).subscribe(event=>{
      this.event = event;
      this.precent = event.participants.length > 0?Math.floor((event.participants.length/event.maxparticipants)*100) : 0;
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
      this.spinner.hide();
      const error =  err.error.message || err.error.errors[0]['msg'];
      this.flashmessage.show(error,{cssClass:'alert-danger text-center font-weight-bold',timeout:4000});  
      setTimeout(()=>{
        this.router.navigateByUrl('/myevents');
      },4001)
    })
  }

}
