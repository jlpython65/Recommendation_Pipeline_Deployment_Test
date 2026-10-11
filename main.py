from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()
origins = [
    "http://localhost:5173",
    "localhost:5173"
]


app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)



@app.get("/")
def read_root():
    return {"message": "Hello, FastAPI!"}


# @app.get("/api/recommendations")
@app.get("/api/recommendations")
def return_recommendations():
    recommendations = [
        {
            "id": "mindset-discipline",
            "title": "The Mindset of Discipline | Motivation for a Better You",
            "source": "YouTube",
            "duration": "12:34",
            "score": 92,
            "essay": "The Pursuit of Growth",
            "image": "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80",
            "summary": (
                "This video explores how discipline builds long-term freedom rather "
                "than restriction. It discusses practical strategies for developing "
                "better habits, maintaining motivation during difficult periods, and "
                "shifting attention from short-term rewards to long-term goals."
            ),
            "themes": [
                "discipline",
                "habits",
                "mindset",
                "long-term thinking",
                "motivation",
            ],
        },
        {
            "id": "finding-purpose",
            "title": "Why We Feel Lost and How to Find Our Way",
            "source": "YouTube",
            "duration": "18:21",
            "score": 87,
            "essay": "Mental Clarity",
            "image": "https://images.unsplash.com/photo-1519904981063-b0cf448d479e?auto=format&fit=crop&w=900&q=80",
            "summary": (
                "A discussion about purpose, uncertainty, and finding direction when "
                "there is too much competing information."
            ),
            "themes": ["purpose", "direction", "clarity", "uncertainty"],
        },
        {
            "id": "power-of-solitude",
            "title": "The Power of Solitude | A Calmer Mind",
            "source": "YouTube",
            "duration": "15:48",
            "score": 82,
            "essay": "Mental Clarity",
            "image": "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=900&q=80",
            "summary": (
                "An exploration of solitude as a tool for reflection, attention, "
                "and reducing mental noise."
            ),
            "themes": ["solitude", "reflection", "focus", "clarity"],
        },
        {
            "id": "better-habits",
            "title": "The Science of Better Habits",
            "source": "YouTube",
            "duration": "21:07",
            "score": 76,
            "essay": "Building Better Habits",
            "image": "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=900&q=80",
            "summary": (
                "A practical overview of how habits form and how small environmental "
                "changes can make desirable behaviors easier to repeat."
            ),
            "themes": ["habits", "behavior", "environment", "consistency"],
        },
        {
            "id": "mountain-monk",
            "title": "A Day in the Life of a Mountain Monk",
            "source": "YouTube",
            "duration": "09:52",
            "score": 71,
            "essay": "Simplicity and Freedom",
            "image": "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=900&q=80",
            "summary": (
                "A documentary-style look at a simple daily routine built around "
                "reflection, work, and intentional living."
            ),
            "themes": ["simplicity", "routine", "reflection", "intentional living"],
        },
    ]
    return {"recommendations": recommendations}

@app.get("/essays")
def display_message():
    return{"message": "hi"}

@app.get("/videos")
def display_message():
    return{"message": "hi"}
