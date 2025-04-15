import { Cliente } from "../../entities/Cliente";
import { fetchCsv } from "../services/fetchCsv";
import { ContaRepository } from "./ContaRepository";

const CLIENTES_URL =
  "https://docs.google.com/spreadsheets/d/1PBN_HQOi5ZpKDd63mouxttFvvCwtmY97Tb5if5_cdBA/gviz/tq?tqx=out:csv&sheet=clientes";

export class ClienteRepository {
  async fetchClientes(): Promise<Cliente[]> {
    const clientes = await fetchCsv<Cliente>(CLIENTES_URL);

    const contaRepository = new ContaRepository();
    const contas = await contaRepository.fetchContas();

    const clientesComContas = clientes.map((cliente) => {
      const clienteContas = contas.filter(
        (conta) => conta.cpfCnpjCliente === cliente.cpfCnpj,
      );
      return { ...cliente, contas: clienteContas };
    });

    return clientesComContas;
  }
}
