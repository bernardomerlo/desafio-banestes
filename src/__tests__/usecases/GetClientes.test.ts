import { GetClientes } from "../../usecases/GetClientes";

const repoStub = {
  fetchClientes: jest.fn().mockResolvedValue([
    {
      id: "1",
      cpfCnpj: "123",
      dataNascimento: "2020-01-01",
      nome: "Ana",
      rendaAnual: "1000",
      patrimonio: "2000",
      codigoAgencia: "1001",
      contas: [],
    },
  ]),
};

it("converte strings numéricas em números", async () => {
  const sut = new GetClientes(repoStub as any);
  const [c] = await sut.execute();

  expect(c.rendaAnual).toBe(1000); 
  expect(c.codigoAgencia).toBe(1001);
});
