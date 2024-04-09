from django.test import TestCase
from rest_framework.test import APIClient
from rest_framework import status
from django.urls import reverse
from user_auth.models import User
from .models import Member
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
        user = User.objects.create_user(**self.user_data)

        url = reverse("login")
        login_data = {
            "email": self.user_data["email"],
            "password": self.user_data["password"]
        }
        response = self.client.post(url, login_data)
        self.token = response.data["jwt"]
        self.client.cookies = SimpleCookie({"jwt": self.token})

        self.member_data = {
            "user": user,
            "membership_approved": False,
            "payment_status": "pending",
            "attendance_count": 0
        }

        Member.objects.create(**self.member_data)

    def test_update_password(self):
        url = reverse("changePassword")
        data = {
            "old_password": password,
            "new_password": "newpassword"
        }
        response = self.client.put(url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_update_email(self):
        url = reverse("changeEmail")
        data = {
            "new_email": "newemail@gmail.com",
        }
        response = self.client.put(url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)

class CoachTestCases(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user_data = {
            "first_name": "Coach",
            "last_name": "Test",
            "email": "coachtest@gmail.com",
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
        
    def test_get_members(self):
        url = reverse("getMembers")
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

class TreasurerTestCases(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user_data = {
            "first_name": "Treasurer",
            "last_name": "Test",
            "email": "treasurer@gmail.com",
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

        member_data = {
            "first_name": "Member",
            "last_name": "Test",
            "email": "dummymember@gmail.com", 
            "date_of_birth": "2001-01-01",
            "password": password,
            "role": "member"
        }
        user = User.objects.create_user(**member_data)

        self.member_data = {
            "user": user,
            "membership_approved": False,
            "payment_status": "pending",
            "attendance_count": 0
        }

        Member.objects.create(**self.member_data)

    def test_get_members(self):
        url = reverse("getMembers")
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)