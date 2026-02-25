from rest_framework import serializers

from .models import Activity, Leaderboard, Team, TrackerUser, Workout


class ObjectIdToStringModelSerializer(serializers.ModelSerializer):
    id = serializers.SerializerMethodField()

    def get_id(self, obj):
        return str(getattr(obj, "_id", ""))


class TrackerUserSerializer(ObjectIdToStringModelSerializer):
    class Meta:
        model = TrackerUser
        fields = ["id", "name", "email", "team"]


class TeamSerializer(ObjectIdToStringModelSerializer):
    class Meta:
        model = Team
        fields = ["id", "name", "members"]


class ActivitySerializer(ObjectIdToStringModelSerializer):
    class Meta:
        model = Activity
        fields = ["id", "user_email", "activity", "duration", "created_at"]


class LeaderboardSerializer(ObjectIdToStringModelSerializer):
    class Meta:
        model = Leaderboard
        fields = ["id", "user_email", "score", "updated_at"]


class WorkoutSerializer(ObjectIdToStringModelSerializer):
    class Meta:
        model = Workout
        fields = ["id", "name", "difficulty", "description"]
