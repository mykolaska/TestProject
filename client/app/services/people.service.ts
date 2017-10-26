import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class PeopleService {

  private headers = new Headers({ 'Content-Type': 'application/json', 'charset': 'UTF-8' });
  private options = new RequestOptions({ headers: this.headers });

  constructor(private http: Http) { }

  getPeople(): Observable<any> {
    return this.http.get('/api/people').map(res => res.json());
  }

  addPerson(person): Observable<any> {
    return this.http.post('/api/people', JSON.stringify(person), this.options);
  }

  getPerson(person): Observable<any> {
    return this.http.get(`/api/people/${person._id}`).map(res => res.json());
  }

  editPerson(person): Observable<any> {
    return this.http.put(`/api/people/${person._id}`, JSON.stringify(person), this.options);
  }

  deletePerson(person): Observable<any> {
    return this.http.delete(`/api/people/${person._id}`);
  }

}
