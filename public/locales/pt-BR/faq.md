## O que é o Simulador de autocustódia de Bitcoin?

É um ambiente de testes para você explorar os diversos componentes de hardware e software envolvidos na autocustódia de Bitcoin. Ele mostra como essas peças se encaixam, o que cada uma faz e como elas se comunicam. Use-o para testar diferentes configurações e entender como os dados circulam entre seus dispositivos.

## Como usar esta ferramenta?

No painel principal, você pode clicar nos ícones para explorar as opções de hardware e software. Conforme você faz suas escolhas, a ferramenta mostra:
- Os principais recursos e as especificações técnicas de cada componente.
- Um filtro de compatibilidade em tempo real, que destaca o que funciona com a sua configuração atual.
- Os métodos de conexão (por exemplo, USB, códigos QR ou microSD).
- Uma avaliação de segurança dinâmica da configuração como um todo.

**Como funciona:**
- Os ícones com **efeito pulsante** estão disponíveis. Clique em um deles para **selecioná-lo**.
- Os ícones **ativos (destacados)** formam a sua configuração atual. Clique em um ícone ativo para **removê-lo**; a ferramenta mantém as suas outras escolhas para que você possa trocar componentes com facilidade.
- Os ícones **esmaecidos (inativos)** são incompatíveis com a sua seleção atual; você também pode clicar neles para **redefinir** a categoria inteira.
- Depois de escolher um **dispositivo de assinatura**, uma **carteira de software** e um **nó**, sua configuração está completa. Aí é só conferir a análise de segurança completa no topo e o detalhamento dos recursos embaixo.
- Se em algum momento você se perder, basta **recarregar a página** para começar do zero :)

**Observação sobre multisig:** 
A página de multisig funciona de um jeito um pouco diferente. Recomendamos escolher primeiro a **carteira de software**, porque é ela que define quais dispositivos de assinatura são compatíveis com aquele coordenador.

## Por que tantos componentes? Não dá para usar só um app de carteira?

Alguns apps de celular simplificam a experiência escondendo a complexidade, mas uma configuração completa de Bitcoin sempre envolve três funções distintas:
1. **Gestão de chaves e assinatura:** gerar e guardar suas chaves privadas e assinar transações.
2. **Coordenação de transações:** acompanhar o histórico, gerenciar saldos e montar novas transações.
3. **Validação na rede:** comunicar-se com a rede Bitcoin para verificar os valores recebidos e transmitir novas transações.

Um "app de carteira" comum no celular costuma cumprir as três funções ao mesmo tempo. É prático, mas essa abordagem "tudo em um" é menos segura, porque suas chaves privadas ficam guardadas em um aparelho conectado à internet.

Ao separar essas funções — principalmente usando um **dispositivo de assinatura** para as chaves e o seu próprio **nó** para a validação —, você reforça muito a sua segurança. Esta ferramenta existe para ajudar você a visualizar e adotar essas práticas mais robustas.

## O que significa a barra de progresso? (E por que "120%"?)

A barra de progresso mostra o quanto a sua configuração está completa e segura.
- Uma configuração é considerada "funcional" (100%) quando você tem um dispositivo de assinatura, uma carteira e uma conexão com um nó.
- Mostramos **120%** (ou mais) como um aceno às boas práticas: você *pode* começar com um nó público (100%), mas rodar o **seu próprio nó** oferece mais privacidade e soberania e leva a sua configuração além do padrão.

## O que significam os botões ao lado da seção "App de carteira"?

Os botões ao lado da seção App de carteira permitem indicar em que tipo de aparelho você usa a carteira: o primeiro ícone representa o computador (desktop) e o segundo, o celular. Cada tipo de aparelho é compatível com um conjunto diferente de carteiras.

## Posso usar só uma carteira de software?

Sim. Do ponto de vista funcional, uma carteira de software consegue gerar chaves e assinar transações sozinha. Nesta ferramenta, a opção **"Sem assinador"** representa essa abordagem de "carteira quente".

## Como vocês escolhem quais hardwares e softwares entram na lista?

Damos prioridade a ferramentas **exclusivas para Bitcoin** (*Bitcoin-only*) ou com foco claro em Bitcoin.
- **Carteiras de software:** precisam ser exclusivas para Bitcoin.
- **Dispositivos de assinatura:** precisam ser exclusivos para Bitcoin ou oferecer um firmware só para Bitcoin.
Também levamos em conta a reputação no mercado, se o projeto é de código aberto e se ele oferece suporte a recursos modernos como Taproot e Miniscript.

## A caixa de "Recursos" mostra tudo?

Não. A caixa de recursos serve principalmente para comparar produtos da mesma categoria. Algumas propriedades muito básicas ou praticamente universais — por exemplo, suporte aos tipos de endereço mais comuns ou a passphrase — são consideradas óbvias e, por isso, não aparecem.

## O que significa exatamente "air-gapped"?

Em um dispositivo de assinatura, *air-gapped* (isolado fisicamente) significa que ele nunca tem uma conexão direta e permanente (como USB ou Bluetooth) com um computador ou celular conectado à internet. Os dados são transferidos por meios que dispensam qualquer conexão, como:
- **Códigos QR:** os dados são lidos com uma câmera.
- **Cartões microSD:** o cartão é levado fisicamente de um aparelho para o outro.

Assim, mesmo que o seu computador esteja comprometido, um atacante não consegue chegar às suas chaves privadas por um cabo.

## Posso usar um aparelho antigo e offline como dispositivo de assinatura?

Com certeza. Se você pegar um celular ou notebook antigo, formatá-lo, instalar um app de carteira e mantê-lo sempre offline, ele funciona pelo mesmo princípio de um dispositivo de assinatura dedicado. A segurança depende do rigor com que você mantém esse isolamento (*air gap*).

## O que é multisig? E o que é um "limiar"?

O Bitcoin permite criar endereços que exigem mais de uma assinatura para gastar os fundos.
- **Assinatura única:** uma chave, uma assinatura. Se você perder a chave ou ela for roubada, seus fundos já eram.
- **Multisig:** várias chaves são combinadas em um único endereço. Você pode definir um **limiar** (por exemplo, 2 de 3), ou seja, são necessárias 2 quaisquer das 3 chaves para movimentar o dinheiro.

Isso oferece **segurança** (um atacante precisaria roubar várias chaves) e **redundância** (se você perder uma chave, ainda pode recuperar seus fundos com as outras).

## O que é um "descritor de carteira"?

Um descritor é um texto legível que funciona como a "receita" da sua carteira: ele descreve exatamente como seus endereços são derivados das suas chaves públicas.

Numa configuração multisig, fazer backup das chaves não basta: você **também precisa** fazer backup do descritor. Sem ele, você pode ter todas as chaves e mesmo assim não saber qual caminho exato leva ao seu saldo. Os descritores contêm apenas informações públicas e não permitem gastar seus fundos, mas devem ser mantidos em sigilo para proteger o seu histórico financeiro.

## Este site coleta meus dados?

Não. É uma ferramenta educativa que roda inteiramente no seu navegador. Não há scripts de rastreamento, banco de dados nem módulos de coleta de dados.

Além disso, o projeto é totalmente de código aberto. Se preferir, você pode baixar o código e rodá-lo localmente em um computador offline.
- **Código-fonte:** [https://github.com/zengmi2140/hodl](https://github.com/zengmi2140/hodl)
