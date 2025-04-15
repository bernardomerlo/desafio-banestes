import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { useClientes } from "../../hooks/useClientes";
import "@testing-library/jest-dom";
import ClientesPage from "../../pages/ClientesPage";

jest.mock("../../hooks/useClientes");
const mockedUseClientes = useClientes as jest.Mock;

describe("ClientesPage", () => {
  beforeEach(() => {
    mockedUseClientes.mockReturnValue({
      clientes: [
        {
          id: "1",
          nome: "Teste 1",
          cpfCnpj: "109.876.543-21",
          rendaAnual: 100000,
          patrimonio: 500000,
          email: "teste@teste.dev",
          contas: [{ tipo: "corrente" }],
        },
        {
          id: "2",
          nome: "Teste 2",
          cpfCnpj: "123.456.789-00",
          rendaAnual: 200000,
          patrimonio: 1000000,
          email: "teste2@teste.com",
          contas: [{ tipo: "poupanca" }],
        },
      ],
      loading: false,
    });
  });

  it("deve renderizar os clientes corretamente", async () => {
    render(<ClientesPage />);

    expect(screen.getByText("Lista de Clientes")).toBeInTheDocument();

    expect(screen.getByText("Teste 1")).toBeInTheDocument();
    expect(screen.getByText("Teste 2")).toBeInTheDocument();
  });

  it("deve filtrar os clientes corretamente com base na pesquisa", async () => {
    render(<ClientesPage />);

    const inputBusca = screen.getByPlaceholderText(
      "Buscar por nome ou CPF/CNPJ",
    );
    fireEvent.change(inputBusca, { target: { value: "Teste 1" } });

    await waitFor(() => {
      expect(screen.getByText("Teste 1")).toBeInTheDocument();
      expect(screen.queryByText("Teste 2")).toBeNull();
    });
  });

  it("deve aplicar filtros avançados corretamente", async () => {
    render(<ClientesPage />);

    const filtrosButton = screen.getByText("Filtros Avançados");
    fireEvent.click(filtrosButton);

    const inputRendaMin = screen.getByLabelText("Renda Anual Mínima (R$)");
    fireEvent.change(inputRendaMin, { target: { value: "150000" } });

    await waitFor(() => {
      expect(screen.queryByText("Teste 1")).toBeNull();
      expect(screen.getByText("Teste 2")).toBeInTheDocument();
    });
  });

  it("deve permitir a navegação para a página de detalhes do cliente", async () => {
    render(<ClientesPage />);

    const cliente = screen.getByText("Teste 1");
    fireEvent.click(cliente);

    expect(window.location.pathname).toBe("/clientes/1");
  });

  it('deve exibir "Carregando..." enquanto os dados estão sendo carregados', async () => {
    mockedUseClientes.mockReturnValueOnce({
      clientes: [],
      loading: true,
    });

    render(<ClientesPage />);

    expect(screen.getByText("Carregando...")).toBeInTheDocument();
  });

  it("deve exibir somente os clientes em que a conta é poupança", async () => {
    render(<ClientesPage />);

    const filtrosButton = screen.getByText("Filtros Avançados");
    fireEvent.click(filtrosButton);

    const inputTipoConta = screen.getByLabelText("Tipo de Conta");
    fireEvent.change(inputTipoConta, { target: { value: "poupanca" } });

    expect(screen.getByText("Teste 2")).toBeInTheDocument();
    expect(screen.queryByText("Teste 1")).toBeNull();
  });
});
