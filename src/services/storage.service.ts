import { STORAGE_KEYS } from './../config/storage_keys.config';
import { Injectable } from '@angular/core';
import { LocalUser } from '../models/local_user';

@Injectable()
export class StorageService {

    getLocalUser(): LocalUser{ //pega o token do local storage
        let usr = localStorage.getItem(STORAGE_KEYS.localUser)
        if(usr==null){
            return null
        }else{ //se existir retorna o usuário convertendo para json, pois o local storage armazena string
            return JSON.parse(usr)
        }
    }

    setLocalUser(obj: LocalUser){ //seta o token no local storage
        if(obj==null){
            localStorage.removeItem(STORAGE_KEYS.localUser)
        }else{ //converto de json para string, pois o local storage trabalha com string
            localStorage.setItem(STORAGE_KEYS.localUser, JSON.stringify(obj))
        }
    }
}