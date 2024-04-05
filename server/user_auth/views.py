from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.exceptions import AuthenticationFailed
from .serializers import UserSerializer
from member_logs.models import Member
from .models import User
import datetime
import jwt
import os

# Create your views here.
class RegisterView(APIView):
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        
        print(user)

        # create a member object for the user
        # this is necessary to store additional information about the user
        # such as the user's membership status, attendance count, etc.
        if user.role == 'member':
            member = Member.objects.create(
                first_name=user.first_name,
                last_name=user.last_name,
                email=user.email,
                date_of_birth=user.date_of_birth,
                payment_status='pending',
                membership_approved=False,
                attendance_count=0
            )
            member.save()
        
        return Response(serializer.data, status=200)

# this is the login view
# it is used to authenticate the user's credentials
# and to generate a JWT token for the user
# the JWT token is then stored as a cookie in the client's browser
# this enables secure authentication for subsequent requests
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
        resp.set_cookie(key='jwt', value=token, httponly=True, secure=True, samesite='None')

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
        
        # deleting the cookie successfully logs out the user
        # this is necessary to prevent unauthorized access to the user's account
        resp.delete_cookie(key='jwt', path='/', samesite='None')

        resp.data = {
            'message': 'successfully logged out'
        }

        return resp

# this class is used to retrieve the cookie from the server
# and decode the JWT token to get the user's information
# this is necessary to authenticate the user's request
# and to provide the user's information to the client
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
