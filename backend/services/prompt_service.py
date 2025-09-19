from enum import Enum
from prompts.prompts_reader import readFile, readTxtFile
from utils.json_utils import is_json_valid

#Proporciona métodos para obtener los diferentes tipos de prompts según la necesidad.
analysis_prompt =  """You are a English Teacher. You will be given a text in English. 
    {TASK}
    You must return the results as a JSON valid object, without brake line characters. Don't comment or add any text outside the curly braces that could invalidate the JSON object.""" 
default_prompt = """{PROMPT}
    You must return the results as a JSON valid object, without brake line characters. Don't comment or add any text outside the curly braces that could invalidate the JSON object.
    The JSON should include:
        1. The original text with the errors marked by their corresponding number in curly braces, and the error found between square braces.
        2. The corrected version of the text. Escape special characters if it is needed.
        3. A list of the errors found, with a description of each error.
    The number of errors in the array must be the same as the number of errors marked in the text. Take the original text, 
    compare with the corrected text and place in errors array all the marks in marked text in the same order.""".format(PROMPT=analysis_prompt)
default_prompt = """{PROMPT}
    Here is an example of the input: "I used to travel in bus. The answer are correct."
    Here is an example of the output: {{"marked_text": "I used to travel {{0}}[in] bus. The answer {{1}}[are] correct.", "corrected_text": "I used to travel on bus. The answer is correct.","errors": [{{"error_found": "in", "correction": "on", "description": "With the word 'bus' we have to use 'on' instead 'in'."}},{{"error_found": "are", "correction": "is", "description": "The verb 'are' should be 'is' as the subject is singular."}}]}}.
    """.format(PROMPT=default_prompt)

correction_prompt = """{PROMPT}
    The JSON should include only the corrected version of the text.""".format(PROMPT=analysis_prompt)

def get_prompt(prompt_type:str) -> str:
    """
    Obtiene el prompt según el tipo de petición.

    Args:
        - prompt_type: Tipo de prompt.

    Returns:
        Prompt según el tipo de petición.
    """
    if prompt_type == PromptType.CORRECTION.value:
        return correction_prompt
    if prompt_type == PromptType.COMPARE_TEXTS.value:
        compare_texts_json = readFile('compare_texts.json')
        return compare_texts_json['prompt']
    else:
        read_file_value = readFile(prompt_type)
        if is_json_valid(read_file_value):
            task = analysis_prompt.format(TASK=read_file_value['task'])
            default_prompt = """{PROMPT}{EXAMPLE}""".format(PROMPT=task, EXAMPLE=read_file_value['example'])
            return default_prompt['prompt']
        default_prompt = """{PROMPT}""".format(PROMPT=read_file_value)
        return default_prompt

def read_text_file(file_name: str) -> str:
    """
    Reads the content of a text file.

    Args:
        - file_name: Name of the text file.

    Returns:
        The inner text inside the text file.
    """
    try:
        with open(f"prompts/{file_name}", 'r') as file:
            text = file.read()
        return text
    except FileNotFoundError:
        return "File not found."
    except Exception as e:
        return f"An error occurred: {str(e)}"

class PromptType(Enum):
    DEFAULT = "default"
    AGENT = "agent"
    CORRECTION = "correction"
    GENERIC = "generic"
    EXERCISES = "exercises"
    EXERCISE_CORRECTION = "exercise_correction"
    GRAMATICAL = "gramatical"
    ORTHOGRAPY = "orthography"
    CONNECTORS = "connectors"
    POOR_INTRODUCTION = "poor_introduction"
    POOR_CONCLUSION = "poor_conclusion"
    COMPARE_TEXTS = "compare_texts"
    SUMMARY = "summary"
    INTRODUCTION = "introduction"
    EVALUATION = "evaluation"
    ROLE = "role"
