import { Cliente } from "../../entities/Cliente";
import { formatarMoeda } from "../../utils/formatarMoeda";
import { fetchCsv } from "../services/fetchCsv";
import { AgenciaRepository } from "./AgenciaRepository";
import { ContaRepository } from "./ContaRepository";

const CLIENTES_URL =
  "https://docs.google.com/spreadsheets/d/1PBN_HQOi5ZpKDd63mouxttFvvCwtmY97Tb5if5_cdBA/gviz/tq?tqx=out:csv&sheet=clientes";

export class ClienteRepository {
  private contaRepo = new ContaRepository();
  private agenciaRepo = new AgenciaRepository();

  async fetchClientes(): Promise<Cliente[]> {
    const linhas = await fetchCsv<any>(CLIENTES_URL);

    const clientes: Cliente[] = linhas.map(
      (l): Cliente => ({
        id: l.id,
        cpfCnpj: l.cpfCnpj,
        rg: l.rg || undefined,
        dataNascimento: new Date(l.dataNascimento),
        nome: l.nome,
        nomeSocial: l.nomeSocial || undefined,
        email: l.email,
        endereco: l.endereco,
        rendaAnual: formatarMoeda(l.rendaAnual),
        patrimonio: formatarMoeda(l.patrimonio),
        estadoCivil: l.estadoCivil as Cliente["estadoCivil"],
        codigoAgencia: Number(l.codigoAgencia),
        contas: [],
        agencia: undefined as any,
      }),
    );

    const [contas, agencias] = await Promise.all([
      this.contaRepo.fetchContas(),
      this.agenciaRepo.fetchAgencias(),
    ]);

    const agPorCodigo = new Map(agencias.map((a) => [a.codigo, a]));

    for (const cliente of clientes) {
      cliente.contas = contas.filter(
        (c) => c.cpfCnpjCliente === cliente.cpfCnpj,
      );
      cliente.agencia = agPorCodigo.get(cliente.codigoAgencia)!;
    }

    return clientes;
  }
}
