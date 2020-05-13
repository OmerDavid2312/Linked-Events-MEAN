import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { EventData } from './../models/Event';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class MyEventsService {

  

  constructor(private http:HttpClient) { }

  postEvent(newevent:EventData):Observable<any>{
    return this.http.post(`/api/myevents/`,newevent);
  }

  getCreatedEvents():Observable<any>{
    return this.http.get(`/api/myevents/`);
  }

  getCreatedEventById(eventID:string):Observable<any>{
    return this.http.get(`/api/myevents/${eventID}`);
  }

  deleteEventById(eventID:string):Observable<any>{
    return this.http.delete(`/api/myevents/${eventID}`);
  }

  updateEventById(eventID:string,updatedEvent:EventData):Observable<any>{
    return this.http.patch(`/api/myevents/${eventID}`,updatedEvent);
  }

  formatDate(date:string){
    return new Date(date).toLocaleString();
  }
}
