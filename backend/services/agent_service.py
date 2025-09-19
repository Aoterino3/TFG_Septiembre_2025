from dotenv import load_dotenv
from pydantic import BaseModel
from langchain_community.chat_models import ChatOpenAI
# from langchain_openai import ChatOpenAI
# from langchain_anthropic import ChatAnthropic
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import PydanticOutputParser
from langchain.agents import AgentExecutor, create_tool_calling_agent
from models.chat_gpt_api import model
from services.prompt_service import get_prompt, PromptType
import os

agent_executor: AgentExecutor = None

class ResearchResponse(BaseModel):
    topic: str
    summary: str
    sources: list[str]
    tools_used: list[str]

def initAgent():
    """
    Initializes the agent with the necessary configurations.
    """
    global agent_executor
    global parser
    if agent_executor is None:
        # load_dotenv()  # Load variables from .env file

        # os.environ["OPENAI_API_KEY"] = os.getenv("OPENAI_API_KEY")
        # print(os.getenv("OPENAI_API_KEY"))
        llm = ChatOpenAI(model=model, temperature=0)
        parser = PydanticOutputParser(pydantic_object=ResearchResponse)
        prompt_text = get_prompt(prompt_type=PromptType.AGENT.value)
        prompt = ChatPromptTemplate.from_messages(
            [
                (
                    "system",
                    # """
                    # You are a research assistant that will help generate a research paper.
                    # Answer the user query and use neccessary tools. 
                    # Wrap the output in this format and provide no other text\n{format_instructions}
                    # """,
                    prompt_text + """\n{format_instructions}""",
                ),
                ("placeholder", "{chat_history}"),
                ("human", "{query}"),
                ("placeholder", "{agent_scratchpad}"),
            ]
        ).partial(format_instructions=parser.get_format_instructions())
        tools = []
        chat_history = []
        agent = create_tool_calling_agent(
            llm=llm,
            tools=tools,
            prompt=prompt,
            
        )

        agent_executor = AgentExecutor(agent=agent, verbose=True)

def runAgent(query) -> str:
    if agent_executor is None:
        initAgent()
    raw_response = agent_executor.invoke({"query": query})

    try:
        structured_response = parser.parse(raw_response.get("output")[0]["text"])
        return structured_response
    except Exception as e:
        print("Error parsing response", e, "Raw Response - ", raw_response)
        return """"""