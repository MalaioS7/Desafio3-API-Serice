import { Component } from '@angular/core';
import { CepInterface } from './CepInterface';
import { coordenadas, ServicoVIACEPService, tempo } from './servico-viacep.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'desafio3';
  cep: string;
  error: boolean = false;
  dados: CepInterface;
  coordenadas: coordenadas;
  time: tempo;

  constructor(private CepServico: ServicoVIACEPService){}

  // ELE VAI CONSULTAR AS INFORMAÇÕES DO CEP
  consulta(){
    this.CepServico.buscar(this.cep).subscribe(
    {
      next: this.popula_cep.bind(this),
      error: this.error_cep.bind(this),
    }
    );
  }
  popula_cep(res){
    if (!res.erro){
      this.error = false
      this.dados = {
        cep: res.cep,
        localidade: res.localidade,
        bairro: res.bairro,
        logradouro: res.logradouro,
        estado: res.uf,
      }
      this.location(res.localidade)

    }
    else {
      this.error = true
    }
  }
  error_cep(res: any){
    this.error = true

  }


  // ELE VAI CONSULTAR AS INFORMAÇÕES DE LATITUDE E LONGITUDE
  location(res){
    this.CepServico.location(res).subscribe({
      next: this.popula_location.bind(this),
      error: this.error_location.bind(this),
    });
  }
  error_location(res: any){
    this.error = true
  }
  popula_location(res){
    this.coordenadas = {
      latitude: res[0].lat,
      longitude: res[0].lon,
    }
    this.tempo(this.coordenadas)

  }

  // ELE VAI CONSULTAR AS INFORMAÇÕES DE TEMPERATURA
  tempo(coordenadas){
    this.CepServico.tempo(coordenadas).subscribe({
      next: this.popula_tempo.bind(this),
      error: this.error_tempo.bind(this),
    });
  }
  error_tempo(res: any){
    this.error = true
  }
  popula_tempo(res){
    console.log(res)
    this.time = {
      temperature: res.current_weather.temperature,
    }
  }
}
