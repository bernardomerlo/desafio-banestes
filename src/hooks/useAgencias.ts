import { useEffect, useState } from "react";
import { GetAgencias } from "../usecases/GetAgencias";
import { AgenciaRepository } from "../infrastructure/repositories/AgenciaRepository";
import { Agencia } from "../entities/Agencia";

export function useAgencias() {
  const [agencias, setAgencias] = useState<Agencia[]>([]);
  const [loading, setLoading] = useState(true);
  const repo = new AgenciaRepository();
  const usecase = new GetAgencias(repo);

  useEffect(() => {
    usecase.execute().then((ags) => {
      setAgencias(ags);
      setLoading(false);
    });
  }, []);

  return { agencias, loading };
}
