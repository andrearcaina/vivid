from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.exceptions import AuthenticationFailed
from .serializers import UserSerializer
from .models import User
import datetime
import jwt
import os

# Create your views here.
class RegisterView(APIView):
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=200)

class LoginView(APIView):
    def post(self, request):
        email = request.data['email']
        password = request.data['password']

        user = User.objects.filter(email=email).first()

        if user is None:
            raise AuthenticationFailed('User not found!')
        
        if not user.check_password(password):
            raise AuthenticationFailed('Incorrect password!')

        payload = {
            'id': user.id,
            'exp': datetime.datetime.now(datetime.timezone.utc) + datetime.timedelta(minutes=60),
            'iat': datetime.datetime.now(datetime.timezone.utc)
        }

        # Generate JWT token using the payload and a secret key
        token = jwt.encode(payload, str(os.environ.get('SECRET_KEY')), algorithm='HS256')

        # Create a response object
        resp = Response()

        # Set the JWT token as a HTTP-only cookie in the response
        resp.set_cookie(key='jwt', value=token, httponly=True)

        # Set the response data with the JWT token
        # Note: The client receives the JWT token in the response
        resp.data = {
            'jwt': token
        }

        # Return the response object with the JWT token as a cookie
        # the reason is that the client stores the JWT token as a cookie and can send it 
        # back to the server for authentication purposes
        # this enables secure authentication for subsequent requests
        return resp

class LogoutView(APIView):
    def post(self, request):
        resp = Response()
        resp.delete_cookie('jwt')
        resp.data = {
            'message': 'successfully logged out'
        }

        return resp

class UserView(APIView):
    def get(self, request):
        token = request.COOKIES.get('jwt')

        if not token:
            raise AuthenticationFailed('Unauthenticated!')

        try:
            payload = jwt.decode(token, str(os.environ.get('SECRET_KEY')), algorithms=['HS256'])
        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed('Unauthenticated!')
        
        user = User.objects.filter(id=payload['id']).first()
        serializer = UserSerializer(user)
        return Response(serializer.data, status=200)
