from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Member
from user_auth.serializers import UserSerializer

# make a PUT request to change certain fields in here for profile management
class UpdatePassword(APIView):
    def put(self, request):
        serializer = UserSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()

        old_password = request.data.get('old_password')
        new_password = request.data.get('new_password')
        if not old_password or not new_password:
            return Response({'message': 'Old or new password not provided'}, status=400)

        user = Member.objects.filter(password=old_password).first()
        if not user.check_password(old_password):
            return Response({'message': 'Incorrect old password'}, status=400)

        user.set_password(new_password)
        user.save()
        return Response({'message': 'Password updated successfully'}, status=200)