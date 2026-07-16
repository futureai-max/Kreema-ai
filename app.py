from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()

# Enable CORS so your Vercel website can communicate with your Railway API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Define the structure of the data coming from the frontend
class AgentRequest(BaseModel):
    idea: str
    volume: int

@app.get("/")
def read_root():
    return {"status": "healthy", "project": "kreema-ai"}

@app.post("/launch-agent")
def launch_agent(request: AgentRequest):
    # This is the endpoint that processes your frontend button click
    print(f"Received strategy request: {request.idea} with target volume: {request.volume}")
    return {
        "status": "success",
        "message": f"Autonomous agent core initialized for strategy: '{request.idea}'",
        "allocated_volume": request.volume
    }
