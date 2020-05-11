import { AuthService } from './../../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { CategoriesService } from './../../../services/categories.service';
import { MyEventsService } from './../../../services/my-events.service';
import { Component, OnInit } from '@angular/core';
import { EventData } from './../../../models/Event';


@Component({
  selector: 'app-edit-event',
  templateUrl: './edit-event.component.html',
  styleUrls: ['./edit-event.component.css']
})
export class EditEventComponent implements OnInit {

  event:EventData;
  _id :string;
  name:string;
  description:string;
  maxparticipants:number;
  eventdate:Date;
  category:string;
  link:string;
  participants:number;

  categories:string;
  isFetched:boolean = false;
  id:string;

  constructor(private myeventSrv:MyEventsService,private categoriesSrv:CategoriesService,private spinner: NgxSpinnerService,private router:Router,private route:ActivatedRoute,private flashmessage:FlashMessagesService,private authSrv:AuthService) { }

  ngOnInit() {
    this.spinner.show()
    this.isFetched = false;
    //get categories
    this.categoriesSrv.getCategories().subscribe(categories=>{
      this.categories = categories;
    })
    this.id = this.route.snapshot.paramMap.get('id');
    //get event data
    this.myeventSrv.getCreatedEventById(this.id).subscribe(event=>{
      this.flashmessage.show('Edit ' + event.name,{cssClass:'alert-success text-center font-weight-bold',timeout:2000});

      this._id = event._id;
      this.name = event.name;
      this.description = event.description;
      this.maxparticipants = event.maxparticipants;
      this.category = event.category._id;
      this.link = event.link;
      this.eventdate = new Date(event.eventdate);
      this.participants = event.participants.length;

      this.isFetched =true;
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
      //cant find event
      if(err.status == 404)
      {
        this.flashmessage.show('Cant find this event',{cssClass:'alert-danger text-center font-weight-bold',timeout:2000});
        setTimeout(()=>{
          this.router.navigateByUrl('/myevents');
        },2001);
        return;   
      }
      //error retrive event
      const error =  err.error.message || err.error.errors[0]['msg'];
      this.flashmessage.show(error,{cssClass:'alert-danger text-center font-weight-bold',timeout:2000}); 
      setTimeout(()=>{
        this.router.navigateByUrl('/myevents');
      },2001); 
        
      });
  }

  onSubmit(){
    
    if(!this.name || !this.description || !this.eventdate || !this.maxparticipants || !this.category)
    { 
      return this.flashmessage.show('Please fill out the form',{cssClass:'alert-danger text-center font-weight-bold',timeout:4000});
    }
    if(this.maxparticipants< this.participants )
    {
      return this.flashmessage.show(`Already have ${this.participants} in the event, You cant set number of  max participants below ! `,{cssClass:'alert-danger text-center font-weight-bold',timeout:4000});

    }
    this.event = { name:this.name, description:this.description, maxparticipants:this.maxparticipants, category:this.category,link:this.link, eventdate:new Date(this.eventdate)  }
    
    this.spinner.show();

    this.myeventSrv.updateEventById(this._id,this.event).subscribe(isUpdated=>{
      this.spinner.hide();
      if(isUpdated)
      {
        this.flashmessage.show('Event successfully updated',{cssClass:'alert-success text-center font-weight-bold',timeout:2000});
        setTimeout(()=>{
          this.router.navigateByUrl('/myevents');
        },2001);
      }
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
      this.flashmessage.show(error,{cssClass:'alert-danger text-center font-weight-bold',timeout:2000});
    })
  }

  

}
