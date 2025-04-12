import { Cliente } from "../../entities/Cliente";
import { fetchCsv } from "../services/fetchCsv";

const CLIENTES_URL =
  "https://docs.google.com/spreadsheets/d/1PBN_HQOi5ZpKDd63mouxttFvvCwtmY97Tb5if5_cdBA/gviz/tq?tqx=out:csv&sheet=clientes";

export class ClienteRepository {
  async fetchClientes(): Promise<Cliente[]> {
    return fetchCsv<Cliente>(CLIENTES_URL);
  }
}
