import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})

export class ServicoVIACEPService {
  constructor(private httpClient: HttpClient) {}

  buscar(cep: string):Observable<number>{
    return this.httpClient.get<number>(`https://viacep.com.br/ws/${cep}/json/`)
  }
  location(cidade: string):Observable<string>{
    return this.httpClient.get<string>(`https://nominatim.openstreetmap.org/search?city=${cidade}&country=Brazil&limit=1&format=json`)
  }
  tempo(coordenadas):Observable<number>{
    return this.httpClient.get<number>(`https://api.open-meteo.com/v1/forecast?latitude=${coordenadas.latitude}&longitude=${coordenadas.longitude}&current_weather=true&hourly=temperature_2m,relativehumidity_2m,windspeed_10m`)
  }
}

export interface viaCep {
  cep: string
  logradouro: string
  complemento: string
  bairro: string
  localidade: string
  uf: string
  ibge: string
  gia: string
  ddd: string
  siafi: string
}
export interface coordenadas{
  latitude: number;
  longitude: number;
}
export interface tempo{
  temperature:number;
}
