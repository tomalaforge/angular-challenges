---
title: Verificar resposta dos outros
description: Guia para verificar a resposta de outra pessoa
sidebar:
  order: 3
---

Todas as respostas dos Desafios Angular são apresentadas na forma de _Pull Request_ (PR). Para ver e segui-las, navegue pela página **Files Changes** no GitHub. Entretanto, entender e seguir esse processo pode não ser direto se você não estiver familiarizado com a interface. Assim, você pode preferir verificar a _branch_ e revisar a solução na sua IDE de preferência.

Este guia foi criado para ajudar você a conseguir ver as respostas que desejar.

## Confire PR de outra pessoa localmente

### Sincronize seu repositório

Primeiro, você precisa sincronizar seu _fork_ para garantir que ele está atualizado com o repositório bifurcado.

Isso pode ser feito clicando no botão **Sync fork** na página principal de seu _fork_.

![Sync project header](../../../../assets/fork-sync.png)

A imagem acima mostra que minha _branch_ está atrás da _branch_ principal por 8 _commits_, e será necessário sincronizá-la para ficar atualizada.

![Sync project update modal](../../../../assets/sync-fork-update.png)

### Confira localmente

Vá até o PR que desejar conferir localmente e pegue seu ID. Você o achará no título do PR (como mostrado abaixo).

![PR header](../../../../assets/PR-header.png)

Depois, abra um terminal, vá até o diretório de seu projeto e execute o seguinte comando:

```bash
gh pr checkout <ID>
```

Se você não lembrar o comando, clique no butão <span class="github-neutral-btn"><> Code</span> no lado direito do cabeçalho e você poderá copiar/colar o comando.

![PR code modal](../../../../assets/PR-code-btn-modal.png)

:::note[Nota]
Se o comando não funcionar, a CLI do GitHub vai guidar você durante o processo.
:::

🔥 Agora você pode navegar nas soluções localmente e rodá-las para testar. 🔥

<!-- gh repo set-default -->
