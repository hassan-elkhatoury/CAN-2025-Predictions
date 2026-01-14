import importlib
import sys
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import os

# Ensure the current directory is in sys.path
sys.path.append(os.getcwd())

try:
    sim_lib = importlib.import_module("4_simulation_lib")
except ImportError:
    raise ImportError("Could not import '4_simulation_lib.py'. Make sure you are in the project root.")

app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # Allow all for local dev
    allow_methods=["*"],
    allow_headers=["*"],
)

class MatchRequest(BaseModel):
    team1: str # Expecting French name e.g., "Algérie"
    team2: str

@app.post("/predict")
def predict_match_endpoint(req: MatchRequest):
    try:
        winner, probs = sim_lib.predict_match(req.team1, req.team2)
        
        # Map probs to frontend fields
        t1_prob = float(probs.get('W', 0.0)) * 100
        draw_prob = float(probs.get('D', 0.0)) * 100
        t2_prob = float(probs.get('L', 0.0)) * 100 # Loss for T1 is Win for T2
        
        response_winner = 'draw'
        if winner == req.team1:
            response_winner = req.team1 # Pass back the name, frontend might map to ID if seeded correctly or we handle IDs
        elif winner == req.team2:
            response_winner = req.team2
            
        confidence = max(t1_prob, t2_prob, draw_prob)
        
        return {
            "winner": winner if winner != 'Draw' else 'draw',
            "team1WinProb": round(t1_prob, 1),
            "drawProb": round(draw_prob, 1),
            "team2WinProb": round(t2_prob, 1),
            "confidence": round(confidence, 1)
        }
        
    except Exception as e:
        print(f"Error predicting match: {e}")
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
