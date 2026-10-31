# ========================================================
# CALCULADORA SIMPLES EM PYTHON
# ========================================================

print("========================================")
print("     CALCULADORA BÁSICA EM PYTHON       ")
print("========================================")
print("Operações: (+) Soma  (-) Subtração  (*) Multiplicação  (/) Divisão  (%) Porcentagem\n")

num1 = float(input("Digite o primeiro número: "))
operacao = input("Digite a operação (+, -, *, /, %): ")
num2 = float(input("Digite o segundo número: "))

if operacao == "+":
    resultado = num1 + num2
    print(f"\n✅ Resultado: {num1} + {num2} = {resultado}")

elif operacao == "-":
    resultado = num1 - num2
    print(f"\n✅ Resultado: {num1} - {num2} = {resultado}")

elif operacao == "*":
    resultado = num1 * num2
    print(f"\n✅ Resultado: {num1} * {num2} = {resultado}")

elif operacao == "/":
    if num2 == 0:
        print("\n❌ Erro: Não é possível dividir um número por zero!")
    else:
        resultado = num1 / num2
        print(f"\n✅ Resultado: {num1} / {num2} = {resultado}")

elif operacao == "%":
    # Calcula num1% de num2 (exemplo: 15% de 200 = 30)
    resultado = (num1 * num2) / 100
    print(f"\n✅ Resultado: {num1}% de {num2} = {resultado}")

else:
    print("\n⚠️ Erro: Operação inválida! Escolha apenas +, -, *, / ou %.")
