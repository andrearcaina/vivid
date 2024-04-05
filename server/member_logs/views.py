from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.exceptions import AuthenticationFailed
from .models import Member
import jwt
import os

# make a PUT request to change certain fields in here for profile management
class UpdatePassword(APIView):
    def put(self, request):
        token = request.COOKIES.get('jwt')
        try:
            payload = jwt.decode(token, str(os.environ.get('SECRET_KEY')), algorithms=['HS256'])
        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed('Unauthenticated!')

        old_password = request.data.get('old_password')
        new_password = request.data.get('new_password')
        if not old_password or not new_password:
            return Response({'message': 'Old or new password not provided'}, status=400)
        
        member = Member.objects.filter(user_id=payload['id']).first()
        user = member.user
        if not user.check_password(old_password):
            return Response({'message': 'Incorrect old password'}, status=400)

        user.set_password(new_password)
        user.save()
        return Response({'message': 'Password updated successfully'}, status=200)
    
class UpdateEmail(APIView):
    def put(self, request):
        token = request.COOKIES.get('jwt')
        try:
            payload = jwt.decode(token, str(os.environ.get('SECRET_KEY')), algorithms=['HS256'])
        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed('Unauthenticated!')

        new_email = request.data.get('new_email')
        if not new_email:
            return Response({'message': 'New email not provided'}, status=400)
        
        member = Member.objects.filter(user_id=payload['id']).first()
        user = member.user
        user.email = new_email
        user.save()
        return Response({'message': 'Email updated successfully'}, status=200)