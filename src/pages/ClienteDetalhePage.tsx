import { useParams, Link } from "react-router-dom";
import { useClienteDetalhes } from "../hooks/useClienteDetalhes";
import { formatarCpfCnpj } from "../utils/formatarCpfCnpj";

export default function ClienteDetalhesPage() {
  const { id } = useParams<{ id: string }>();
  const { data, loading } = useClienteDetalhes(id ?? "");

  if (loading)
    return <p className="p-12 text-center text-gray-500">Carregando...</p>;

  if (!data)
    return (
      <p className="p-12 text-center text-red-500">Cliente não encontrado.</p>
    );

  const { cliente, contas, agencia } = data;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-gray-100">
      <Link
        to="/"
        className="mb-8 inline-block text-sm font-medium text-blue-600 hover:underline"
      >
        ← Voltar
      </Link>

      {/* cartão: detalhes do cliente */}
      <section className="mb-10 rounded-lg bg-white p-8 shadow ring-1 ring-gray-200">
        <h2 className="mb-6 text-2xl font-semibold text-gray-800">
          Detalhes do Cliente
        </h2>
        <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-4 text-sm text-gray-700">
          <div>
            <dt className="font-medium">Nome</dt>
            <dd>{cliente.nome}</dd>
          </div>
          <div>
            <dt className="font-medium">CPF/CNPJ</dt>
            <dd>{formatarCpfCnpj(cliente.cpfCnpj)}</dd>
          </div>
          <div>
            <dt className="font-medium">RG</dt>
            <dd>{cliente.rg || "-"}</dd>
          </div>
          <div>
            <dt className="font-medium">Data de Nascimento</dt>
            <dd>{cliente.dataNascimento.toLocaleDateString()}</dd>
          </div>
          <div>
            <dt className="font-medium">Email</dt>
            <dd>{cliente.email}</dd>
          </div>
          <div>
            <dt className="font-medium">Endereço</dt>
            <dd>{cliente.endereco}</dd>
          </div>
          <div>
            <dt className="font-medium">Renda Anual</dt>
            <dd>R$ {cliente.rendaAnual.toLocaleString()}</dd>
          </div>
          <div>
            <dt className="font-medium">Patrimônio</dt>
            <dd>R$ {cliente.patrimonio.toLocaleString()}</dd>
          </div>
          <div>
            <dt className="font-medium">Estado Civil</dt>
            <dd>{cliente.estadoCivil}</dd>
          </div>
        </dl>
      </section>

      <section className="mb-10 rounded-lg bg-white p-8 shadow ring-1 ring-gray-200">
        <h3 className="mb-6 text-xl font-semibold text-gray-800">
          Contas Bancárias
        </h3>
        {contas.length === 0 ? (
          <p className="text-sm text-gray-500">
            Este cliente não possui contas cadastradas.
          </p>
        ) : (
          <>
            <ul className="sm:hidden space-y-4">
              {contas.map((c) => (
                <li
                  key={c.id}
                  className="rounded-lg bg-white p-4 shadow ring-1 ring-gray-200"
                >
                  <p className="font-semibold text-gray-800">{c.tipo}</p>
                  <p className="text-sm text-gray-600">
                    Saldo:&nbsp;R$ {c.saldo.toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-600">
                    Limite:&nbsp;R$ {c.limiteCredito.toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-600">
                    Disponível:&nbsp;R$ {c.creditoDisponivel.toLocaleString()}
                  </p>
                </li>
              ))}
            </ul>
            <div className="hidden sm:block overflow-x-auto rounded-md ring-1 ring-gray-200">
              <table className="w-full divide-y divide-gray-200 bg-white text-left text-sm text-gray-700">
                <thead className="sticky top-0 z-10 bg-gray-50 text-xs uppercase text-gray-500">
                  <tr>
                    <th className="px-5 py-3">Tipo</th>
                    <th className="px-5 py-3">Saldo</th>
                    <th className="px-5 py-3">Limite de Crédito</th>
                    <th className="px-5 py-3">Crédito Disponível</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {contas.map((c) => (
                    <tr
                      key={c.id}
                      className="bg-white transition-colors hover:bg-blue-50/60"
                    >
                      <td className="px-5 py-3">{c.tipo}</td>
                      <td className="px-5 py-3">
                        R$ {c.saldo.toLocaleString()}
                      </td>
                      <td className="px-5 py-3">
                        R$ {c.limiteCredito.toLocaleString()}
                      </td>
                      <td className="px-5 py-3">
                        R$ {c.creditoDisponivel.toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </section>

      <section className="rounded-lg bg-white p-8 shadow ring-1 ring-gray-200">
        <h3 className="mb-6 text-xl font-semibold text-gray-800">Agência</h3>
        {agencia ? (
          <dl className="space-y-4 text-sm text-gray-700">
            <div>
              <dt className="font-medium">Nome</dt>
              <dd>{agencia.nome}</dd>
            </div>
            <div>
              <dt className="font-medium">Endereço</dt>
              <dd>{agencia.endereco}</dd>
            </div>
          </dl>
        ) : (
          <p className="text-sm text-gray-500">Agência não encontrada.</p>
        )}
      </section>
    </div>
  );
}
