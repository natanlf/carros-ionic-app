import { API_CONFIG } from './../../config/api.config';
import { ClienteDTO } from './../../models/cliente.dto';
import { Observable } from 'rxjs/Rx';
import { StorageService } from './../storage.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from "@angular/core";

@Injectable()
export class ClienteService {

    constructor(
        private http: HttpClient, 
        private storage: StorageService){
    }

    findByEmail(email: string): Observable<ClienteDTO> {
        let token = this.storage.getLocalUser().token
        let authHeader = new HttpHeaders({'Authorization': 'Bearer ' + token})
        return this.http.get<ClienteDTO>(
            `${API_CONFIG.baseUrl}/clientes/email?value=${email}`,
            {'headers': authHeader} //adiciona o token no cabeçalho do request
        ); 
    }

    getImageFromBucket(id : string) : Observable<any> { //pegando imagem do S3 da Amazon
        let url = `${API_CONFIG.bucketBaseUrl}/cp${id}.jpg`
        return this.http.get(url, {responseType : 'blob'}); //blob diz que a resposta é imagem
    }

    insert(obj: ClienteDTO){
        return this.http.post(`${API_CONFIG.baseUrl}/clientes`,
        obj,
        {
            observe: 'response', 
            responseType: 'text' //corpo vazio por isso texto para não dá erro de parse json
        })
    }
}