import requests, time, os, json
from langchain_community.llms import Ollama
from langchain_core.prompts import PromptTemplate 
from models.ollama_api import Answer

model = 'llama3'

def generate(system_prompt, user_prompt: str) -> str:
    llm=Ollama(base_url='http://localhost:11434', model=model, temperature=0.8, verbose=False)

    template = """
        <s>[INST] <<SYS>>
        {system_prompt}
        <</SYS>>
        {user_prompt}
        """
    if(model=='llama3'):
        template = """
                <|begin_of_text|>
                <|start_header_id|>system<|end_header_id|>
                {system_prompt}
                <|eot_id|>
                <|start_header_id|>user<|end_header_id|>
                {user_prompt}
                <|eot_id|>
                <|start_header_id|>assistant<|end_header_id|>
                """
    # Added prompt template
    prompt = PromptTemplate(
        input_variables=["system_prompt", "user_prompt"],
        template=template
    )
    
    # Modified invoking the model
    return llm.invoke(prompt.format(system_prompt=system_prompt, user_prompt=user_prompt))

def run_prompt(system_prompt, user_prompt: str) -> Answer:
    start_time = time.time()
    answer = generate(system_prompt, user_prompt)
    end_time = time.time()
    elapse = round(end_time - start_time)
    return Answer(answer, elapse)

def local_run(user_prompt: str, sys_prompt:str) -> Answer:
    if not sys_prompt:
        sys_prompt = """
        You are a helpful, respectful and honest english teacher. Always answer as helpfully as possible, while being safe.
        Your answers should not include any harmful, unethical, racist, sexist, toxic, dangerous, or illegal content.
        Please ensure that your responses are socially unbiased and positive in nature.
        If a question does not make any sense, or is not factually coherent, explain why instead of answering something not correct.
        If you don't know the answer to a question, please don't share false information.
        """
    return run_prompt(sys_prompt,user_prompt)

def run(user_prompt, sys_prompt) -> Answer:
    return run_prompt(sys_prompt, user_prompt)