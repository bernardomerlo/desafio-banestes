import { renderHook, waitFor } from "@testing-library/react";
import * as GetClientesUsecase from "../../usecases/GetClientes";
import { useClientes } from "../../hooks/useClientes";

const mockExecute = jest.fn().mockResolvedValue([
  {
    id: "1",
    nome: "Ana",
    cpfCnpj: "123",
    rendaAnual: 1000,
    patrimonio: 2000,
    codigoAgencia: 1001,
    contas: [],
  },
]);

jest
  .spyOn(GetClientesUsecase, "GetClientes")
  .mockImplementation((): any => ({ execute: mockExecute }));

it("retorna loading=false após buscar os dados", async () => {
  const { result } = renderHook(() => useClientes());

  expect(result.current.loading).toBe(true);

  await waitFor(() => expect(result.current.loading).toBe(false));

  expect(mockExecute).toHaveBeenCalled();
  expect(result.current.clientes).toHaveLength(1);
});
