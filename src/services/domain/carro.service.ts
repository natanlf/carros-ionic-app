import { API_CONFIG } from './../../config/api.config';
import { Observable } from 'rxjs/Rx';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class CarroService {
    constructor(private http: HttpClient){}

    findByCategoria(categoria_id: string){
        return this.http.get(`${API_CONFIG.baseUrl}/carros/?categoria=${categoria_id}`)
    }

    getImageFromBucket(id : string) : Observable<any> {
        let url = `${API_CONFIG.bucketBaseUrl}/car${id}.jpg`
        return this.http.get(url, {responseType : 'blob'});
      }  
}