from djongo import models


class TrackerUser(models.Model):
    _id = models.ObjectIdField(primary_key=True)
    name = models.CharField(max_length=120)
    email = models.EmailField(unique=True)
    team = models.CharField(max_length=60)

    def __str__(self):
        return self.name


class Team(models.Model):
    _id = models.ObjectIdField(primary_key=True)
    name = models.CharField(max_length=60, unique=True)
    members = models.JSONField(default=list)

    def __str__(self):
        return self.name


class Activity(models.Model):
    _id = models.ObjectIdField(primary_key=True)
    user_email = models.EmailField()
    activity = models.CharField(max_length=100)
    duration = models.PositiveIntegerField(help_text="Duration in minutes")
    created_at = models.DateTimeField(auto_now_add=True)


class Leaderboard(models.Model):
    _id = models.ObjectIdField(primary_key=True)
    user_email = models.EmailField()
    score = models.IntegerField(default=0)
    updated_at = models.DateTimeField(auto_now=True)


class Workout(models.Model):
    _id = models.ObjectIdField(primary_key=True)
    name = models.CharField(max_length=100)
    difficulty = models.CharField(max_length=30)
    description = models.TextField(blank=True)

    def __str__(self):
        return self.name
