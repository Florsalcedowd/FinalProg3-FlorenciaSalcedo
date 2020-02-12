import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Persona } from '../models/persona';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {

  miUrl = 'http://localhost:9001/api/v1/persona/';

  constructor(private http: HttpClient) { }

  getAll(): Observable<Persona[]> {
    return this.http.get<Persona[]>(this.miUrl);
  }

  getOne(id: number): Observable<Persona> {
    return this.http.get<Persona>(this.miUrl + id);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(this.miUrl + id);
  }

  post(persona: Persona): Observable<Persona> {
    return this.http.post<Persona>(this.miUrl, persona);
  }

  put(id: number, persona: Persona) {
    return this.http.put<Persona>(this.miUrl + id, persona);
  }
}
