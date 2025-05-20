// src/models/Usuario.ts

export class Usuario {
  idUsuario: number;
  nomeUsuario: string;
  senhaUsuario: string;

  constructor(data: Partial<Usuario> = {}) {
    this.idUsuario = data.idUsuario ?? 0;
    this.nomeUsuario = data.nomeUsuario ?? '';
    this.senhaUsuario = data.senhaUsuario ?? '';
  }
}
