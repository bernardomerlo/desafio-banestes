import { Cliente } from "../entities/Cliente";
import { Conta } from "../entities/Conta";
import { Agencia } from "../entities/Agencia";
import { ClienteRepository } from "../infrastructure/repositories/ClienteRepository";
import { ContaRepository } from "../infrastructure/repositories/ContaRepository";
import { AgenciaRepository } from "../infrastructure/repositories/AgenciaRepository";

export interface ClienteDetalhes {
  cliente: Cliente;
  contas: Conta[];
  agencia: Agencia | null;
}

export class GetClienteDetalhes {
  constructor(
    private clienteRepo: ClienteRepository,
    private contaRepo: ContaRepository,
    private agenciaRepo: AgenciaRepository,
  ) {}

  async execute(id: string): Promise<ClienteDetalhes | null> {
    const clientes = await this.clienteRepo.fetchClientes();
    const contas = await this.contaRepo.fetchContas();
    const agencias = await this.agenciaRepo.fetchAgencias();

    const cliente = clientes.find((c) => c.id.toString().trim() === id.trim());
    if (!cliente) return null;

    const clienteConvertido: Cliente = {
      ...cliente,
      dataNascimento: new Date(cliente.dataNascimento),
      rendaAnual: Number(cliente.rendaAnual),
      patrimonio: Number(cliente.patrimonio),
      codigoAgencia: Number(cliente.codigoAgencia),
    };

    const contasDoCliente = contas
      .filter((c: Conta) => c.cpfCnpjCliente === clienteConvertido.cpfCnpj)
      .map((c: Conta) => ({
        ...c,
        saldo: Number(c.saldo),
        limiteCredito: Number(c.limiteCredito),
        creditoDisponivel: Number(c.creditoDisponivel),
      }));

    const agencia =
      agencias.find(
        (a: Agencia) => a.codigo === clienteConvertido.codigoAgencia,
      ) ?? null;

    return {
      cliente: clienteConvertido,
      contas: contasDoCliente,
      agencia,
    };
  }
}
