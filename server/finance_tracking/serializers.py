from rest_framework import serializers
from .models import CoachFinances
from user_auth.serializers import UserSerializer

class CoachFinancesSerializer(serializers.ModelSerializer):
    class Meta:
        model = CoachFinances
        fields = ['user', 'payment_balance', 'number_classes_taught']