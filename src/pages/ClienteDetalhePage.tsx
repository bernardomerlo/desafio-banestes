import { useParams, Link } from "react-router-dom";
import { useClienteDetalhes } from "../hooks/useClienteDetalhes";

export default function ClienteDetalhesPage() {
  const { id } = useParams<{ id: string }>();
  const { data, loading } = useClienteDetalhes(id ?? "");

  if (loading)
    return <p className="p-8 text-gray-500 text-center">Carregando...</p>;
  if (!data)
    return (
      <p className="p-8 text-red-500 text-center">Cliente não encontrado.</p>
    );

  const { cliente, contas, agencia } = data;

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <Link
        to="/"
        className="inline-block mb-6 text-sm text-blue-600 hover:underline transition"
      >
        ← Voltar
      </Link>

      <section className="space-y-2 mb-10">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          Detalhes do Cliente
        </h2>
        <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2 text-sm text-gray-700">
          <div>
            <dt className="font-medium">Nome</dt>
            <dd>{cliente.nome}</dd>
          </div>
          <div>
            <dt className="font-medium">CPF/CNPJ</dt>
            <dd>{cliente.cpfCnpj}</dd>
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

      <section className="mb-10">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          Contas Bancárias
        </h3>
        {contas.length === 0 ? (
          <p className="text-sm text-gray-500">
            Este cliente não possui contas cadastradas.
          </p>
        ) : (
          <div className="overflow-x-auto rounded-md border border-gray-200 shadow-sm">
            <table className="min-w-full text-sm text-left text-gray-700">
              <thead className="bg-gray-50 text-gray-500 uppercase text-xs">
                <tr>
                  <th className="px-4 py-3">Tipo</th>
                  <th className="px-4 py-3">Saldo</th>
                  <th className="px-4 py-3">Limite de Crédito</th>
                  <th className="px-4 py-3">Crédito Disponível</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 bg-white">
                {contas.map((c) => (
                  <tr key={c.id} className="hover:bg-blue-50 transition">
                    <td className="px-4 py-3">{c.tipo}</td>
                    <td className="px-4 py-3">R$ {c.saldo.toLocaleString()}</td>
                    <td className="px-4 py-3">
                      R$ {c.limiteCredito.toLocaleString()}
                    </td>
                    <td className="px-4 py-3">
                      R$ {c.creditoDisponivel.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <section>
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Agência</h3>
        {agencia ? (
          <dl className="text-sm text-gray-700 space-y-2">
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
