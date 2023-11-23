import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../env/enviroment';

@Injectable({
  providedIn: 'root'
})
export class UniversityServiceService {
  private apiLocal: string | undefined = environment.apiUrl;

  constructor(private http: HttpClient) { }

  //Obtener todas las universidades
  getUniversity():Observable<any>{
    const url = `${this.apiLocal}/universities`;
    return this.http.get(url);
  }

  getUniversityByCity(city: string): Observable<any> {
    const url = `${this.apiLocal}/universitiesByCity/${city}`;
    return this.http.get(url);
  }

  //Conteo de las visitas por id de universidad
  getVisitsById(idUniversity: number): Observable<any> {
    const url = `${this.apiLocal}/universities/${idUniversity}/visits`;
    return this.http.get(url);
  }

  //Obtener los comentarios por id de universidad
  getcomments(id:number):Observable<any>{
    const url = `${this.apiLocal}/comments/${id}`;
    return this.http.get(url);
  }
  
  //Enviar los comentarios que se crean
  postComments(formData:any):Observable<any>{
    const url = `${this.apiLocal}/comments`;
    return this.http.post(url,formData);
  }

  //Se encarga de cambiar el estado del like: true o false
  darLike(usuario: string,like:boolean): Observable<any> {
    const url = `${this.apiLocal}/comments/${usuario}/${like}`;
    return this.http.post(url, {});
  }


}
