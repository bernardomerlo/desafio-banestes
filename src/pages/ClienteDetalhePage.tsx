import { useParams, Link } from "react-router-dom";
import { useClienteDetalhes } from "../hooks/useClienteDetalhes";

export default function ClienteDetalhesPage() {
  const { id } = useParams<{ id: string }>();
  const { data, loading } = useClienteDetalhes(id ?? "");

  if (loading) return <p style={{ padding: "2rem" }}>Carregando...</p>;
  if (!data) return <p>Cliente não encontrado.</p>;

  const { cliente, contas, agencia } = data;

  return (
    <div style={{ padding: "2rem" }}>
      <Link to="/">← Voltar</Link>
      <h2>Detalhes do Cliente</h2>
      <p>
        <strong>Nome:</strong> {cliente.nome}
      </p>
      <p>
        <strong>CPF/CNPJ:</strong> {cliente.cpfCnpj}
      </p>
      <p>
        <strong>RG:</strong> {cliente.rg ?? "-"}
      </p>
      <p>
        <strong>Data de Nascimento:</strong>{" "}
        {cliente.dataNascimento.toLocaleDateString()}
      </p>
      <p>
        <strong>Email:</strong> {cliente.email}
      </p>
      <p>
        <strong>Endereço:</strong> {cliente.endereco}
      </p>
      <p>
        <strong>Renda Anual:</strong> R$ {cliente.rendaAnual.toLocaleString()}
      </p>
      <p>
        <strong>Patrimônio:</strong> R$ {cliente.patrimonio.toLocaleString()}
      </p>
      <p>
        <strong>Estado Civil:</strong> {cliente.estadoCivil}
      </p>

      <hr style={{ margin: "2rem 0" }} />

      <h3>Contas Bancárias</h3>
      {contas.length === 0 ? (
        <p>Este cliente não possui contas cadastradas.</p>
      ) : (
        <table
          width="100%"
          border={1}
          cellPadding={6}
          style={{ borderCollapse: "collapse" }}
        >
          <thead>
            <tr>
              <th>Tipo</th>
              <th>Saldo</th>
              <th>Limite de Crédito</th>
              <th>Crédito Disponível</th>
            </tr>
          </thead>
          <tbody>
            {contas.map((c) => (
              <tr key={c.id}>
                <td>{c.tipo}</td>
                <td>R$ {c.saldo.toLocaleString()}</td>
                <td>R$ {c.limiteCredito.toLocaleString()}</td>
                <td>R$ {c.creditoDisponivel.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <hr style={{ margin: "2rem 0" }} />

      <h3>Agência</h3>
      {agencia ? (
        <>
          <p>
            <strong>Nome:</strong> {agencia.nome}
          </p>
          <p>
            <strong>Endereço:</strong> {agencia.endereco}
          </p>
        </>
      ) : (
        <p>Agência não encontrada.</p>
      )}
    </div>
  );
}
