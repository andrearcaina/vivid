from django.test import TestCase
from rest_framework.test import APIClient
from rest_framework import status
from django.urls import reverse
from .models import User
from http.cookies import SimpleCookie
import os

password = str(os.environ.get("SECRET_KEY"))

class MemberTestCase(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user_data = {
            "first_name": "Member",
            "last_name": "Test",
            "email": "dummymember@gmail.com", 
            "date_of_birth": "2001-01-01",
            "password": password,
            "role": "member"
        }
        User.objects.create_user(**self.user_data)

    def test_member_register_endpoint(self):
        url = reverse("register")
        register_data = {
            "first_name": self.user_data["first_name"],
            "last_name": self.user_data["last_name"],
            "email": "dummymember2@gmail.com", 
            "date_of_birth": self.user_data["date_of_birth"],
            "password": self.user_data["password"],
            "role": self.user_data["role"]
        }
        response = self.client.post(url, register_data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_member_login_endpoint(self):
        url = reverse("login")
        login_data = {
            "email": self.user_data["email"],
            "password": self.user_data["password"]
        }
        response = self.client.post(url, login_data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_member_user_endpoint(self):
        url = reverse("login")
        login_data = {
            "email": self.user_data["email"],
            "password": self.user_data["password"]
        }
        response = self.client.post(url, login_data)
        token = response.data["jwt"]

        url = reverse("user")
        self.client.cookies = SimpleCookie({"jwt": token})
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_member_logout_endpoint(self):
        url = reverse("logout")
        response = self.client.post(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        
class TreasurerTestCase(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user_data = {
            "first_name": "Treasurer",
            "last_name": "Test",
            "email": "dummytreasurer@gmail.com", 
            "date_of_birth": "2002-02-02",
            "password": password,
            "role": "treasurer"
        }
        User.objects.create_user(**self.user_data)

    def test_treasurer_register_endpoint(self):
        url = reverse("register")
        register_data = {
            "first_name": self.user_data["first_name"],
            "last_name": self.user_data["last_name"],
            "email": "dummytreasurer2@gmail.com", 
            "date_of_birth": self.user_data["date_of_birth"],
            "password": self.user_data["password"],
            "role": self.user_data["role"]
        }
        response = self.client.post(url, register_data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_treasurer_login_endpoint(self):
        url = reverse("login")
        response = self.client.post(url, self.user_data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_treasurer_user_endpoint(self):
        url = reverse("login")
        login_data = {
            "email": self.user_data["email"],
            "password": self.user_data["password"]
        }
        response = self.client.post(url, login_data)
        token = response.data["jwt"]

        url = reverse("user")
        self.client.cookies = SimpleCookie({"jwt": token})
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_treasurer_logout_endpoint(self):
        url = reverse("logout")
        response = self.client.post(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

class CoachTestCase(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user_data = {
            "first_name": "Coach",
            "last_name": "Test",
            "email": "dummycoach@gmail.com", 
            "date_of_birth": "2003-03-03",
            "password": password,
            "role": "coach"
        }
        User.objects.create_user(**self.user_data)

    def test_coach_register_endpoint(self):
        url = reverse("register")
        register_data = {
            "first_name": self.user_data["first_name"],
            "last_name": self.user_data["last_name"],
            "email": "dummycoach2@gmail.com", 
            "date_of_birth": self.user_data["date_of_birth"],
            "password": self.user_data["password"],
            "role": self.user_data["role"]
        }
        response = self.client.post(url, register_data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_coach_login_endpoint(self):
        url = reverse("login")
        response = self.client.post(url, self.user_data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_coach_user_endpoint(self):
        url = reverse("login")
        login_data = {
            "email": self.user_data["email"],
            "password": self.user_data["password"]
        }
        response = self.client.post(url, login_data)
        token = response.data["jwt"]

        url = reverse("user")
        self.client.cookies = SimpleCookie({"jwt": token})
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_coach_logout_endpoint(self):
        url = reverse("logout")
        response = self.client.post(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)