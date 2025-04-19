import { Cliente } from "../entities/Cliente";
export interface IClienteRepo {
  fetchClientes(): Promise<Cliente[]>;
}

export class GetClientes {
  constructor(private repo: IClienteRepo) {}

  async execute(): Promise<Cliente[]> {
    const data = await this.repo.fetchClientes();
    return data.map((c) => ({
      ...c,
      dataNascimento: new Date(c.dataNascimento),
      rendaAnual: Number(c.rendaAnual),
      patrimonio: Number(c.patrimonio),
      codigoAgencia: Number(c.codigoAgencia),
    }));
  }
}
