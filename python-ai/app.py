from fastapi import FastAPI
from pydantic import BaseModel
from google import genai
from dotenv import load_dotenv
import os
import json

load_dotenv()

client = genai.Client(
    api_key=os.getenv("GEMINI_API_KEY")
)

app = FastAPI()


class ChatRequest(BaseModel):
    message: str


class AIEvent(BaseModel):
    title: str
    description: str
    category: str
    city: str
    venue: str
    price: float


class RecommendationRequest(BaseModel):
    currentEvent: AIEvent
    availableEvents: list[AIEvent]


@app.get("/")
def home():
    return {
        "message": "AI Service Running"
    }


@app.post("/chat")
def chat(request: ChatRequest):

    prompt = f"""
You are an AI assistant for an Event Management System.

Answer only questions related to:
- Events
- Bookings
- Payments
- Event Suggestions

User Question:
{request.message}
"""

    response = client.models.generate_content(
        model="gemini-3.5-flash",
        contents=prompt
    )

    return {
        "reply": response.text
    }


@app.post("/recommend")
def recommend(request: RecommendationRequest):

    prompt = f"""
You are an AI Recommendation Engine.

Current Event:

Title: {request.currentEvent.title}
Description: {request.currentEvent.description}
Category: {request.currentEvent.category}
City: {request.currentEvent.city}
Venue: {request.currentEvent.venue}
Price: {request.currentEvent.price}

Available Events:

"""

    for event in request.availableEvents:

        prompt += f"""
Title: {event.title}
Description: {event.description}
Category: {event.category}
City: {event.city}
Venue: {event.venue}
Price: {event.price}

"""

    prompt += """

Recommend ONLY the best 3 events.

Return ONLY valid JSON.

Format:

{
  "recommendations":[
    {
      "title":"Event Name",
      "reason":"Why it is recommended"
    }
  ]
}

Do not include markdown.
Do not include explanations.
"""

    response = client.models.generate_content(
        model="gemini-3.5-flash",
        contents=prompt
    )

    text = response.text.strip()

    if text.startswith("```json"):
        text = text.replace("```json", "").replace("```", "").strip()

    elif text.startswith("```"):
        text = text.replace("```", "").strip()

    return json.loads(text)