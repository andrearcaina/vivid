from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.exceptions import AuthenticationFailed
from .serializers import CoachFinancesSerializer
from .models import CoachFinances, User
import jwt
import os

# Create your views here.
# endpoint for showing all coaches information
class ShowAllCoaches(APIView):
    def get(self, request):

        # serializing rows from coach finance table
        queryset = CoachFinances.objects.all()
        serializer = CoachFinancesSerializer(queryset, many=True)
        serialized_data = serializer.data

        return Response(serialized_data, status=200)

# must input
# {
# id: (COACH TABLE ROW ID)
# }
class ResetBalance(APIView):
    def put(self, request):
        id = request.data['id']
        coach = CoachFinances.objects.get(id=id)
        coach.payment_balance = 0
        coach.save()
        return Response({"message": "Balance successfully set to 0"}, status=200)