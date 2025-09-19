import json
from services.prompt_service import get_prompt, PromptType
from services.model_service import runModel, Models
from services.agent_service import runAgent

model = Models.CHAT_GPT.value #Modelo por defecto

def setModel(_model: int):
    """
    Establece el modelo a utilizar.

    Args:
        - _model: Modelo a utilizar.
    """
    model = _model

def getResponseFromModel(question:str, prompt_type: str) -> str:
    """
    Obtiene la respuesta del modelo a partir de una pregunta y un tipo de prompt.

    Args:
        - question: Pregunta a enviar al modelo.
        - prompt_type: Tipo de prompt a utilizar.

    Returns:
        Respuesta del modelo.
    """
    prompt = get_prompt(prompt_type=prompt_type)
    prompt = set_role(prompt)
    response = getResponse(question, prompt)
    return response

def getResponseFromModelText(question:str, prompt_type: str) -> str:
    return getResponseFromModel(question, prompt_type + ".txt")
def getResponseFromModelJson(question:str, prompt_type: str) -> str:
    return getResponseFromModel(question, prompt_type + ".json")

def getResponse(question:str, sys_prompt: str) -> str:
    """
    Envia un prompt y obtienen la respuesta.

    Args:
        - question: Entrada.
        - sys_prompt: Parte del sistema del prompt.

    Returns:
        Respuesta de la API.
    """
    response = runModel(question, sys_prompt, model)
    return response

def set_role(prompt: str) -> str:
    """
    Set the role in the prompt.

    Args:
        - prompt: The prompt to set the role in.

    Returns:
        The prompt with the role set.
    """
    prompt_role = get_prompt(prompt_type=PromptType.ROLE.value + ".txt")
    if "{role}" in prompt:
        return prompt.replace("{role}", prompt_role)
    return prompt