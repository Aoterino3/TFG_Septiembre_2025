from enum import Enum

def runModel(user_prompt:str, sys_prompt:str, model: int) -> str:
    """
    Ejecuta el modelo con los datos de entrada.

    Args:
        - data: Datos de entrada.

    Returns:
        Respuesta del modelo.
    """
    if model == Models.CHAT_GPT.value:
        from models.chat_gpt_api import run
    elif model == Models.LLAMA2.value:
        from models.ollama_api import run
    elif model == Models.LLAMA3.value:
        from models.ollama_local import run
    elif model == Models.TOGETHER.value:
        from models.together_apy import run
    response = run(user_prompt, sys_prompt)
    return response.answer

class Models(Enum):
    CHAT_GPT = 1
    LLAMA2 = 2
    LLAMA3 = 3
    TOGETHER = 4
