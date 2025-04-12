import { useEffect, useState } from "react";
import { Cliente } from "../entities/Cliente";
import { GetClientes } from "../usecases/GetClientes";
import { ClienteRepository } from "../infrastructure/repositories/ClienteRepository";

export function useClientes() {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const usecase = new GetClientes(new ClienteRepository());
    usecase.execute().then((data) => {
      setClientes(data);
      setLoading(false);
    });
  }, []);

  return { clientes, loading };
}
