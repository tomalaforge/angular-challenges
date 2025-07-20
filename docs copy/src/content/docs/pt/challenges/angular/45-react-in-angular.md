---
title: 🔴 React em angular
description: Desafio 5 é sobre aprender como se beneficiar das várias bibliotecas em React
author: wandrille-guesdon
contributors:
  - tomalaforge 45
command: angular-react-in-angular
sidebar:
  order: 209
---

O objetivo deste desafio é usar um componente React dentro de uma aplicação Angular.

Muitos componentes estão disponíveis em React, e pode ser interessante usar eles em uma aplicação Angular. O objetivo é criar um componente React e usar em uma aplicação Angular.

## Informação

Neste desafio temos uma simples aplicação e um componente React `ReactPost` em `app/react` para ilustrar um componente React de uma biblioteca.

## Declaração

- Sua tarefa é mostrar as postagens com o componente React `ReactPost`.
- Quando selecionar uma postagem, a postagem deve ser destacada.

Para brincar com o componente React, você deve começar instalando as dependências do React.

```bash
npm i --save react react-dom
npm i --save-dev @types/react @types/react-dom
```

## Restrições

- Não transforme o componente React em um componente Angular. O componente React é bem simples e pode ser escrito facilmente em Angular. No entanto, o **objetivo é usar o componente React**.

### Dica

<details>
  <summary>Dica 1 - Configuração</summary>
  Permita arquivos React no tsconfig.json

```
{
...
"compilerOptions": {
  ...
  "jsx": "react"
},
...
}
```

</details>

<details>
  <summary>Dica 2 - Initialização</summary>
  Crie uma raiz react com `createRoot(...)`
</details>

<details>
  <summary>Dica 3 - Visualização</summary>
  Para renderizar o componente, ele deve parecer com:
    ```
    <react root>.render(
        <React.StrictMode>
        ...
        </React.StrictMode>
    )
    ```

</details>

<details>
  <summary>Dica 4 - Design</summary>
  Não esqueça de permitir o arquivo react no Tailwind.
</details>
