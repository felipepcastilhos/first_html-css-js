//script para estrutura de dados, estruturando como ficarão os dados 
const perguntas = [ //10º//objeto {}, com array(como um armario de supermercado) [], atribuido a uma variavel
  {
    pergunta: "O que significa o acrônimo DOM em JavaScript?", //pergunta esta como propriedade do  objeto, e "O..." como o valor da propriedade"
    respostas: [
      "Documento Orientado a Modelos", //cada virgula separa os valores do array desta propriedade
      "Domínio de Objetos Móveis", // == alert[perguntas[0].respostas[1]] == 2
      "Modelo de Objeto de Documento",
    ],
    correta: 2 // valor ideal/correto para propriedade == alert[perguntas[0].correta] == 2
  },
  {
    pergunta: "Qual é a função do operador 'typeof' em JavaScript?",
    respostas: [
      "Retorna o tipo de dado de uma variável",
      "Concatena duas strings",
      "Calcula a média de um conjunto de números",
    ],
    correta: 0
  },
  {
    pergunta: "Como se declara uma variável em JavaScript?",
    respostas: [
      "var minhaVariavel;",
      "const minhaVariavel = 10;",
      "let minhaVariavel = true;",
    ],
    correta: 1
  },
  {
    pergunta: "O que é uma função de callback em JavaScript?",
    respostas: [
      "Uma função que retorna um valor booleano",
      "Uma função que recebe outra função como argumento",
      "Uma função que realiza operações de callback",
    ],
    correta: 1
  },
  {
    pergunta: "Qual é a diferença entre 'let' e 'const' na declaração de variáveis?",
    respostas: [
      "'let' é usado para variáveis constantes, enquanto 'const' é usado para variáveis mutáveis",
      "'const' é usado para variáveis locais, enquanto 'let' é usado para variáveis globais",
      "'let' permite reatribuição de valor, enquanto 'const' impede a reatribuição",
    ],
    correta: 2
  },
  {
    pergunta: "O que é o conceito de 'closure' em JavaScript?",
    respostas: [
      "Uma maneira de agrupar várias funções em um único bloco de código",
      "O processo de otimização de código pelo interpretador JavaScript",
      "Uma função que tem acesso às variáveis de sua função externa, mesmo após a função externa ter sido concluída",
    ],
    correta: 2
  },
  {
    pergunta: "Como se realiza a iteração sobre os elementos de um array em JavaScript?",
    respostas: [
      "Usando a instrução 'for...of'",
      "Usando a instrução 'if...else'",
      "Usando a instrução 'switch'",
    ],
    correta: 0
  },
  {
    pergunta: "Qual é a finalidade do método 'map()' em arrays JavaScript?",
    respostas: [
      "Alterar o tamanho do array",
      "Mapear cada elemento do array para um novo valor",
      "Filtrar elementos do array com base em uma condição",
    ],
    correta: 1
  },
  {
    pergunta: "O que é um objeto em JavaScript?",
    respostas: [
      "Um tipo de dado que representa um número",
      "Uma estrutura de controle de fluxo",
      "Uma coleção de pares chave-valor",
    ],
    correta: 2
  },
  {
    pergunta: "Como se utiliza o método 'addEventListener' para lidar com eventos em JavaScript?",
    respostas: [
      "Apenas para eventos de teclado",
      "Adicionando uma função de callback ao elemento alvo para um determinado evento",
      "Removendo todos os eventos de um elemento",
    ],
    correta: 1
  },
];

/*for(const item of perguntas) {
  alert(item)
}*/ //este código alerta 10 objetos


const quiz = document.querySelector('#quiz') //15º// pega o elemento quiz do html, pelo id quiz ('#quiz')
const template = document.querySelector('template')// 12º//esta linha pega o template definido no HTML (codigo de estilização definido neste valor ('')) // este document é um objeto que faz parte da estrutura DOM dos navegadores //queryselector uma função de pesquisa do document, e pesquisa pelo seletor ('...')

const corretas = new Set() //26°//faz quando selecionado um termo da lista e após outro, manter apenas a última e não ficar acumulando a resposta
const totalDePerguntas = perguntas.length//30º//length faz o somatório de todos a partir do 1 ao 10/delimita 10 de fato como máximo de acertos
const mostrarTotal = document.querySelector('#acertos span')//31º//vai selecionar/pegar a formatação do bloco
mostrarTotal.textContent = corretas.size + ' de ' + totalDePerguntas//32º//substituir de fato os valores destas variaveis 

for(const item of perguntas) { //11º// para cada item de perguntas//cada item é nesse caso um objeto {} são 10 no caso
   const quizItem = template.content.cloneNode(true) // 13º//nó vai ser clonado o conteudo do template, com o true (clonando todos os nodes, filhos la de dentro)
   quizItem.querySelector('h3').textContent = item.pergunta //17º// mudar titulo de cada pergunta // query selector pesquisa pelo h3 // textcontent ter o conteúdo em texto // = atribui o novo valor (pergunta)
   
   for(let resposta of item.respostas) { //18º// lógica a ser atribuida pra cada resposta(3 possíveis) de cada pergunta
     const dt = quizItem.querySelector('dl dt').cloneNode(true) //19º//pega todo desrciption term na variável dt, clonando o que há dentro do nó dt, referenciando que dt é filho de dl
     dt.querySelector('span').textContent = resposta //20º// altera o conteúdo de texto do dt span de cada resposta (mas não coloca na tela)
     dt.querySelector('input').setAttribute('name','pergunta-' + perguntas.indexOf(item))//23º// estou selecionando o input para alterar um atributo e colocar o valor neste, concatenando com o índice do array de perguntas
     dt.querySelector('input').value = item.respostas.indexOf(resposta) //24º// seta índices(0,1,2) para todas respostas de cada pergunta
     dt.querySelector('input').onchange = (event) => {
       //alert(event.target.value)//esta linha alertaria o valor do input selecionado
       const estaCorreta = event.target.value == item.correta//compara através de uma variável(event.. é string) se o target selecionado tem o mesmo valor da resposta correta (number) definida, por isso duplo =(==) pois desconsidera tipo
       //alert(estaCorreta)//esta linha indicaria se a resposta está correta ou não
       
       corretas.delete(item)//28°// vai verificar se já obteve alguma resposta neste description list, desconsiderar se já tiver, para posteriormente quando adicionar não acumular acerto prévio em caso de erro posterior no mesmo dl
       if(estaCorreta) {//Se estaCorreta for true vai executar  
         corretas.add(item)//27º//se for true vai adicionar todo item/objeto/perguntas[x] porém se acerta>erra não desconta o acerto>erro
       }
       mostrarTotal.textContent = corretas.size + ' de ' + totalDePerguntas//33º//substituir repetidamente de fato os valores destas variaveis 
     } //25ºdetectar mudança de input para realizar uma função(('input').onchange)//onchange já dentro do universo da DOM, espera que haja uma função/após o igual// arrowfunction

     quizItem.querySelector('dl').appendChild(dt) //21º// procura o dl nos nós copiados do quizitem e vai adicionar um filho que é o dt
   }
   
   quizItem.querySelector('dl dt').remove() //22º// procura dl dt e com o remove() remove a posição 0, no caso o primeiro
   quiz.appendChild(quizItem) //16º//coloca a pergunta na tela (por causa do for, as 10)
}