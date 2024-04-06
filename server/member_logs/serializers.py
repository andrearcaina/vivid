from rest_framework import serializers
from user_auth.serializers import UserSerializer
from .models import Member

class MemberSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)

    class Meta:
        model = Member
        fields = ['id', 'payment_status', 'membership_approved', 'attendance_count', 'user']