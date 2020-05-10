import { Subscription } from 'rxjs';
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
  
  subRoute:Subscription;
  subEvents:Subscription;

  id:string;
  events:EventData[];
  isFetched:boolean=false;
  //paging
  page:number = 1;
  totalItem:number;

  paramCheck1:string = null;
  
  
  constructor(private eventSrv:EventsService,private spinner: NgxSpinnerService,private flashmessage:FlashMessagesService,private authSrv:AuthService,private route:ActivatedRoute,private router:Router) { }

  ngOnInit() {
    this.getEvents();
  }

  getEvents(){
        
        //detect for change in categoryID
        this.subRoute = this.route.params.subscribe(params => {
          
          this.spinner.show();
          //check paging if past category is not euqal to new category = need to change the page back to 1 !
          if(this.paramCheck1 !== null && this.paramCheck1 !== params['id']){
            this.page = 1;
               
          }

          this.id =  params['id'];
          this.paramCheck1 = this.id;
  
          this.subEvents = this.eventSrv.getEventsByCategory(this.id,this.page).subscribe(events=>{
            this.events = events.data;
            this.totalItem = events.count;      
            console.log('sub!');
                
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

  pageChanged(e){
    this.page = e; 
    //unsubscribe
    this.subEvents.unsubscribe();
    this.subRoute.unsubscribe();
    this.getEvents();    
  }

}
