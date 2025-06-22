<div align="center">
  <h1>finance a.i</h1>
  <p>finance a.i é uma plataforma de gestão financeira com insights gerados por IA para monitorar suas movimentações, e oferecendo análises preditivas e relatórios automatizados para otimização de processos financeiros.</p>
  <img src="./design/desktop.png" alt="Logo" width="800">
</div>

# 📒 Índice
* [Descrição](#descrição)
* [Requisitos Funcionais](#requisitos)
  * [Features](#features)
* [Tecnologias](#tecnologias)
* [Design](#design)
  * [Cores](#cores)
  * [Fontes](#fontes)
  * [Ícones](#ícones)
* [Instalação](#instalação)
* [Licença](#licença)

# 📃 <span id="descrição">Descrição</span>
finance a.i é uma plataforma de gestão financeira com insights gerados por IA para monitorar suas movimentações, e oferecendo análises preditivas e relatórios automatizados para otimização de processos financeiros. Permitindo assinatura, com planos, aplicação visualização com um dashboard resumido, com gráficos, gastos por categoria, ultimas transações, filtros e saldo disponível. Aplicação desenvolvida utilizando a API tecnologia [**TypeScript**](https://www.typescriptlang.org/), com [**Next.js**](https://nextjs.org/) Framework React com renderização híbrida (SSR/SSG), [**Prisma Orm**](https://www.prisma.io/) moderno para TypeScript com type-safety, [**Stripe**](https://stripe.com/) - Gateway de pagamento completo.

# 📌 <span id="requisitos">Requisitos Funcionais</span>
- [x] Sistema completo de autenticação e gerenciamento de usuários<br>
- [x] Salva os dados do usuário<br>
- [x] Assinatura<br>
- [x] Adição de transação<br>
- [x] Categorização de transação<br>

## Features
- [x] Dashboard com gráficos<br>
- [x] Filtragem por categoria<br>
- [x] Relatório com insights baseado machine learning<br>
- [x] Interface Moderna<br>

# 💻 <span id="tecnologias">Tecnologias</span>
- **TypeScript**
- **Next.js**
- **Prisma Orm**
- **MySQL**
- **Clerk**
- **zod**
- **Stripe**
- **openai**
- **shad.cn**
- **radix**
- **tailwind**
- **lucide-react**

# 🎨 <span id="design">Design</span>
- O modelo final para versão desktop e mobile está disponível na pasta `./design`

- <span id="cores">Cores<br></span>
  * #0C0A09<br>
  * #F2F2F2<br>
  * #55B02E<br>

- <span id="fontes">Fontes<br></span>
  * Arial, Helvetica, sans-serif

- <span id="ícones">Ícones<br></span>
  * lucide-react

# 🚀 <span id="instalação">Instalação</span>
```bash
  # Clone este repositório:
  $ git clone https://github.com/CleilsonAndrade/finance-ai.git
  $ cd ./finance-ai

   # Instalar as dependências:
  $ yarn install

  # Gerar o código TypeScript com base nos modelos do Prisma:
  $ npx prisma generate

  # Aplicar migrações ao banco de dados:
  $ npx prisma migrate dev

  # Executar:
  $ yarn dev
```

# 📝 <span id="licença">Licença</span>
Esse projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

<p align="center">
  Feito com 💜 by CleilsonAndrade
</p>