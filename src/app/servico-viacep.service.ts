import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class ServicoVIACEPService {
  constructor(private httpClient: HttpClient) {}

  buscar(cep: string){
    return this.httpClient.get<viaCep>(`https://viacep.com.br/ws/${cep}/json/`)
  }
  location(cidade: string){
    return this.httpClient.get(`https://nominatim.openstreetmap.org/search?city=${cidade}&country=Brazil&limit=1&format=json`)
  }
  tempo(coordenadas){
    return this.httpClient.get(`https://api.open-meteo.com/v1/forecast?latitude=${coordenadas.latitude}&longitude=${coordenadas.longitude}&current_weather=true&hourly=temperature_2m,relativehumidity_2m,windspeed_10m`)
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
