import { useState, useMemo } from "react";
import { useClientes } from "../hooks/useClientes";
import { useNavigate } from "react-router-dom";
import { formatarCpfCnpj } from "../utils/formatarCpfCnpj";

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
    <div className="max-w-7xl mx-auto px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Lista de Clientes
      </h1>

      <div className="mb-6">
        <label htmlFor="busca" className="sr-only">
          Buscar cliente
        </label>
        <input
          id="busca"
          type="text"
          placeholder="Buscar por nome ou CPF/CNPJ"
          value={filtro}
          onChange={(e) => {
            setFiltro(e.target.value);
            setPagina(1);
          }}
          className="w-full px-4 py-3 rounded-md border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none text-gray-700"
        />
      </div>

      {loading ? (
        <p className="text-gray-500 text-center">Carregando...</p>
      ) : (
        <>
          <div className="overflow-x-auto rounded-md shadow ring-1 ring-black ring-opacity-5">
            <table className="min-w-full divide-y divide-gray-200 bg-white">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Nome
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    CPF/CNPJ
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Renda Anual
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {paginados.map((cliente) => (
                  <tr
                    key={cliente.id}
                    onClick={() => navigate(`/clientes/${cliente.id}`)}
                    className="hover:bg-blue-50 cursor-pointer transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                      {cliente.nome}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                      {formatarCpfCnpj(cliente.cpfCnpj)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                      {cliente.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                      R$ {cliente.rendaAnual.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Paginação */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-sm text-gray-600">
              Página <strong>{pagina}</strong> de{" "}
              <strong>{totalPaginas}</strong>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setPagina((prev) => Math.max(prev - 1, 1))}
                disabled={pagina === 1}
                className={`px-4 py-2 rounded-md text-sm font-medium transition 
                  ${
                    pagina === 1
                      ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                      : "bg-blue-600 text-white hover:bg-blue-700"
                  }`}
              >
                Anterior
              </button>

              <button
                onClick={() =>
                  setPagina((prev) => Math.min(prev + 1, totalPaginas))
                }
                disabled={pagina === totalPaginas}
                className={`px-4 py-2 rounded-md text-sm font-medium transition 
                  ${
                    pagina === totalPaginas
                      ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                      : "bg-blue-600 text-white hover:bg-blue-700"
                  }`}
              >
                Próxima
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ClientesPage;
