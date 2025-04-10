// src/pages/ClienteDetalhesPage.tsx
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Cliente, Conta, Agencia } from "../types";
import { fetchCsv } from "../services/fetchCsv";

const CLIENTES_URL =
  "https://docs.google.com/spreadsheets/d/1PBN_HQOi5ZpKDd63mouxttFvvCwtmY97Tb5if5_cdBA/gviz/tq?tqx=out:csv&sheet=clientes";

const CONTAS_URL =
  "https://docs.google.com/spreadsheets/d/1PBN_HQOi5ZpKDd63mouxttFvvCwtmY97Tb5if5_cdBA/gviz/tq?tqx=out:csv&sheet=contas";

const AGENCIAS_URL =
  "https://docs.google.com/spreadsheets/d/1PBN_HQOi5ZpKDd63mouxttFvvCwtmY97Tb5if5_cdBA/gviz/tq?tqx=out:csv&sheet=agencias";

export default function ClienteDetalhesPage() {
  const { id } = useParams<{ id: string }>();
  const [cliente, setCliente] = useState<Cliente | null>(null);
  const [contas, setContas] = useState<Conta[]>([]);
  const [agencia, setAgencia] = useState<Agencia | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    Promise.all([
      fetchCsv<Cliente>(CLIENTES_URL),
      fetchCsv<Conta>(CONTAS_URL),
      fetchCsv<Agencia>(AGENCIAS_URL),
    ]).then(([clientesData, contasData, agenciasData]) => {
      const clienteEncontrado = clientesData.find(
        (c) => c.id.toString().trim() === id?.trim(),
      );
      if (!clienteEncontrado) {
        setLoading(false);
        return;
      }

      const clienteConvertido: Cliente = {
        ...clienteEncontrado,
        dataNascimento: new Date(clienteEncontrado.dataNascimento),
        rendaAnual: Number(clienteEncontrado.rendaAnual),
        patrimonio: Number(clienteEncontrado.patrimonio),
        codigoAgencia: Number(clienteEncontrado.codigoAgencia),
      };

      const contasCliente = contasData
        .filter((c) => c.cpfCnpjCliente === clienteConvertido.cpfCnpj)
        .map((c) => ({
          ...c,
          saldo: Number(c.saldo),
          limiteCredito: Number(c.limiteCredito),
          creditoDisponivel: Number(c.creditoDisponivel),
        }));

      const agenciaCliente = agenciasData.find(
        (a) => a.codigo === clienteConvertido.codigoAgencia,
      );

      setCliente(clienteConvertido);
      setContas(contasCliente);
      setAgencia(agenciaCliente ?? null);
      setLoading(false);
    });
  }, [id]);

  if (loading) return <p style={{ padding: "2rem" }}>Carregando...</p>;
  if (!cliente) return <p>Cliente não encontrado.</p>;

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
