from django.contrib import admin

from .models import Activity, Leaderboard, Team, TrackerUser, Workout

admin.site.register(TrackerUser)
admin.site.register(Team)
admin.site.register(Activity)
admin.site.register(Leaderboard)
admin.site.register(Workout)
