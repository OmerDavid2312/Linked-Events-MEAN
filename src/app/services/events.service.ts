import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  

  constructor(private http:HttpClient) { }

  getEvents():Observable<any>{
    return this.http.get(`/api/events`);
  }

  getNewEvents():Observable<any>{
    return this.http.get(`/api/events/new`);
  }

  getEventsBasedProfile():Observable<any>{
    return this.http.get(`/api/events/basedProfile`);
  }
  

  getEventsByCategory(categoryID:string,currentPage:number):Observable<any>{
     
    return this.http.get(`/api/events/category/${categoryID}/${currentPage}`);
  }

  getPopularEvents():Observable<any>{
    return this.http.get(`/api/events/popular`);
  }

  getEventDetails(eventid:string):Observable<any>{
    return this.http.get(`/api/events/id/${eventid}`);
  }

  getJoinedEvents():Observable<any>{
    return this.http.get(`/api/events/joined`);
  }

  joinEvent(eventid:string):Observable<any>{
    return this.http.patch(`/api/events/join/${eventid}`,{_id:eventid});
  }

  formatDate(date:string){
    return new Date(date).toLocaleString();
  }


}
