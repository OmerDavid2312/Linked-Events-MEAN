import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { EventData } from './../models/Event';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class MyEventsService {

  private URL = 'http://localhost:3000';

  constructor(private http:HttpClient) { }

  postEvent(newevent:EventData):Observable<any>{
    return this.http.post(`${this.URL}/api/myevents/`,newevent);
  }

  getCreatedEvents():Observable<any>{
    return this.http.get(`${this.URL}/api/myevents/`);
  }

  getCreatedEventById(eventID:string):Observable<any>{
    return this.http.get(`${this.URL}/api/myevents/${eventID}`);
  }

  deleteEventById(eventID:string):Observable<any>{
    return this.http.delete(`${this.URL}/api/myevents/${eventID}`);
  }

  updateEventById(eventID:string,updatedEvent:EventData):Observable<any>{
    return this.http.patch(`${this.URL}/api/myevents/${eventID}`,updatedEvent);
  }
}
