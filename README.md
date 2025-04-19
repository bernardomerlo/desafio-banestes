# Desafio Banestes – Frontend (React + TypeScript)

Lista e detalhamento de clientes, contas bancárias e agências de um banco fictício.

## Contexto

- Consome CSVs públicos no Google Sheets.
- Lista clientes com busca, paginação e filtros avançados.
- Página de detalhes do cliente com contas e agência.
- Estrutura mínima de DDD / Clean Architecture.
- Testes automatizados (Jest + Testing Library).

## Stack

- React 19 + Vite
- TypeScript 5
- Tailwind CSS 3
- Jest 29, @testing‑library/react
- (opcional) Cypress para E2E

## Pré‑requisitos

```bash
Node 19+
npm 9+
git
```

## Instalação

```
git clone https://github.com/bernardomerlo/desafio-banestes.git
cd desafio-banestes
npm install
```

## Scripts

| Comando          | Ação                                     |
| ---------------- | ---------------------------------------- |
| npm run dev      | servidor de desenvolvimento (porta 5173) |
| npm run build    | build de produção em dist/               |
| npm run preview  | serve o build localmente                 |
| npm test         | roda Jest uma vez                        |
| npm run coverage | relatório de cobertura                   |
| npm run lint     | ESLint + Prettier                        |

