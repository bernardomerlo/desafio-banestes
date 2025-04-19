import { renderHook, waitFor } from "@testing-library/react";
import * as uc from "../../usecases/GetDetalhesCliente";
import { useClienteDetalhes } from "../../hooks/useClienteDetalhes";

const mockExecute = jest.fn().mockResolvedValue({
  cliente: { id: "1" } as any,
  contas: [],
  agencia: null,
});

jest.spyOn(uc, "GetClienteDetalhes").mockImplementation(
  () =>
    ({
      execute: mockExecute,
    }) as any,
);

it("busca detalhes e muda loading", async () => {
  const { result } = renderHook(() => useClienteDetalhes("1"));

  expect(result.current.loading).toBe(true);

  await waitFor(() => expect(result.current.loading).toBe(false));

  expect(mockExecute).toHaveBeenCalledWith("1");
  expect(result.current.data?.cliente.id).toBe("1");
});
