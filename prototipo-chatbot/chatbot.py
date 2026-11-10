
# Chatbot inicial da PreparaPRO
# Protótipo de atendimento no terminal — ainda sem WhatsApp.

def mostrar_menu():
    print("\nOlá! Sou o assistente virtual da PreparaPRO.")
    print("Como posso te ajudar?")
    print("1 - Consultar informações sobre cursos")
    print("2 - Saber sobre aulas e provas")
    print("3 - Tenho interesse em comprar um curso")
    print("4 - Falar com o atendimento")
    print("0 - Encerrar conversa")


def responder(opcao):
    if opcao == "1":
        return (
            "Posso te ajudar com informações sobre os cursos "
            "da PreparaPRO. Qual curso te interessa?"
        )

    elif opcao == "2":
        return (
            "As informações sobre modalidades, aulas e datas "
            "de provas precisam ser confirmadas no catálogo "
            "atualizado da PreparaPRO."
        )

    elif opcao == "3":
        return (
            "Que bom que tu tens interesse! Vou encaminhar "
            "teu interesse para o atendimento administrativo."
        )

    elif opcao == "4":
        return (
            "Vou solicitar o atendimento da profa. Lena."
        )

    else:
        return "Não entendi tua escolha. Vamos tentar novamente?"


def iniciar_chatbot():
    while True:
        mostrar_menu()
        opcao = input("Digite o número da opção desejada: ").strip()

        if opcao == "0":
            print("Obrigado pelo contato! Até mais.")
            break

        if opcao not in ["1", "2", "3", "4"]:
            print("Opção inválida. Escolhe uma opção do menu.")
            continue

        resposta = responder(opcao)
        print("\nPreparaPRO:", resposta)




def responder_mensagem(mensagem):
    texto = mensagem.lower().strip()

    if any(palavra in texto for palavra in ["oi", "olá", "ola"]):
        return "Oi! Tudo bem? Como posso te ajudar?"

    elif any(palavra in texto for palavra in ["preço", "preco", "valor", "custa"]):
        return (
            "Posso te ajudar com os preços! "
            "Qual curso tu gostaria de consultar?"
        )

    elif any(palavra in texto for palavra in ["aula", "online", "presencial"]):
        return (
            "Tu quer saber sobre as aulas ou a modalidade "
            "de algum curso específico?"
        )

    elif any(palavra in texto for palavra in ["comprar", "inscrição", "inscricao"]):
        return (
            "Vou encaminhar teu interesse para o "
            "atendimento administrativo."
        )

    else:
        return (
            "Não consegui identificar tua dúvida. "
            "Posso te ajudar com cursos, preços, aulas "
            "ou encaminhar teu atendimento."
        )


def iniciar_conversa():
    print("\nOlá! Sou o assistente virtual da PreparaPRO.")
    print("Escreve 'sair' para encerrar a conversa.")

    while True:
        mensagem = input("\nTu: ").strip()

        if mensagem.lower() == "sair":
            print("PreparaPRO: Obrigado pelo contato! Até mais.")
            break

        resposta = responder_mensagem(mensagem)
        print("PreparaPRO:", resposta)


if __name__ == "__main__":
    iniciar_chatbot()
