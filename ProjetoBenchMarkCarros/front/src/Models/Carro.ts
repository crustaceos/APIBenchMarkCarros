// src/models/Carro.ts

import { Usuario } from './Usuario';

export class Carro {
  idCarro: number;
  marca: string;
  nomeCarro: string;
  tipoModelo: string;
  imagem: string;
  cilindrada: number;
  torqueKgfm: number;
  rpm: number;
  ano: number;
  valor: number;
  potenciaCV: number;
  consumoKmL: number;
  aceleracao: number;
  usuarioId: number;
  usuario: Usuario | null;

  constructor(data: Partial<Carro> = {}) {
    this.idCarro = data.idCarro ?? 0;
    this.marca = data.marca ?? '';
    this.nomeCarro = data.nomeCarro ?? '';
    this.tipoModelo = data.tipoModelo ?? '';
    this.imagem = data.imagem ?? '';
    this.cilindrada = data.cilindrada ?? 0.0;
    this.torqueKgfm = data.torqueKgfm ?? 0.0;
    this.rpm = data.rpm ?? 0;
    this.ano = data.ano ?? 0;
    this.valor = data.valor ?? 0.0;
    this.potenciaCV = data.potenciaCV ?? 0;
    this.consumoKmL = data.consumoKmL ?? 0.0;
    this.aceleracao = data.aceleracao ?? 0.0;
    this.usuarioId = data.usuarioId ?? 0;
    this.usuario = data.usuario ?? null;
  }
}
