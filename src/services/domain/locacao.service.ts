import { API_CONFIG } from './../../config/api.config';
import { LocacaoDTO } from './../../models/locacao.dto';
import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";

@Injectable()
export class LocacaoService {

    constructor(private http: HttpClient){}

    insert(obj: any){
        return this.http.post(`${API_CONFIG.baseUrl}/locacoes`,
        obj,
        {
            observe: 'response', 
            responseType: 'text' //corpo vazio por isso texto para não dá erro de parse json
        })
    }
}