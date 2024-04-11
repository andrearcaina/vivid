from rest_framework import serializers
from .models import CoachFinances
from user_auth.serializers import UserSerializer

class CoachFinancesSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    class Meta:
        model = CoachFinances
        fields = [
            'id', 
            'payment_balance', 
            'number_classes_taught', 
            'last_payment_balance', 
            'user'
        ]