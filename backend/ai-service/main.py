import os
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict, Any, Optional
from dotenv import load_dotenv

# Load environment variables
load_dotenv(os.path.join(os.path.dirname(__file__), ".env"))

# Import our LangGraph instance
from graph import graph

app = FastAPI(title="TICMI AI Orchestrator Service", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ChatRequest(BaseModel):
    sessionId: str
    studentId: str
    message: str
    history: List[Dict[str, str]] = []
    telemetry: Optional[Dict[str, Any]] = None
    remediationActive: Optional[bool] = False
    diagnosedGapNodeId: Optional[str] = None

@app.post("/ai/chat")
async def chat_endpoint(request: ChatRequest):
    print(f"[FastAPI] Received chat request for session {request.sessionId}, student {request.studentId}")
    
    # Check if there is an ongoing remediation in history or passed in payload
    remediation_active = request.remediationActive or False
    diagnosed_gap_node_id = request.diagnosedGapNodeId
    
    if not remediation_active:
        # Fallback to history checking (looks for gap id or AI student signature)
        for turn in reversed(request.history):
            content = turn.get("content", "")
            if turn.get("role") == "assistant" and ("d-operasi-bilangan" in content or "AI Murid" in content or "Kiko" in content):
                remediation_active = True
                diagnosed_gap_node_id = "d-operasi-bilangan"
                break

    # Prepare inputs for LangGraph
    inputs = {
        "session_id": request.sessionId,
        "student_id": request.studentId,
        "message": request.message,
        "history": request.history,
        "remediation_active": remediation_active,
        "diagnosed_gap_node_id": diagnosed_gap_node_id,
        "error_type": "prerequisite_gap" if remediation_active else None,
        "mastery_achieved": False,
        "resolved_gap_node_id": None,
        "reply": "",
        "agent_type": "socratic"
    }

    try:
        # Execute LangGraph state machine
        output = graph.invoke(inputs)
        
        response = {
            "reply": output.get("reply"),
            "errorType": output.get("error_type"),
            "diagnosedGapNodeId": output.get("diagnosed_gap_node_id"),
            "remediationActive": output.get("remediation_active", False),
            "masteryAchieved": output.get("mastery_achieved", False),
            "resolvedGapNodeId": output.get("resolved_gap_node_id"),
            "agentType": output.get("agent_type", "socratic")
        }
        
        print(f"[FastAPI] Graph execution complete. Reply: '{response['reply'][:50]}...'")
        return response

    except Exception as e:
        print(f"[FastAPI] Error during graph execution: {e}")
        raise HTTPException(status_code=500, detail=f"Error executing agent workflow: {str(e)}")

@app.get("/health")
def health():
    return {"status": "ok", "provider": "Gemini/OpenRouter/N NIM supported"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
