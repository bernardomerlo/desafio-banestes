import { Agencia } from "../../entities/Agencia";
import { fetchCsv } from "../services/fetchCsv";

const AGENCIAS_URL =
  "https://docs.google.com/spreadsheets/d/1PBN_HQOi5ZpKDd63mouxttFvvCwtmY97Tb5if5_cdBA/gviz/tq?tqx=out:csv&sheet=agencias";

export class AgenciaRepository {
  async fetchAgencias(): Promise<Agencia[]> {
    return fetchCsv<Agencia>(AGENCIAS_URL);
  }
}
