export interface CodeLineAnnotation {
  lineNumber: number;
  code: string;
  component: string;
  explanation: string;
  whyImportant: string;
  beginnerTip: string;
}

export interface CodeTemplate {
  id: 'basic' | 'functions' | 'loop';
  title: string;
  badge: string;
  description: string;
  filename: string;
  code: string;
  annotations: CodeLineAnnotation[];
}

export const CALCULATOR_TEMPLATES: Record<string, CodeTemplate> = {
  basic: {
    id: 'basic',
    title: 'Nível 1: Básico e Sequencial',
    badge: 'Ideal para o 1º dia',
    description: 'Código direto de cima para baixo. Excelente para entender variáveis, conversão de tipos (float), leitura de dados (input) e estruturas condicionais (if/elif/else).',
    filename: 'calculadora_simples.py',
    code: `# ==========================================
# CALCULADORA BÁSICA EM PYTHON
# Operações: Adição, Subtração, Multiplicação e Divisão
# ==========================================

print("--- Calculadora Simples em Python ---")
print("Operações disponíveis:")
print("+ : Adição")
print("- : Subtração")
print("* : Multiplicação")
print("/ : Divisão")

# 1. Leitura dos números digitados pelo usuário
# Usamos float() porque o input() sempre devolve texto (string)
num1 = float(input("\\nDigite o primeiro número: "))
operacao = input("Digite a operação (+, -, *, /): ")
num2 = float(input("Digite o segundo número: "))

# 2. Verificação da operação e cálculo do resultado
if operacao == "+":
    resultado = num1 + num2
    print(f"\\nResultado: {num1} + {num2} = {resultado}")

elif operacao == "-":
    resultado = num1 - num2
    print(f"\\nResultado: {num1} - {num2} = {resultado}")

elif operacao == "*":
    resultado = num1 * num2
    print(f"\\nResultado: {num1} * {num2} = {resultado}")

elif operacao == "/":
    # Regra matemática: não existe divisão por zero!
    if num2 == 0:
        print("\\nErro: Não é possível dividir um número por zero!")
    else:
        resultado = num1 / num2
        print(f"\\nResultado: {num1} / {num2} = {resultado}")

else:
    print("\\nErro: Operação inválida! Escolha apenas +, -, * ou /.")
`,
    annotations: [
      {
        lineNumber: 6,
        code: 'print("--- Calculadora Simples em Python ---")',
        component: 'Função print()',
        explanation: 'A função print() é usada para exibir mensagens e saídas visíveis na tela do terminal.',
        whyImportant: 'É a principal forma de comunicação do programa com a pessoa que o está utilizando.',
        beginnerTip: 'O texto a ser impresso deve estar sempre entre aspas simples (\') ou duplas (").'
      },
      {
        lineNumber: 15,
        code: 'num1 = float(input("\\nDigite o primeiro número: "))',
        component: 'input() e conversão com float()',
        explanation: 'O comando input() pausa o programa e aguarda o usuário digitar algo no teclado. A função float() converte esse texto em um número decimal.',
        whyImportant: 'TUDO o que o input() recebe vem no formato texto (string). Sem float(), se você digitar 5 e 2, o resultado de 5 + 2 seria "52" em vez de 7!',
        beginnerTip: 'Use int() se quiser apenas números inteiros (1, 2, 3) ou float() para permitir vírgula/ponto (1.5, 3.14).'
      },
      {
        lineNumber: 16,
        code: 'operacao = input("Digite a operação (+, -, *, /): ")',
        component: 'Variável de texto (String)',
        explanation: 'Aqui guardamos o símbolo matemático digitado pelo usuário na variável chamada `operacao`.',
        whyImportant: 'Como o símbolo (+, -, *, /) é um caractere e não um número, NÃO aplicamos float() aqui.',
        beginnerTip: 'Dê nomes claros às suas variáveis. Chamar de "operacao" é muito mais fácil de entender do que "x" ou "op1".'
      },
      {
        lineNumber: 20,
        code: 'if operacao == "+":',
        component: 'Condicional if e Comparação ==',
        explanation: 'O if ("se") verifica se uma afirmação é verdadeira. O operador == (dois sinais de igual) testa a igualdade.',
        whyImportant: 'Um único igual (=) serve para atribuir valor a uma variável. Dois iguais (==) servem para comparar se dois valores são idênticos!',
        beginnerTip: 'Nunca se esqueça dos dois pontos (:) no final da linha do if, e lembre-se de dar 4 espaços (indentação) no código que fica dentro dele.'
      },
      {
        lineNumber: 24,
        code: 'elif operacao == "-":',
        component: 'Estrutura elif (else if)',
        explanation: 'O elif é a contração de "else if" ("senão se"). Se o primeiro if não for verdadeiro, o Python testa esta próxima condição.',
        whyImportant: 'Evita criar vários ifs soltos desnecessários e economiza processamento, pois para assim que encontrar o operador certo.',
        beginnerTip: 'Você pode encadear quantos elif quiser entre o primeiro if e o último else.'
      },
      {
        lineNumber: 32,
        code: 'if num2 == 0:',
        component: 'Proteção contra divisão por zero',
        explanation: 'Antes de realizar a divisão, conferimos se o divisor (o segundo número) é zero.',
        whyImportant: 'Na matemática e no computador, dividir por zero gera um erro fatal (ZeroDivisionError) que trava o programa na hora.',
        beginnerTip: 'Sempre pense em cenários onde o usuário pode digitar algo inesperado e proteja seu código!'
      },
      {
        lineNumber: 40,
        code: 'else:',
        component: 'Bloco else (Caso padrão)',
        explanation: 'O else ("senão") é executado caso nenhuma das condições anteriores (if ou elif) tenha sido atendida.',
        whyImportant: 'Garante que o programa reaja educadamente se o usuário digitar algo como "x", "?" ou uma letra qualquer.',
        beginnerTip: 'O else não recebe nenhuma condição ao lado dele, apenas os dois pontos (:).'
      }
    ]
  },
  functions: {
    id: 'functions',
    title: 'Nível 2: Estruturado com Funções (def)',
    badge: 'Boas Práticas & Modular',
    description: 'Organiza cada cálculo em uma função dedicada. Esse é o padrão recomendado pela comunidade Python para manter código reutilizável e legível.',
    filename: 'calculadora_funcoes.py',
    code: `# ==========================================
# CALCULADORA COM FUNÇÕES (DEF)
# Boa prática: Código modular, limpo e reutilizável
# ==========================================

def somar(a, b):
    """Retorna a soma de dois números."""
    return a + b

def subtrair(a, b):
    """Retorna a diferença entre dois números."""
    return a - b

def multiplicar(a, b):
    """Retorna o produto de dois números."""
    return a * b

def dividir(a, b):
    """Retorna a divisão de a por b com validação de zero."""
    if b == 0:
        return "Erro: Impossível dividir por zero!"
    return a / b

def calculadora():
    print("=== Calculadora Modular em Python ===")
    
    n1 = float(input("Primeiro valor: "))
    op = input("Operação (+, -, *, /): ").strip()
    n2 = float(input("Segundo valor: "))
    
    if op == "+":
        print(f"Resultado: {n1} + {n2} = {somar(n1, n2)}")
    elif op == "-":
        print(f"Resultado: {n1} - {n2} = {subtrair(n1, n2)}")
    elif op == "*":
        print(f"Resultado: {n1} * {n2} = {multiplicar(n1, n2)}")
    elif op == "/":
        resultado = dividir(n1, n2)
        print(f"Resultado: {resultado}")
    else:
        print("Operação não reconhecida!")

# Ponto de entrada do programa
if __name__ == "__main__":
    calculadora()
`,
    annotations: [
      {
        lineNumber: 6,
        code: 'def somar(a, b):',
        component: 'Definição de Função (def)',
        explanation: 'A palavra-chave def avisa o Python que estamos criando uma receita reutilizável chamada somar, que aceita dois parâmetros (a e b).',
        whyImportant: 'Funções evitam repetição de código (princípio DRY: Don\'t Repeat Yourself) e tornam o projeto muito mais fácil de testar e manter.',
        beginnerTip: 'Os parâmetros a e b são como "espaços reservados" que só receberão valores reais quando você chamar a função.'
      },
      {
        lineNumber: 8,
        code: 'return a + b',
        component: 'Comando return',
        explanation: 'O return entrega a resposta calculada de volta para quem chamou a função.',
        whyImportant: 'Diferente de print() (que só joga texto na tela), o return permite que você guarde o resultado em uma variável ou use em outros cálculos.',
        beginnerTip: 'Quando o Python encontra a linha com return, a função é finalizada imediatamente.'
      },
      {
        lineNumber: 27,
        code: 'op = input("Operação (+, -, *, /): ").strip()',
        component: 'Método .strip()',
        explanation: 'O método .strip() remove espaços em branco acidentais antes e depois do texto digitado.',
        whyImportant: 'Se o usuário digitar " + " com espaço por engano, sem o strip o if falharia. Com o strip, ele limpa para "+".',
        beginnerTip: 'É uma excelente prática defensiva sempre usar .strip() em inputs de texto.'
      },
      {
        lineNumber: 41,
        code: 'if __name__ == "__main__":',
        component: 'Boilerplate padrão de inicialização',
        explanation: 'Verifica se o arquivo está sendo executado diretamente por você no terminal ou se foi importado por outro arquivo.',
        whyImportant: 'É a convenção mais famosa e profissional do Python para dar início à execução de scripts.',
        beginnerTip: 'Não se preocupe com os dois underlines (dunder) no início: trata-se apenas de variáveis especiais do próprio Python.'
      }
    ]
  },
  loop: {
    id: 'loop',
    title: 'Nível 3: Completo com Loop e try/except',
    badge: 'Robusto & Interativo',
    description: 'Calculadora de verdade para terminal: não fecha após uma única conta, repete com while True e não quebra se o usuário digitar letras por engano (try/except).',
    filename: 'calculadora_continua.py',
    code: `# ==========================================
# CALCULADORA CONTÍNUA E SEGURA
# Recursos: Loop contínuo (while) e tratamento de erros (try/except)
# ==========================================

def obter_numero(mensagem):
    """Garante que o usuário digite um número válido sem travar o programa."""
    while True:
        try:
            return float(input(mensagem))
        except ValueError:
            print("❌ Entrada inválida! Por favor, digite apenas números.")

def executar_calculadora():
    print("========================================")
    print("   CALCULADORA INTERATIVA EM PYTHON     ")
    print("========================================")
    
    while True:
        print("\\nOperações: [+] Soma  [-] Subtração  [*] Multiplicação  [/] Divisão  [S] Sair")
        opcao = input("Escolha a operação: ").strip().lower()
        
        if opcao == "s" or opcao == "sair":
            print("\\nObrigado por usar a calculadora. Bons estudos em Python!")
            break
            
        if opcao not in ["+", "-", "*", "/"]:
            print("⚠️ Operação desconhecida. Tente novamente.")
            continue
            
        # Pede os dois números com validação automática
        n1 = obter_numero("Digite o primeiro número: ")
        n2 = obter_numero("Digite o segundo número: ")
        
        if opcao == "+":
            print(f"\\n✅ Resultado: {n1} + {n2} = {n1 + n2}")
        elif opcao == "-":
            print(f"\\n✅ Resultado: {n1} - {n2} = {n1 - n2}")
        elif opcao == "*":
            print(f"\\n✅ Resultado: {n1} * {n2} = {n1 * n2}")
        elif opcao == "/":
            if n2 == 0:
                print("\\n❌ Erro: Divisão por zero não permitida na matemática!")
            else:
                print(f"\\n✅ Resultado: {n1} / {n2} = {n1 / n2}")

if __name__ == "__main__":
    executar_calculadora()
`,
    annotations: [
      {
        lineNumber: 9,
        code: 'try:\n    return float(input(mensagem))\nexcept ValueError:',
        component: 'Tratamento de Exceções (try / except)',
        explanation: 'O bloco try tenta executar a conversão. Se o usuário digitar "abc", em vez de parar o programa com erro vermelho, o Python pula para o except.',
        whyImportant: 'Garante que o software seja resistente a erros humanos (tolerância a falhas).',
        beginnerTip: 'ValueError é o nome específico da falha quando o float() não consegue interpretar o texto como número.'
      },
      {
        lineNumber: 19,
        code: 'while True:',
        component: 'Laço Infinito (while True)',
        explanation: 'Cria uma repetição contínua. O programa continua rodando até encontrar explicitamente a palavra `break`.',
        whyImportant: 'Sem isso, a calculadora fecharia logo após uma única conta, obrigando o usuário a reabrir o script toda vez.',
        beginnerTip: 'Sempre garanta que exista uma condição de saída com break, para não travar o computador em um loop eterno!'
      },
      {
        lineNumber: 24,
        code: 'break',
        component: 'Instrução break',
        explanation: 'Interrompe e sai imediatamente de dentro do loop while.',
        whyImportant: 'Dá ao usuário o controle de quando quer encerrar o programa digitando "s" ou "sair".',
        beginnerTip: 'Use break para sair do loop e continue para pular direto para a próxima volta.'
      },
      {
        lineNumber: 28,
        code: 'if opcao not in ["+", "-", "*", "/"]:',
        component: 'Operador de pertinência not in',
        explanation: 'Verifica de forma elegante se a opção digitada NÃO faz parte da lista de opções permitidas.',
        whyImportant: 'Muito mais conciso do que escrever 4 comparações repetitivas com != e "and".',
        beginnerTip: 'O Python se destaca por ler quase como inglês natural: "se opcao não estiver na lista...".'
      }
    ]
  }
};

export const PYTHON_FUNDAMENTALS = [
  {
    topic: '1. Indentação (A Regra de Ouro)',
    summary: 'No Python não existem chaves { } para abrir e fechar blocos de código. O Python usa espaçamento à esquerda (4 espaços são o padrão da comunidade PEP 8).',
    example: `if condicao:\n    # 4 espaços aqui dentro!\n    fazer_algo()`,
    badge: 'Essencial'
  },
  {
    topic: '2. Conversão de Tipos (Casting)',
    summary: 'A função input() sempre lê dados como texto (tipo str). Se você tentar somar "10" + "5", o Python junta os textos e vira "105". Para calcular, converta com float() ou int().',
    example: `texto = input("Número: ") # tipo str\nnumero = float(texto)       # tipo float com decimais`,
    badge: 'Fundamento'
  },
  {
    topic: '3. Formatação Moderna (f-strings)',
    summary: 'Colocar uma letra f antes das aspas permite inserir variáveis diretamente dentro do texto usando chaves {nome_da_variavel}.',
    example: `nome = "Python"\nprint(f"Adoro programar em {nome}!")`,
    badge: 'Dica Prática'
  },
  {
    topic: '4. Divisão por Zero',
    summary: 'Dividir qualquer número por 0 é matematicamente indefinido. No Python, isso levanta o erro ZeroDivisionError. Sempre verifique se o segundo número é zero antes de dividir.',
    example: `if divisor == 0:\n    print("Não é possível!")\nelse:\n    resultado = dividendo / divisor`,
    badge: 'Segurança'
  }
];

export const HOW_TO_RUN_GUIDE = [
  {
    step: '1. Instale o Python',
    detail: 'Baixe a versão mais recente e gratuita no site oficial python.org. Lembre-se de marcar a opção "Add Python to PATH" durante a instalação no Windows.'
  },
  {
    step: '2. Salve o arquivo',
    detail: 'Crie uma pasta de estudos, abra o bloco de notas ou VS Code, cole o código e salve com a extensão .py (por exemplo: calculadora.py).'
  },
  {
    step: '3. Abra o terminal',
    detail: 'No Windows abra o Prompt de Comando (CMD) ou PowerShell; no Mac/Linux abra o Terminal. Navegue até a pasta onde salvou o arquivo.'
  },
  {
    step: '4. Execute o comando',
    detail: 'Digite python calculadora.py (ou python3 calculadora.py no Mac/Linux) e pressione Enter para interagir!'
  }
];

export const QUIZ_QUESTIONS = [
  {
    id: 1,
    question: 'O que a função input() do Python sempre retorna por padrão?',
    options: [
      'Um número inteiro (int)',
      'Um texto / cadeia de caracteres (str)',
      'Um número decimal (float)',
      'Um valor booleano (True ou False)'
    ],
    correctIndex: 1,
    explanation: 'Correto! Qualquer coisa digitada no input(), mesmo que sejam dígitos numéricos como "42", chega ao Python no formato string (texto).'
  },
  {
    id: 2,
    question: 'Qual é o operador em Python para verificar se dois valores são iguais em uma condição?',
    options: [
      '=',
      '==',
      ':=',
      'equals'
    ],
    correctIndex: 1,
    explanation: 'Exato! O sinal único (=) atribui valor a uma variável. Para comparação lógica de igualdade, usamos sempre dois iguais (==).'
  },
  {
    id: 3,
    question: 'Por que precisamos testar se o segundo número é 0 antes de realizar uma divisão?',
    options: [
      'Porque o Python fecha automaticamente a janela do computador.',
      'Porque a divisão por zero gera uma exceção ZeroDivisionError e trava o programa.',
      'Porque o resultado seria sempre 1.',
      'Não é necessário, o Python já devolve infinito.'
    ],
    correctIndex: 1,
    explanation: 'Muito bem! Em Python, dividir por zero causa a exceção ZeroDivisionError e encerra o script bruscamente se não tratada.'
  },
  {
    id: 4,
    question: 'Como o Python identifica quais linhas de código pertencem ao bloco de um if ou de uma função?',
    options: [
      'Colocando ponto e vírgula no fim de cada linha',
      'Envolvendo o bloco entre chaves { }',
      'Através da indentação (espaçamento à esquerda, normalmente 4 espaços)',
      'Usando tags <bloco> e </bloco>'
    ],
    correctIndex: 2,
    explanation: 'Perfeito! A sintaxe do Python é famosa por sua elegância visual: o escopo dos blocos de código é determinado unicamente pelo recuo/indentação.'
  }
];
