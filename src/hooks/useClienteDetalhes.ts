import { useEffect, useState } from "react";
import {
  ClienteDetalhes,
  GetClienteDetalhes,
} from "../usecases/GetDetalhesCliente";
import { ClienteRepository } from "../infrastructure/repositories/ClienteRepository";
import { ContaRepository } from "../infrastructure/repositories/ContaRepository";
import { AgenciaRepository } from "../infrastructure/repositories/AgenciaRepository";

export function useClienteDetalhes(id: string) {
  const [data, setData] = useState<ClienteDetalhes | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const usecase = new GetClienteDetalhes(
      new ClienteRepository(),
      new ContaRepository(),
      new AgenciaRepository(),
    );
    usecase.execute(id).then((res) => {
      setData(res);
      setLoading(false);
    });
  }, [id]);

  return { data, loading };
}
