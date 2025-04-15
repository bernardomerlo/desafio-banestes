import { GetClientes } from "../../usecases/GetClientes";
import { Cliente } from "../../entities/Cliente";

class FakeClienteRepository {
  async fetchClientes(): Promise<Cliente[]> {
    return [
      {
        id: "1",
        nome: "Teste 1",
        cpfCnpj: "109.876.543-21",
        dataNascimento: new Date("1990-01-01"),
        email: "teste@teste.dev",
        endereco: "Rua das Gaivotas, 42",
        rendaAnual: 100000,
        patrimonio: 500000,
        estadoCivil: "Solteiro",
        rg: "MG-123456",
        codigoAgencia: 1,
        contas: [],
      },
      {
        id: "2",
        nome: "Teste 2",
        cpfCnpj: "123.456.789-00",
        dataNascimento: new Date("1990-01-01"),
        email: "teste@teste.com.br",
        endereco: "Rua das Gangorras, 42",
        rendaAnual: 100000,
        patrimonio: 500000,
        estadoCivil: "Casado",
        rg: "MG-123456",
        codigoAgencia: 21223,
        contas: [],
      },
    ];
  }
}

describe("GetClientes UseCase", () => {
  it("deve retornar uma lista de clientes", async () => {
    const usecase = new GetClientes(new FakeClienteRepository());

    const clientes = await usecase.execute();

    expect(clientes).toHaveLength(2);
    expect(clientes[0].nome).toBe("Teste 1");
    expect(clientes[0].rendaAnual).toBe(100000);
    expect(clientes[0].cpfCnpj).toBe("109.876.543-21");
    expect(clientes[1].endereco).toBe("Rua das Gangorras, 42");
  });
});
