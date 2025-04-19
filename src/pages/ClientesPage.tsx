import { useState, useMemo } from "react";
import { useClientes } from "../hooks/useClientes";
import { useNavigate } from "react-router-dom";
import { formatarCpfCnpj } from "../utils/formatarCpfCnpj";
import { useAgencias } from "../hooks/useAgencias";

const porPagina = 10;

export const ClientesPage = () => {
  const { clientes, loading } = useClientes();
  const { agencias, loading: loadingAg } = useAgencias();
  const [filtro, setFiltro] = useState("");
  const [pagina, setPagina] = useState(1);
  const navigate = useNavigate();
  const [filtrosAvancados, setFiltrosAvancados] = useState({
    rendaMin: "",
    rendaMax: "",
    patrimonioMin: "",
    patrimonioMax: "",
    tipoConta: "",
    agenciaCodigo: "",
  });

  const [mostrarFiltros, setMostrarFiltros] = useState(false);

  const filtrados = useMemo(() => {
    return clientes.filter((cliente) => {
      const texto = [cliente.nome, cliente.cpfCnpj].join(" ").toLowerCase();
      const buscaTexto = texto.includes(filtro.toLowerCase());

      const renda = cliente.rendaAnual || 0;
      const patrimonio = cliente.patrimonio || 0;

      const {
        rendaMin,
        rendaMax,
        patrimonioMin,
        patrimonioMax,
        tipoConta,
        agenciaCodigo,
      } = filtrosAvancados;

      const dentroRenda =
        (!rendaMin || renda >= parseFloat(rendaMin)) &&
        (!rendaMax || renda <= parseFloat(rendaMax));

      const dentroPatrimonio =
        (!patrimonioMin || patrimonio >= parseFloat(patrimonioMin)) &&
        (!patrimonioMax || patrimonio <= parseFloat(patrimonioMax));

      const tipoContaValida =
        !tipoConta || cliente.contas.some((conta) => conta.tipo === tipoConta);

      const agenciaValida =
        !agenciaCodigo || cliente.codigoAgencia === Number(agenciaCodigo);

      return (
        buscaTexto &&
        dentroRenda &&
        dentroPatrimonio &&
        tipoContaValida &&
        agenciaValida
      );
    });
  }, [clientes, filtro, filtrosAvancados]);

  const paginados = useMemo(() => {
    const inicio = (pagina - 1) * porPagina;
    return filtrados.slice(inicio, inicio + porPagina);
  }, [filtrados, pagina]);

  const totalPaginas = Math.ceil(filtrados.length / porPagina);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-gray-100">
      <h1 className="text-4xl font-extrabold text-gray-800 tracking-tight mb-8">
        Lista de Clientes
      </h1>

      <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-center">
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
          className="sm:flex-1 w-full rounded-lg border border-gray-300 bg-white px-5 py-3 text-gray-700 placeholder-gray-400 shadow-sm focus:border-blue-600 focus:ring-4 focus:ring-blue-200 transition-colors duration-150"
        />

        <button
          onClick={() => setMostrarFiltros(!mostrarFiltros)}
          className="flex-shrink-0 flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow hover:bg-blue-700 active:scale-95 transition"
        >
          Filtros Avançados
        </button>
      </div>

      {mostrarFiltros && (
        <div className="mb-8 mx-auto max-w-4xl grid sm:grid-cols-2 gap-6 rounded-lg border border-gray-200 bg-white p-6 shadow-md">
          <h2 className="col-span-full mb-4 text-lg font-semibold text-gray-800">
            Filtros Avançados
          </h2>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Renda Anual Mínima (R$)
            </label>
            <input
              type="number"
              value={filtrosAvancados.rendaMin}
              onChange={(e) =>
                setFiltrosAvancados((prev) => ({
                  ...prev,
                  rendaMin: e.target.value,
                }))
              }
              className="w-full rounded-md border-gray-300 bg-gray-50 px-3 py-2 text-gray-700 shadow-sm focus:border-blue-500 focus:ring-blue-200"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Renda Anual Máxima (R$)
            </label>
            <input
              type="number"
              value={filtrosAvancados.rendaMax}
              onChange={(e) =>
                setFiltrosAvancados((prev) => ({
                  ...prev,
                  rendaMax: e.target.value,
                }))
              }
              className="w-full rounded-md border-gray-300 bg-gray-50 px-3 py-2 text-gray-700 shadow-sm focus:border-blue-500 focus:ring-blue-200"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Patrimônio Mínimo (R$)
            </label>
            <input
              type="number"
              value={filtrosAvancados.patrimonioMin}
              onChange={(e) =>
                setFiltrosAvancados((prev) => ({
                  ...prev,
                  patrimonioMin: e.target.value,
                }))
              }
              className="w-full rounded-md border-gray-300 bg-gray-50 px-3 py-2 text-gray-700 shadow-sm focus:border-blue-500 focus:ring-blue-200"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Patrimônio Máximo (R$)
            </label>
            <input
              type="number"
              value={filtrosAvancados.patrimonioMax}
              onChange={(e) =>
                setFiltrosAvancados((prev) => ({
                  ...prev,
                  patrimonioMax: e.target.value,
                }))
              }
              className="w-full rounded-md border-gray-300 bg-gray-50 px-3 py-2 text-gray-700 shadow-sm focus:border-blue-500 focus:ring-blue-200"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Tipo de Conta
            </label>
            <select
              value={filtrosAvancados.tipoConta}
              onChange={(e) =>
                setFiltrosAvancados((prev) => ({
                  ...prev,
                  tipoConta: e.target.value,
                }))
              }
              className="w-full rounded-md border-gray-300 bg-gray-50 px-3 py-2 text-gray-700 shadow-sm focus:border-blue-500 focus:ring-blue-200"
            >
              <option value="">Todos</option>
              <option value="corrente">Conta Corrente</option>
              <option value="poupanca">Conta Poupança</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Agência
            </label>
            <select
              value={filtrosAvancados.agenciaCodigo}
              onChange={(e) =>
                setFiltrosAvancados((prev) => ({
                  ...prev,
                  agenciaCodigo: e.target.value,
                }))
              }
              className="w-full rounded-md border-gray-300 bg-gray-50 px-3 py-2 text-gray-700 shadow-sm focus:border-blue-500 focus:ring-blue-200"
            >
              <option value="">Todas</option>
              {loadingAg ? (
                <option disabled>Carregando...</option>
              ) : (
                agencias.map((ag) => (
                  <option key={ag.codigo} value={ag.codigo}>
                    {ag.codigo} – {ag.nome}
                  </option>
                ))
              )}
            </select>
          </div>
        </div>
      )}

      {loading ? (
        <p className="text-center text-gray-500">Carregando...</p>
      ) : (
        <>
          <div className="sm:overflow-x-auto overflow-visible rounded-lg shadow ring-1 ring-black/5">
            <ul className="sm:hidden space-y-4">
              {paginados.map((c) => (
                <li
                  key={c.id}
                  onClick={() => navigate(`/clientes/${c.id}`)}
                  className="cursor-pointer rounded-lg bg-white p-4 shadow hover:bg-blue-50/60 transition-colors"
                >
                  <p className="font-semibold text-gray-800">{c.nome}</p>
                  <p className="text-sm text-gray-600">
                    {formatarCpfCnpj(c.cpfCnpj)}
                  </p>
                  <p className="text-sm text-gray-600">{c.email}</p>
                  <p className="text-sm text-gray-600">
                    R$ {c.rendaAnual.toLocaleString()}
                  </p>
                </li>
              ))}
            </ul>
            <table className="hidden sm:table w-full divide-y divide-gray-200 bg-white">
              <thead className="bg-gray-100 sticky top-0 z-10">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 tracking-wider">
                    Nome
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 tracking-wider">
                    CPF/CNPJ
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 tracking-wider">
                    Renda Anual
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {paginados.map((cliente) => (
                  <tr
                    key={cliente.id}
                    onClick={() => navigate(`/clientes/${cliente.id}`)}
                    className="cursor-pointer bg-white hover:bg-blue-50/60 transition-colors duration-100"
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
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

          <div className="mt-10 flex flex-col items-center justify-between gap-6 sm:flex-row">
            <span className="text-sm text-gray-600">
              Página <strong>{pagina}</strong> de{" "}
              <strong>{totalPaginas}</strong>
            </span>

            <div className="flex gap-3">
              <button
                onClick={() => setPagina((prev) => Math.max(prev - 1, 1))}
                disabled={pagina === 1}
                className={`rounded-md px-5 py-2 text-sm font-semibold shadow transition ${
                  pagina === 1
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-blue-600 text-white hover:bg-blue-700 active:scale-95"
                }`}
              >
                Anterior
              </button>
              <button
                onClick={() =>
                  setPagina((prev) => Math.min(prev + 1, totalPaginas))
                }
                disabled={pagina === totalPaginas}
                className={`rounded-md px-5 py-2 text-sm font-semibold shadow transition ${
                  pagina === totalPaginas
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-blue-600 text-white hover:bg-blue-700 active:scale-95"
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
