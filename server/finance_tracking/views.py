from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.exceptions import AuthenticationFailed
from .serializers import CoachFinancesSerializer
from .models import CoachFinances, User
import jwt
import os

# Create your views here.
class ShowAllCoaches(APIView):
    def get(self, request):

        # serializing rows from coach finance table
        queryset = CoachFinances.objects.all()
        serializer = CoachFinancesSerializer(queryset, many=True)
        serialized_data = serializer.data

        # filtering just the coaches from User Auth DB table and getting their first and last names into a list
        coach_ids = [i['user'] for i in serialized_data]
        coach_filter = User.objects.filter(id__in=coach_ids)
        coach_first_names = list(coach_filter.values_list('first_name', flat=True))
        coach_last_names = list(coach_filter.values_list('last_name', flat=True))

        # setting coach salary data into return list
        payment_balance_list = [i['payment_balance'] for i in serialized_data]
        number_classes_taught_list = [i['number_classes_taught'] for i in serialized_data]

        return Response({"first_name": coach_first_names, "last_name": coach_last_names, "payment_balance": payment_balance_list, "classes_taught": number_classes_taught_list}, status=200)
    

