import { useState, useMemo } from "react";
import { useClientes } from "../hooks/useClientes";
import { useNavigate } from "react-router-dom";

const porPagina = 10;

export const ClientesPage = () => {
  const { clientes, loading } = useClientes();
  const [filtro, setFiltro] = useState("");
  const [pagina, setPagina] = useState(1);
  const navigate = useNavigate();

  const filtrados = useMemo(() => {
    return clientes.filter((cliente) =>
      [cliente.nome, cliente.cpfCnpj]
        .join(" ")
        .toLowerCase()
        .includes(filtro.toLowerCase()),
    );
  }, [clientes, filtro]);

  const paginados = useMemo(() => {
    const inicio = (pagina - 1) * porPagina;
    return filtrados.slice(inicio, inicio + porPagina);
  }, [filtrados, pagina]);

  const totalPaginas = Math.ceil(filtrados.length / porPagina);

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Lista de Clientes</h1>

      <input
        type="text"
        placeholder="Buscar por nome ou CPF/CNPJ"
        value={filtro}
        onChange={(e) => {
          setFiltro(e.target.value);
          setPagina(1);
        }}
        style={{ padding: "0.5rem", margin: "1rem 0", width: "100%" }}
      />

      {loading ? (
        <p>Carregando...</p>
      ) : (
        <>
          <table
            width="100%"
            border={1}
            cellPadding={8}
            style={{ borderCollapse: "collapse" }}
          >
            <thead>
              <tr>
                <th>Nome</th>
                <th>CPF/CNPJ</th>
                <th>Email</th>
                <th>Renda Anual</th>
              </tr>
            </thead>
            <tbody>
              {paginados.map((cliente) => (
                <tr
                  key={cliente.id}
                  onClick={() => navigate(`/clientes/${cliente.id}`)}
                >
                  <td>{cliente.nome}</td>
                  <td>{cliente.cpfCnpj}</td>
                  <td>{cliente.email}</td>
                  <td>R$ {cliente.rendaAnual.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div
            style={{
              marginTop: "1rem",
              display: "flex",
              justifyContent: "center",
              gap: "1rem",
            }}
          >
            <button
              disabled={pagina === 1}
              onClick={() => setPagina(pagina - 1)}
            >
              Anterior
            </button>
            <span>
              Página {pagina} de {totalPaginas}
            </span>
            <button
              disabled={pagina === totalPaginas}
              onClick={() => setPagina(pagina + 1)}
            >
              Próxima
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ClientesPage;
