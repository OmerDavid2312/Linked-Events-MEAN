import { CategoriesService } from './../../../services/categories.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { MyEventsService } from './../../../services/my-events.service';
import { EventData } from './../../../models/Event';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-post-event',
  templateUrl: './post-event.component.html',
  styleUrls: ['./post-event.component.css']
})
export class PostEventComponent implements OnInit {
  
  newEvent:EventData;
  categories:any;
  
  name:string;
  description:string;
  maxparticipants:number
  category:string
  eventdate:Date


  constructor(private myeventSrv:MyEventsService,private categoriesSrv:CategoriesService,private spinner: NgxSpinnerService,private router:Router,private route:ActivatedRoute,private flashmessage:FlashMessagesService) { }

  ngOnInit() {
    this.spinner.show()
    this.categoriesSrv.getCategories().subscribe(categories=>{
      this.categories = categories;
      this.spinner.hide();
    })
  }

  onSubmit(){
    
    if(!this.name || !this.description || !this.eventdate || !this.maxparticipants || !this.category)
    { 
      return this.flashmessage.show('Please fill out the form',{cssClass:'alert-danger',timeout:4000});
    }

    this.newEvent = { name:this.name, description:this.description, maxparticipants:this.maxparticipants, category:this.category, eventdate:new Date(this.eventdate)  }
    this.spinner.show();
    this.myeventSrv.postEvent(this.newEvent).subscribe(res=>{
      this.spinner.hide();
      this.flashmessage.show('Event successfully added',{cssClass:'alert-success text-center font-weight-bold',timeout:1999});
      setTimeout(()=>{
        this.router.navigateByUrl('/myevents');

      },2000);

    },err=>{
      this.spinner.hide();
       const error =  err.error.message || err.error.errors[0]['msg'];
       this.flashmessage.show(error,{cssClass:'alert-danger text-center font-weight-bold',timeout:4000});    
      });
    

  }

}
