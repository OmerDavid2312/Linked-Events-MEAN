import { Router } from '@angular/router';
import { AuthService } from './../../../services/auth.service';
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
  
  popularEvents:EventData[];
  newEvents:EventData[];
  eventsBasedProfile:EventData[];

  newisFetched:boolean=false;
  popularisFetched:boolean=false;
  basedProfileisFetched:boolean= false;

  constructor(private eventSrv:EventsService,private spinner: NgxSpinnerService,private flashmessage:FlashMessagesService,private authSrv:AuthService,private router:Router) { }

   ngOnInit() {
    this.getPopularEvents();
    this.getNewEvents();
    this.getEventsBasedProfile();
    }
   getNewEvents(){
      this.newisFetched=false;
      this.spinner.show();
      this.eventSrv.getNewEvents().subscribe(newEvents=>{
        this.newEvents=newEvents;    
        this.spinner.hide();
        this.newisFetched =true;
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
      });
   }

   getPopularEvents(){
      this.popularisFetched=false;
      this.spinner.show();
      this.eventSrv.getPopularEvents().subscribe(popularEvents=>{
        this.popularEvents=popularEvents; 
        this.spinner.hide();
        this.popularisFetched =true;
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
      });
   }
   
   getEventsBasedProfile(){
    this.basedProfileisFetched=false;
    this.spinner.show();
    this.eventSrv.getEventsBasedProfile().subscribe(eventsBasedProfile=>{
      this.eventsBasedProfile=eventsBasedProfile; 
      this.spinner.hide();
      this.basedProfileisFetched =true;
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
        
    });

   }


  }

  

 





