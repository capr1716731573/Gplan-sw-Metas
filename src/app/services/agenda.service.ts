import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map,catchError } from 'rxjs/operators';

import { dominio_ws } from '../config/configuraciones_globales';
import { SettingsService } from './settings/settings.service';
import swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AgendaService {
  url:string=dominio_ws+'/agenda';
  tabla:string='Agenda ';

  constructor(public http:HttpClient,
              public _settingsService:SettingsService) { }

  cargarDatos(fecha_inicio:any,fecha_fin:any){
    let url_ws=`${this.url}/?fecha_inicio=${fecha_inicio}&fecha_fin=${fecha_fin}`;
    return this.http.get(url_ws)
    .pipe(map((resp:any) =>{
        let dato={};
        if(resp.status === 'error'){
          console.log(`Error - Service Obtener ${this.tabla}: `,resp.message,'error')
          
        }else{
          dato=resp;
        }
        return dato;
      }))
      .pipe(catchError( err =>{
        swal.fire(
          `Error no controlado ${this.tabla}`,
          'Revisar Detalle en consola',
          'error'
        )
        
        console.log(`Error no controlado - Service Obtener ${this.tabla}= `+ JSON.stringify(err));
        return Observable.throw(err);
      }))
  } 

  cargarDatosXDia(pk_espemed:any,fecha:any){
    let url_ws=`${this.url}/citasXDia/?pk_espemed=${pk_espemed}&fecha=${fecha}`;
    return this.http.get(url_ws)
    .pipe(map((resp:any) =>{
        let dato={};
        if(resp.status === 'error'){
          console.log(`Error - Service Obtener ${this.tabla}: `,resp.message,'error')
          
        }else{
          dato=resp;
        }
        return dato;
      }))
      .pipe(catchError( err =>{
        swal.fire(
          `Error no controlado ${this.tabla}`,
          'Revisar Detalle en consola',
          'error'
        )
        
        console.log(`Error no controlado - Service Obtener ${this.tabla}= `+ JSON.stringify(err));
        return Observable.throw(err);
      }))
  } 

  cargarDatosBusqueda(palabra:string){
    let url_ws=`${this.url}/busqueda/${palabra}`;
    return this.http.get(url_ws)
    .pipe(map((resp:any) =>{
        let dato={};
        if(resp.status === 'error'){
          console.log(`Error - Service Obtener ${this.tabla}: `,resp.message,'error')
          
        }else{
          dato=resp.data;
        }
        return dato;
      }))
      .pipe(catchError( err =>{
        swal.fire(
          `Error no controlado ${this.tabla}`,
          'Revisar Detalle en consola',
          'error'
        )
        
        console.log(`Error no controlado - Service Obtener ${this.tabla}= `+ JSON.stringify(err));
        return Observable.throw(err);
      }))
  }
  cargarDatosID(pk_ubigeo:number):Observable<any>{
    let url_ws=`${this.url}/ID/${pk_ubigeo}`;
    return this.http.get(url_ws)
    .pipe(map((resp:any) =>{
        let dato={};
        if(resp.status === 'error'){
          console.log(`Error - Service Obtener ${this.tabla}: `,resp.message,'error')
          
        }else{
          dato=resp.data;
        }
        return dato;
      }))
      .pipe(catchError( err =>{
        swal.fire(
          `Error no controlado ${this.tabla}`,
          'Revisar Detalle en consola',
          'error'
        )
        
        console.log(`Error no controlado - Service Obtener ${this.tabla}= `+ JSON.stringify(err));
        return Observable.throw(err);
      }))
  }

  crud(opcion:string,json:any):Observable<any>{
    let url_ws=`${this.url}`;
    return this.http.post(url_ws,{opcion:opcion,json:json})
    .pipe(map((resp:any) =>{
        let dato={};
        if(resp.status === 'error'){
          console.log(`Error - Service CRUD ${this.tabla}: `,resp.message,'error')
          
        }else{
          dato=resp.respuesta;
        }
        return dato;
      }))
      .pipe(catchError( err =>{
        swal.fire(
          `Error no controlado ${this.tabla} CRUD`,
          'Revisar Detalle en consola',
          'error'
        )
        
        console.log(`Error no controlado - Service CRUD ${this.tabla}= `+ JSON.stringify(err));
        return Observable.throw(err);
      }))
  }
}