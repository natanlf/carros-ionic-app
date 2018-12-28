import { CarroDTO } from './../../models/carro.dto';
import { API_CONFIG } from './../../config/api.config';
import { Observable } from 'rxjs/Rx';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class CarroService {
    constructor(private http: HttpClient){}

    findByCategoria(categoria_id: string, page: number, linesPerPage: number = 24){
        return this.http.get(`${API_CONFIG.baseUrl}/carros/?categoria=${categoria_id}&page=${page}&linesPerPage=${linesPerPage}`)
    }

    getImageFromBucket(id : string) : Observable<any> {
        let url = `${API_CONFIG.bucketBaseUrl}/car${id}.jpg`
        return this.http.get(url, {responseType : 'blob'});
      }
      
    findById(id: string){
        return this.http.get<CarroDTO>(`${API_CONFIG.baseUrl}/carros/${id}`)
    }  
}