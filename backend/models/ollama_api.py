import requests, time, os, json

template = """
    <s>[INST] <<SYS>>
    {system_prompt}
    <</SYS>>
    {user_prompt}
    """
class Answer:
    def __init__(self, answer, elapse):
        self.answer = answer
        self.elapse = elapse

def generate(prompt: str) -> str:

    API_URL = "http://localhost:11434/api/generate"
    headers = {
        "content-type": "application/json",
    }

    options = {"use_cache": False}
    model = "llama2"
    parameters = {
        "top_k": 10,
        "temperature": 0.8,
        "repeat_penalty": 1.0,
    }
    payload = {"prompt": prompt, "options": parameters,"model": model, "stream":False}

    response = requests.post(API_URL,headers=headers, json=payload)
    if response.status_code != 200:
        return f"Error code {response.status_code}. Message {response.content}"
    else:
        results = response.text
        data = json.loads(results)
        answer = data["response"]
        return answer
    
def run_prompt(prompt: str) -> Answer:
    print('En run_prompt')
    start_time = time.time()
    answer = generate(prompt)
    end_time = time.time()
    elapse = round(end_time - start_time)
    return Answer(answer, elapse)

def run(user_prompt, sys_prompt) -> Answer:
    user_prompt = template.format(user_prompt=user_prompt, sys_prompt=sys_prompt)
    return run_prompt(user_prompt)