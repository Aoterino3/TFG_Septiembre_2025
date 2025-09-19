import os
from flask import Flask, render_template, request, jsonify
from flask_cors import CORS, cross_origin
from services.analysis_service import getResponseFromModelText
from services.prompt_service import get_prompt, PromptType
from models.chat_gpt_api import run
from dotenv import load_dotenv

load_dotenv()  # Load variables from .env file

os.environ["OPENAI_API_KEY"] = os.getenv("OPENAI_API_KEY")

def getCorrection(question:str, sys_prompt: str) -> str:
    response = getResponseFromModelText(question, PromptType.CORRECTION.value)
    return response

def getTextCorrection(question:str, sys_prompt: str) -> str:
    response = getResponseFromModelText(question, PromptType.CORRECTION.value)
    return response
def getExerciciesResponse(question:str, sys_prompt: str) -> str:
    response = getResponseFromModelText(question, PromptType.EXERCISES.value)
    return response

def getExerciseCorrection(question:str, sys_prompt: str) -> str:
    response = getResponseFromModelText(question, PromptType.EXERCISE_CORRECTION.value)
    return response

def getSummary(question:str, sys_prompt: str) -> str:
    response = getResponseFromModelText(question, PromptType.SUMMARY.value)
    return response

def getIntroduction(question:str, sys_prompt: str) -> str:
    response = getResponseFromModelText(question, PromptType.INTRODUCTION.value)
    return response

def getEvaluation(question:str, sys_prompt: str) -> str:
    response = getResponseFromModelText(question, PromptType.EVALUATION.value)
    return response

app =  Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'
app.config['CORS_RESOURCES'] = {r"/api/*": {"origins": "*"}}

@app.route("/api/correction", methods=['POST'])
@cross_origin()
def get_default_response():
    question_json = request.json
    user_prompt = question_json['user_prompt']
    sys_prompt = question_json['sys_prompt']
    answer = getCorrection(user_prompt, sys_prompt)
    response = {'status':'success', 'question': user_prompt, 'answer':answer}
    return jsonify(response)

@app.route("/api/exercises", methods=['POST'])
@cross_origin()
def get_exercises_response():
    question_json = request.json
    user_prompt = question_json['user_prompt']
    sys_prompt = question_json['sys_prompt']
    answer = getExerciciesResponse(user_prompt, sys_prompt)
    response = {'status':'success', 'question': user_prompt, 'answer':answer}
    return jsonify(response)

@app.route("/api/exercise_correction", methods=['POST'])
@cross_origin()
def get_exercise_correction_response():
    question_json = request.json
    user_prompt = question_json['user_prompt']
    sys_prompt = question_json['sys_prompt']
    answer = getExerciseCorrection(user_prompt, sys_prompt)
    response = {'status':'success', 'question': user_prompt, 'answer':answer}
    return jsonify(response)

@app.route("/api/summary", methods=['POST'])
@cross_origin()
def get_correction_response(): 
    question_json = request.json
    user_prompt = question_json['user_prompt']
    sys_prompt = question_json['sys_prompt']
    answer = getSummary(user_prompt, sys_prompt)
    response = {'status':'success', 'question': user_prompt, 'answer':answer}
    return jsonify(response)

@app.route("/api/introduction", methods=['POST'])
@cross_origin()
def get_introduction_response():
    user_prompt = request.json['user_prompt']
    sys_prompt = request.json['sys_prompt']
    answer = getIntroduction(user_prompt, sys_prompt)
    response = {'status':'success', 'question': user_prompt, 'answer':answer}
    return jsonify(response)

@app.route("/api/evaluation", methods=['POST'])
@cross_origin()
def get_evaluation_response():
    user_prompt = request.json['user_prompt']
    sys_prompt = request.json['sys_prompt']
    answer = getEvaluation(user_prompt, sys_prompt)
    response = {'status':'success', 'question': user_prompt, 'answer':answer}
    return jsonify(response)

app.run()