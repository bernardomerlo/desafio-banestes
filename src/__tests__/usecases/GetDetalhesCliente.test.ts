import { Cliente } from "../../entities/Cliente";
import { Conta } from "../../entities/Conta";
import { Agencia } from "../../entities/Agencia";
import { GetClienteDetalhes } from "../../usecases/GetDetalhesCliente";

class FakeClienteRepository {
  async fetchClientes(): Promise<Cliente[]> {
    return [
      {
        id: "1",
        nome: "Wesley",
        cpfCnpj: "123",
        dataNascimento: new Date("1990-01-01"),
        email: "wesley@safado.dev",
        endereco: "Rua Teste",
        rendaAnual: 100000,
        patrimonio: 500000,
        estadoCivil: "Solteiro",
        rg: "123456",
        codigoAgencia: 1,
      },
    ];
  }
}

class FakeContaRepository {
  async fetchContas(): Promise<Conta[]> {
    return [
      {
        id: "10",
        cpfCnpjCliente: "123",
        tipo: "corrente",
        saldo: 1000,
        limiteCredito: 2000,
        creditoDisponivel: 1500,
      },
    ];
  }
}

class FakeAgenciaRepository {
  async fetchAgencias(): Promise<Agencia[]> {
    return [
      {
        id: "1",
        codigo: 1,
        nome: "Agência Central",
        endereco: "Av. Principal, 1000",
      },
    ];
  }
}

describe("GetDetalhesCliente UseCase", () => {
  it("deve retornar detalhes completos de um cliente existente", async () => {
    const usecase = new GetClienteDetalhes(
      new FakeClienteRepository(),
      new FakeContaRepository(),
      new FakeAgenciaRepository(),
    );

    const resultado = await usecase.execute("1");

    expect(resultado).not.toBeNull();
    expect(resultado?.cliente.nome).toBe("Wesley");
    expect(resultado?.contas).toHaveLength(1);
    expect(resultado?.agencia?.nome).toBe("Agência Central");
  });

  it("deve retornar null se o cliente não for encontrado", async () => {
    const usecase = new GetClienteDetalhes(
      new FakeClienteRepository(),
      new FakeContaRepository(),
      new FakeAgenciaRepository(),
    );

    const resultado = await usecase.execute("999");

    expect(resultado).toBeNull();
  });
});
