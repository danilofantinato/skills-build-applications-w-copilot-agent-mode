from rest_framework import status
from rest_framework.test import APITestCase

from .models import TrackerUser


class OctoFitApiTests(APITestCase):
    def test_api_root_available(self):
        response = self.client.get('/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('users', response.data)
        self.assertIn('teams', response.data)
        self.assertIn('activities', response.data)
        self.assertIn('leaderboard', response.data)
        self.assertIn('workouts', response.data)

    def test_users_list_endpoint(self):
        TrackerUser.objects.create(
            name='Spider-Man',
            email='spiderman@marvel.com',
            team='Marvel',
        )
        response = self.client.get('/api/users/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['email'], 'spiderman@marvel.com')
