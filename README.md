# 🧮 calculadora-python-basica

> Calculadora simples e intuitiva desenvolvida em Python para demonstrar as quatro operações matemáticas básicas, leitura de dados e estruturas de decisão.

![Python Version](https://img.shields.io/badge/python-3.8+-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![Status](https://img.shields.io/badge/status-concluído-brightgreen.svg)

---

## 📌 Sobre o Projeto

Este projeto foi desenvolvido como parte dos meus estudos iniciais na linguagem **Python**. O objetivo é criar uma ferramenta funcional de terminal que calcula soma, subtração, multiplicação e divisão, aplicando boas práticas de programação e validações defensivas.

### ✨ Funcionalidades
- ➕ **Adição** (`+`): soma de números inteiros ou decimais.
- ➖ **Subtração** (`-`): diferença entre dois números.
- ✖️ **Multiplicação** (`*`): produto entre dois fatores.
- ➗ **Divisão** (`/`): quociente exato com **proteção contra divisão por zero**.
- 🛡️ **Validação de Operação**: mensagem de aviso caso uma operação inválida seja digitada.

---

## 🧠 Conceitos de Programação Aplicados

- **Leitura de dados (`input`)**: captura de informações digitadas pelo usuário no terminal.
- **Conversão de tipos (`float`)**: conversão da string recebida em número de ponto flutuante.
- **Estruturas de decisão (`if`, `elif`, `else`)**: direcionamento do fluxo de acordo com o operador escolhido.
- **Prevenção de bugs**: checagem prévia (`num2 == 0`) antes da operação de divisão para evitar o `ZeroDivisionError`.
- **Interpolação moderna (`f-strings`)**: formatação legível e elegante de texto com variáveis.

---

## 🚀 Como Executar o Projeto

### Pré-requisitos
Certifique-se de ter o **Python 3** instalado em sua máquina ([Download oficial aqui](https://www.python.org/downloads/)).

### Passo a passo

1. **Clone o repositório** (ou baixe os arquivos em ZIP):
```bash
git clone https://github.com/seu-usuario/calculadora-python-basica.git
```

2. **Acesse a pasta do projeto**:
```bash
cd calculadora-python-basica
```

3. **Execute o script**:
```bash
python calculadora.py
```
*(No Linux ou macOS, utilize `python3 calculadora.py` se necessário).*

---

## 💻 Exemplo de Uso no Terminal

```text
========================================
     CALCULADORA BÁSICA EM PYTHON       
========================================
Operações disponíveis:
  + : Adição
  - : Subtração
  * : Multiplicação
  / : Divisão
----------------------------------------

Digite o primeiro número: 15
Digite a operação (+, -, *, /): +
Digite o segundo número: 7

✅ Resultado: 15.0 + 7.0 = 22.0
```

---

## 📂 Estrutura de Arquivos

```text
calculadora-python-basica/
├── calculadora.py        # Código principal da calculadora
├── README.md             # Documentação do projeto
└── .gitignore            # Arquivos ignorados pelo Git
```

---

## 📝 Licença

Este projeto está sob a licença [MIT](https://opensource.org/licenses/MIT). Sinta-se livre para estudar, modificar e compartilhar!

Feito com dedicação por [Paula](https://github.com/) 🚀
