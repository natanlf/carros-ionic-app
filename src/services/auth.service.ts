import { API_CONFIG } from './../config/api.config';
import { CredeciaisDTO } from './../models/credenciais.dto';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {

    constructor(private http: HttpClient){}

    authenticate(creds : CredeciaisDTO) {
        return this.http.post(`${API_CONFIG.baseUrl}/login`, 
        creds,
            {
                observe: 'response',
                responseType: 'text' //uso text pois não tenho corpo só header, assim não terei erro de parse json
            }
        )
    }
}