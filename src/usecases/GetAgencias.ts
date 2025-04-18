// src/usecases/GetAgencias.ts
import { Agencia } from "../entities/Agencia";
import { AgenciaRepository } from "../infrastructure/repositories/AgenciaRepository";

export class GetAgencias {
  constructor(private repo: AgenciaRepository) {}

  async execute(): Promise<Agencia[]> {
    return this.repo.fetchAgencias();
  }
}
