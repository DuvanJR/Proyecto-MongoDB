import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../env/enviroment';
import { CommentsModel } from '../models/comments';

@Injectable({
  providedIn: 'root'
})
export class UniversityServiceService {
  private apiLocal: string | undefined = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getUniversity():Observable<any>{
    const url = `${this.apiLocal}/universities`;
    return this.http.get(url);
  }
  getcomments(id:number):Observable<any>{
    const url = `${this.apiLocal}/comments/${id}`;
    return this.http.get(url);
  }
  postComments(formData:any):Observable<any>{
    const url = `${this.apiLocal}/comments`;
    return this.http.post(url,formData);
  }
}
