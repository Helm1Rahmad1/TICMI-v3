import os
import json
import requests
from typing import List, Dict, Any, Optional
from typing_extensions import TypedDict
from langgraph.graph import StateGraph, END

# Define state structure
class AgentState(TypedDict):
    session_id: str
    student_id: str
    message: str
    history: List[Dict[str, str]]
    error_type: Optional[str]
    diagnosed_gap_node_id: Optional[str]
    remediation_active: bool
    mastery_achieved: bool
    resolved_gap_node_id: Optional[str]
    reply: str
    agent_type: str

# Helper to parse JSON safely from LLM output
def safe_json_loads(text: str) -> Dict[str, Any]:
    text = text.strip()
    start = text.find('{')
    end = text.rfind('}')
    if start != -1 and end != -1 and end > start:
        json_str = text[start:end+1]
        try:
            return json.loads(json_str)
        except Exception:
            pass
    # Clean fallback if markdown codeblock remains
    clean = text.replace("```json", "").replace("```", "").strip()
    return json.loads(clean)

# Helper to call LLM with fallback
def call_llm(system_prompt: str, user_prompt: str) -> str:
    gemini_key = os.environ.get("GEMINI_API_KEY")
    openrouter_key = os.environ.get("OPENROUTER_API_KEY")
    nvidia_key = os.environ.get("NVIDIA_API_KEY")

    # 1. Try Gemini
    if gemini_key:
        try:
            import google.generativeai as genai
            genai.configure(api_key=gemini_key)
            model = genai.GenerativeModel(
                model_name="gemini-1.5-flash",
                system_instruction=system_prompt
            )
            response = model.generate_content(user_prompt)
            return response.text.strip()
        except Exception as e:
            print(f"[LLM] Gemini call failed: {e}. Trying other providers...")

    # 2. Try OpenRouter
    if openrouter_key:
        try:
            url = "https://openrouter.ai/api/v1/chat/completions"
            headers = {
                "Authorization": f"Bearer {openrouter_key}",
                "Content-Type": "application/json"
            }
            payload = {
                "model": "meta-llama/llama-3-8b-instruct:free",
                "messages": [
                    {"role": "system", "content": system_prompt},
                    {"role": "user", "content": user_prompt}
                ]
            }
            res = requests.post(url, headers=headers, json=payload, timeout=10)
            if res.status_code == 200:
                return res.json()["choices"][0]["message"]["content"].strip()
        except Exception as e:
            print(f"[LLM] OpenRouter call failed: {e}")

    # 3. Try NVIDIA NIM
    if nvidia_key:
        try:
            url = "https://integrate.api.nvidia.com/v1/chat/completions"
            headers = {
                "Authorization": f"Bearer {nvidia_key}",
                "Content-Type": "application/json"
            }
            payload = {
                "model": "meta/llama-3.1-8b-instruct",
                "messages": [
                    {"role": "system", "content": system_prompt},
                    {"role": "user", "content": user_prompt}
                ]
            }
            res = requests.post(url, headers=headers, json=payload, timeout=10)
            if res.status_code == 200:
                return res.json()["choices"][0]["message"]["content"].strip()
        except Exception as e:
            print(f"[LLM] NVIDIA NIM call failed: {e}")

    # 4. Local rule-based offline simulator fallback
    print("[LLM] No LLM keys found or all API requests failed. Using local simulator.")
    return local_simulator(system_prompt, user_prompt)


def local_simulator(system_prompt: str, user_prompt: str) -> str:
    text = user_prompt.lower()
    
    # Error Analysis Node Simulator
    if "error analysis" in system_prompt.lower():
        if "1/x - 2" in text or "pecahan" in text or "salah aljabar" in text:
            return json.dumps({
                "error_type": "prerequisite_gap",
                "diagnosed_gap_node_id": "d-operasi-bilangan",
                "explanation": "Student subtracted the whole number from the denominator directly instead of finding a common denominator."
            })
        else:
            return json.dumps({
                "error_type": "local_error",
                "diagnosed_gap_node_id": None,
                "explanation": "Minor error on composition node, not a conceptual prerequisite gap."
            })

    # Mastery Node Simulator
    if "mastery agent" in system_prompt.lower():
        if "penyebut" in text or "kali silang" in text or "faktor" in text or "samakan" in text:
            return json.dumps({
                "mastery_achieved": True,
                "feedback": "Correct. The student successfully explained finding a common denominator."
            })
        else:
            return json.dumps({
                "mastery_achieved": False,
                "feedback": "Incorrect or incomplete explanation."
            })

    # Socratic Node (Kiko) Simulator
    if "socratic" in system_prompt.lower() or "kiko" in system_prompt.lower():
        return "🤖 [Kiko (AI Murid)]: \"Tunggu Kak... jadi $\\frac{1}{x-2}$ itu tidak sama dengan $\\frac{1}{x} - 2$? Saya bingung cara menyamakan penyebut pecahan aljabar. Bisa tolong ajarkan aturannya, Kak?\""

    return "Saya masih belajar konsep ini. Bisakah jelaskan kembali?"


# --- Node Definitions ---

def supervisor_node(state: AgentState) -> Dict[str, Any]:
    print("⚙️  [Supervisor Node] Initializing session details.")
    # Read state variables or load defaults
    return {
        "session_id": state.get("session_id", "default_sess"),
        "student_id": state.get("student_id", "default_student"),
        "message": state.get("message", ""),
        "history": state.get("history", []),
        "remediation_active": state.get("remediation_active", False),
        "mastery_achieved": False
    }

def error_analysis_node(state: AgentState) -> Dict[str, Any]:
    print("⚙️  [Error Analysis Node] Diagnosing user response.")
    
    # Only run error analysis if remediation is not already active
    if state.get("remediation_active"):
        return {}

    system_prompt = """You are the Error Analysis Agent for TICMI, a mathematics learning system.
Analyze the student's incorrect solution to a math problem.
Determine if the mistake is a:
1. "prerequisite_gap": A critical gap in foundational concepts (e.g. Fase D/E operations like basic algebra, common denominators in algebraic fractions, arithmetic).
2. "local_error": A minor computational mistake or typo on the target high-level topic (Fase F) itself.

Output your diagnosis strictly in JSON format:
{
  "error_type": "prerequisite_gap" | "local_error",
  "diagnosed_gap_node_id": "d-operasi-bilangan" | null,
  "explanation": "Brief description of the diagnosed misconception"
}
Note: If the student submits '1/x - 2' for composition of f(x)=1/x and g(x)=x-2, this is a 'prerequisite_gap' on 'd-operasi-bilangan'.
"""
    user_prompt = f"Student Answer: {state.get('message')}"
    
    response_text = call_llm(system_prompt, user_prompt)
    try:
        data = safe_json_loads(response_text)
        return {
            "error_type": data.get("error_type"),
            "diagnosed_gap_node_id": data.get("diagnosed_gap_node_id"),
            "remediation_active": data.get("error_type") == "prerequisite_gap"
        }
    except Exception as e:
        print(f"[Error Analysis] Failed to parse LLM response: {response_text}, error: {e}")
        # Default fallback
        return {
            "error_type": "local_error",
            "diagnosed_gap_node_id": None,
            "remediation_active": False
        }

def routing_node(state: AgentState) -> Dict[str, Any]:
    print("⚙️  [Routing Node] Checking path and fetching RAG grounding.")
    # Here we would run a vector similarity search on Supabase pgvector using sentence-transformers.
    # To keep it lightweight and zero-dependency, we mock the retrieved text.
    return {
        "reply": "RAG grounding context loaded."
    }

def socratic_node(state: AgentState) -> Dict[str, Any]:
    print("⚙️  [Socratic Node] Formulating probing question (Kiko persona).")
    
    system_prompt = """You are 'Kiko', an AI student. You are talking to your tutor (the student).
You are struggling to understand a math concept (finding a common denominator for algebraic fractions).
You must act confused and ask a probing question.
Ask the user why $\\frac{1}{x-2}$ is not equal to $\\frac{1}{x} - 2$, and request that they explain how to find a common denominator.
Wrap all mathematical expressions or formulas in single dollar signs ($...$), for example: $\\frac{1}{x-2}$.
NEVER explain the concept yourself or give direct mathematical formulas. Your job is to extract explanation from the tutor.
Keep your response in Indonesian, short, and starting with '🤖 [Kiko (AI Murid)]:'."""

    user_prompt = f"Tutor said: {state.get('message')}"
    reply = call_llm(system_prompt, user_prompt)
    
    return {
        "reply": reply,
        "agent_type": "socratic"
    }

def mastery_node(state: AgentState) -> Dict[str, Any]:
    print("⚙️  [Mastery Node] Validating explanation.")
    
    # Only run mastery validation if we are in active remediation
    if not state.get("remediation_active"):
        return {}

    system_prompt = """You are the Mastery Agent for TICMI.
Your job is to analyze the user's explanation of a math concept (specifically finding common denominators for algebraic fractions).
Determine if the explanation is conceptually correct and free of misconceptions.
The explanation should mention terms like 'penyebut' (denominator), 'samakan' (make equal), 'perkalian silang' (cross-multiplication), or 'faktor' (factors).

Output strictly in JSON format:
{
  "mastery_achieved": true | false,
  "feedback": "Short evaluation feedback"
}
"""
    user_prompt = f"User Explanation: {state.get('message')}"
    
    response_text = call_llm(system_prompt, user_prompt)
    try:
        data = safe_json_loads(response_text)
        mastery = data.get("mastery_achieved", False)
        
        if mastery:
            # Resolved the gap
            return {
                "mastery_achieved": True,
                "resolved_gap_node_id": state.get("diagnosed_gap_node_id") or "d-operasi-bilangan",
                "remediation_active": False,
                "reply": "🤖 [Kiko (AI Murid)]: \"Oh begitu! Jadi penyebutnya harus disamakan terlebih dahulu baru pembilangnya bisa disesuaikan. Terima kasih banyak Kak, sekarang saya paham!\"",
                "agent_type": "mastery"
            }
        else:
            return {
                "mastery_achieved": False,
                "reply": "🤖 [Kiko (AI Murid)]: \"Saya masih belum paham bagian penyebut itu... Kenapa kita tidak bisa langsung mengurangkan angka 2? Bisa tolong jelaskan kembali?\"",
                "agent_type": "socratic"
            }
    except Exception as e:
        print(f"[Mastery Node] Parse error: {response_text}, error: {e}")
        return {
            "mastery_achieved": False,
            "reply": "🤖 [Kiko (AI Murid)]: \"Duh Kak, saya masih bingung. Bisa tolong dijelaskan ulang bagian menyamakan penyebutnya?\"",
            "agent_type": "socratic"
        }


# --- Conditional Routing logic ---

def route_by_remediation(state: AgentState) -> str:
    if state.get("remediation_active"):
        return "remediation"
    else:
        return "analysis"

def route_error_status(state: AgentState) -> str:
    if state.get("error_type") == "prerequisite_gap" or state.get("remediation_active"):
        return "remediation"
    else:
        return "direct_feedback"

def route_mastery_status(state: AgentState) -> str:
    if state.get("mastery_achieved"):
        return "end"
    else:
        return "socratic"


# --- Build LangGraph State Machine ---

workflow = StateGraph(AgentState)

# Add Nodes
workflow.add_node("supervisor", supervisor_node)
workflow.add_node("error_analysis", error_analysis_node)
workflow.add_node("routing", routing_node)
workflow.add_node("socratic", socratic_node)
workflow.add_node("mastery", mastery_node)

# Set Entry Point
workflow.set_entry_point("supervisor")

# Configure Edges
workflow.add_conditional_edges(
    "supervisor",
    route_by_remediation,
    {
        "remediation": "mastery",
        "analysis": "error_analysis"
    }
)

workflow.add_conditional_edges(
    "error_analysis",
    route_error_status,
    {
        "remediation": "routing",
        "direct_feedback": "socratic"
    }
)

workflow.add_edge("routing", "socratic")

# In Socratic session, Kiko asks a question and we return response to student client (end of this request cycle)
workflow.add_edge("socratic", END)

workflow.add_conditional_edges(
    "mastery",
    route_mastery_status,
    {
        "socratic": "socratic",
        "end": END
    }
)

# Compile graph
graph = workflow.compile()

