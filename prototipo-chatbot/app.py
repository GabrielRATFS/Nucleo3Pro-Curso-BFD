
from fastapi import FastAPI
from pydantic import BaseModel
from chatbot import responder_mensagem

app = FastAPI()


class MensagemEntrada(BaseModel):
    mensagem: str


@app.get("/")
def inicio():
    return {"mensagem": "Chatbot PreparaPRO está funcionando!"}


@app.post("/mensagem")
def processar_mensagem(dados: MensagemEntrada):
    resposta = responder_mensagem(dados.mensagem)

    return {"resposta": resposta}
