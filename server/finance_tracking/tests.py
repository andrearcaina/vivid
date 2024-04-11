from django.test import TestCase
from rest_framework.test import APIClient
from rest_framework import status
from django.urls import reverse
from user_auth.models import User
from .models import CoachFinances
from http.cookies import SimpleCookie
import os

password = str(os.environ.get("SECRET_KEY"))

class TreasurerTestCase(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user_data = {
            "first_name": "Treasurer",
            "last_name": "Test",
            "email": "dummytreasrer@gmail.com",
            "date_of_birth": "2001-01-01",
            "password": password,
            "role": "treasurer"
        }

        User.objects.create_user(**self.user_data)

        url = reverse("login")
        login_data = {
            "email": self.user_data["email"],
            "password": self.user_data["password"]
        }
        response = self.client.post(url, login_data)
        self.token = response.data["jwt"]
        self.client.cookies = SimpleCookie({"jwt": self.token})
    
    def test_show_all_coaches(self):
        url = reverse("showallcoaches")
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

class CoachTestCase(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user_data = {
            "first_name": "Coach",
            "last_name": "Test",
            "email": "coachtester@gmail.com",
            "date_of_birth": "2001-01-01",
            "password": password,
            "role": "coach"
        }

        user = User.objects.create_user(**self.user_data)

        url = reverse("login")
        login_data = {
            "email": self.user_data["email"],
            "password": self.user_data["password"]
        }
        response = self.client.post(url, login_data)
        self.token = response.data["jwt"]
        self.client.cookies = SimpleCookie({"jwt": self.token})

        self.coach_data = {
            "user": user,
            "number_classes_taught": 0,
            "payment_balance": 0,
            "last_payment_balance": 0
        }

        CoachFinances.objects.create(**self.coach_data)

    def test_show_last_payment(self):
        url = reverse("showlastpayment")
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)