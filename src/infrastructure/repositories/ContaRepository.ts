import { Conta } from "../../entities/Conta";
import { fetchCsv } from "../services/fetchCsv";

const CONTAS_URL =
  "https://docs.google.com/spreadsheets/d/1PBN_HQOi5ZpKDd63mouxttFvvCwtmY97Tb5if5_cdBA/gviz/tq?tqx=out:csv&sheet=contas";

export class ContaRepository {
  async fetchContas(): Promise<Conta[]> {
    return fetchCsv<Conta>(CONTAS_URL);
  }
}
