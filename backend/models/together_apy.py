#pip install together
#pip install -U langchain-together
import os
import time
from flask import json
from together import Together
from langchain_core.prompts import PromptTemplate

from models.ollama_api import Answer

TOGETHER_API_KEY = os.getenv("TOGETHER_API_KEY")

together = Together(api_key=TOGETHER_API_KEY)
modelo="meta-llama/Meta-Llama-3.1-8B-Instruct-Turbo"

def generate(contenido_sys,contenido_user,modelo):
  output =[]
  extract = together.chat.completions.create(
    messages=[
          {
              "role": "system",
              "content": contenido_sys,
          },
          {
              "role": "user",
              "content":contenido_user,
          },
      ],

      model=modelo,
      temperature= 0.0
  )

  try:
    output = json.loads(extract.choices[0].message.content)
  except ValueError as e:
    print ('Error en JSON tipo : ',e)

  return(output)

def run_prompt(system_prompt, user_prompt: str) -> Answer:
    start_time = time.time()
    answer = generate(system_prompt, user_prompt, modelo)
    end_time = time.time()
    elapse = round(end_time - start_time)
    return Answer(answer.replace('\n',''), elapse)

def run(user_prompt, sys_prompt) -> Answer:
    return run_prompt(sys_prompt, user_prompt)