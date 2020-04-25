import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  private URL = 'http://localhost:3000';

  constructor(private http:HttpClient) { }

  getEvents():Observable<any>{
    return this.http.get(`${this.URL}/api/events`);
  }

  getEventDetails(eventid:string):Observable<any>{
    return this.http.get(`${this.URL}/api/events/id/${eventid}`);
  }

  getJoinedEvents():Observable<any>{
    return this.http.get(`${this.URL}/api/events/joined`);
  }

  joinEvent(eventid:string):Observable<any>{
    return this.http.patch(`${this.URL}/api/events/join/${eventid}`,{_id:eventid});
  }


}
