# pip instalar -q openai
from langchain import PromptTemplate
from openai import OpenAI
import time

from models.ollama_api import Answer
model = "gpt-4o-2024-08-06"
# function that takes in string argument as parameter 
def comp(usr_prompt, sys_prompt): 
    client = OpenAI()
    completion = client.chat.completions.create( 
        messages=[
            {
                "role": "user",
                "content": usr_prompt,
            },
            {
                "role": "system",
                "content": sys_prompt,
            },
        ],
        model=model,
        temperature=0.8
    ) 
    return completion.choices[0].message.content

def generate(system_prompt, user_prompt: str) -> str:
    # Modified invoking the model
    return comp(user_prompt,system_prompt)

def run_prompt(system_prompt, user_prompt: str) -> Answer:
    start_time = time.time()
    answer = generate(system_prompt, user_prompt)
    end_time = time.time()
    elapse = round(end_time - start_time)
    return Answer(answer.replace('\n',''), elapse)

def run(user_prompt, sys_prompt) -> Answer:
    return run_prompt(sys_prompt, user_prompt)