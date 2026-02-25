from django.core.management.base import BaseCommand
from django.conf import settings
from djongo import models

from django.contrib.auth import get_user_model

from pymongo import MongoClient

# Sample data
USERS = [
    {"name": "Iron Man", "email": "ironman@marvel.com", "team": "Marvel"},
    {"name": "Captain America", "email": "cap@marvel.com", "team": "Marvel"},
    {"name": "Batman", "email": "batman@dc.com", "team": "DC"},
    {"name": "Superman", "email": "superman@dc.com", "team": "DC"},
]
TEAMS = [
    {"name": "Marvel", "members": ["ironman@marvel.com", "cap@marvel.com"]},
    {"name": "DC", "members": ["batman@dc.com", "superman@dc.com"]},
]
ACTIVITIES = [
    {"user_email": "ironman@marvel.com", "activity": "Running", "duration": 30},
    {"user_email": "batman@dc.com", "activity": "Cycling", "duration": 45},
]
LEADERBOARD = [
    {"user_email": "superman@dc.com", "score": 100},
    {"user_email": "cap@marvel.com", "score": 90},
]
WORKOUTS = [
    {"name": "Pushups", "difficulty": "Easy"},
    {"name": "Squats", "difficulty": "Medium"},
]

class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **options):
        client = MongoClient('mongodb://localhost:27017/')
        db = client['octofit_db']

        # Drop collections if they exist
        db.users.drop()
        db.teams.drop()
        db.activities.drop()
        db.leaderboard.drop()
        db.workouts.drop()

        # Insert test data
        db.users.insert_many(USERS)
        db.teams.insert_many(TEAMS)
        db.activities.insert_many(ACTIVITIES)
        db.leaderboard.insert_many(LEADERBOARD)
        db.workouts.insert_many(WORKOUTS)

        # Ensure unique index on email for users
        db.users.create_index("email", unique=True)

        self.stdout.write(self.style.SUCCESS('octofit_db populated with test data.'))
