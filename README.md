# PMBoK Game

Um projeto básico desenvolvido para um seminário sobre PMBoK (Project Management Body of Knowledge).

## O Projeto

O **PMBoK Game** é um jogo interativo com 2 fases inspirados no Conexo e Termo que busca ensinar conceitos do PMBoK de forma divertida e engajante:

### Fase 1: Conexões (Conexoes)

Combine 4 tiles com 4 categorias do PMBoK. Para cada categoria errada, você recebe uma dica.

### Fase 2: Dueto (Termo)

Adivinhe 4 palavras-chave relacionadas ao PMBoK em 9 tentativas. As letras corretas, presentes e ausentes são destacadas.

## Tecnologias

- **React** com TypeScript
- **Vite** para build rápido
- **Tailwind CSS** para estilização
- **GSAP** para animações suaves

## Como Executar

```bash
# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento
npm run dev

# Build para produção
npm run build
```

## Estrutura do Projeto

```
src/
├── App.tsx                 # Orquestrador de fases
├── components/             # Componentes reutilizáveis
├── phases/
│   ├── PhaseOneConexo.tsx  # Fase 1: Conexões
│   ├── PhaseTwoTermo.tsx   # Fase 2: Dueto (orquestrador)
│   └── termo/              # Componentes específicos do Dueto
├── game/                   # Dados e tipos do jogo
```

---

Projeto simples para fins educacionais em seminário.
