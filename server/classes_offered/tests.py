from django.test import TestCase
from rest_framework.test import APIClient
from rest_framework import status
from django.urls import reverse
from user_auth.models import User
from member_logs.models import Member
from .models import classes_offered
from http.cookies import SimpleCookie
import os

password = str(os.environ.get("SECRET_KEY"))

class CoachTestCase(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user_data = {
            "first_name": "Coach",
            "last_name": "Test",
            "email": "coactestging@gmail.com", 
            "date_of_birth": "2001-01-01",
            "password": password,
            "role": "coach"
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

        self.class_data = {
            "class_title": "Test Class",
            "instructor_name": "Coach Test",
            "class_datetime": "2028-02-12T12:00",
            "participants": ["1", "2"]
        }

        classes_offered.objects.create(**self.class_data)

    def test_create_class(self):
        url = reverse("createclass")
        class_data = {
            "class_title": "New Class",
            "instructor_name": "Coach Test",
            "class_datetime": "2025-02-12T12:00"
        }
        response = self.client.post(url, class_data, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
    
    def test_delete_class(self):
        url = reverse("deleteclass")
        data = {
            "class_title": "Test Class"
        }
        response = self.client.delete(url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_show_members_in_class(self):
        url = reverse("showmembersinclass")
        data = {
            "class_title": "Test Class"
        }
        response = self.client.get(url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)