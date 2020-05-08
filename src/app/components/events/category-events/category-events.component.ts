import { EventData } from './../../../models/Event';
import { AuthService } from './../../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { NgxSpinnerService } from 'ngx-spinner';
import { EventsService } from './../../../services/events.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-category-events',
  templateUrl: './category-events.component.html',
  styleUrls: ['./category-events.component.css']
})
export class CategoryEventsComponent implements OnInit {
  id:string;
  events:EventData[];
  isFetched:boolean=false;

  constructor(private eventSrv:EventsService,private spinner: NgxSpinnerService,private flashmessage:FlashMessagesService,private authSrv:AuthService,private route:ActivatedRoute,private router:Router) { }

  ngOnInit() {
    //detect for change in categoryID
    this.route.params.subscribe(params => {
      this.spinner.show();
      this.id =  params['id'];
      this.eventSrv.getEventsByCategory(this.id).subscribe(events=>{
        this.events = events;
        this.spinner.hide();
        this.isFetched = true;
        
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
  });
  }

}
