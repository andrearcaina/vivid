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
    """
        This class is used to register a new user.
        It receives the user's information in the request body
        and creates a new user object in the database.
        Additionally, it creates a member object for the user,
        which stores additional information such as membership status and attendance count.
    """
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        
        # create a member object for the user
        # this is necessary to store additional information about the user
        # such as the user's membership status, attendance count, etc.
        if user.role == 'member':
            member = Member.objects.create(
                user=user,
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
    """
        This class is used to authenticate a user.
        It receives the user's email and password in the request body
        and checks if the user exists in the database.
        If the user exists and the password is correct, it generates a JWT token
        and stores it as a cookie in the client's browser.
    """
    def post(self, request):
        email = request.data['email']
        password = request.data['password']

        user = User.objects.filter(email=email).first()

        if user is None:
            raise AuthenticationFailed('User not found!')
        
        if not user.check_password(password):
            raise AuthenticationFailed('Incorrect password!')

        # this payload is used to generate the JWT token and specifies the user's id,
        # the expiration time of the token, and the time the token was issued
        # this is for security purposes and to prevent unauthorized access to the user's account
        # since the token expires after a certain time
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

        resp.status_code = 200

        # Return the response object with the JWT token as a cookie
        # the reason is that the client stores the JWT token as a cookie and can send it 
        # back to the server for authentication purposes
        # this enables secure authentication for subsequent requests
        return resp

class LogoutView(APIView):
    """
        This class is used to log out a user.
        It deletes the JWT token cookie from the client's browser.
        This effectively logs out the user and prevents unauthorized access to the user's account.
    """
    def post(self, request):
        resp = Response()
        
        # deleting the cookie successfully logs out the user
        # this is necessary to prevent unauthorized access to the user's account
        resp.delete_cookie(key='jwt', path='/', samesite='None')

        resp.data = {
            'message': 'successfully logged out'
        }

        resp.status_code = 200

        return resp

# this class is used to retrieve the cookie from the server
# and decode the JWT token to get the user's information
# this is necessary to authenticate the user's request
# and to provide the user's information to the client
class UserView(APIView):
    """
        This class is used to retrieve the user's information.
        It decodes the JWT token stored in the client's browser
        and retrieves the user's information from the database.
        It then returns the user's information to the client.
    """
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

class ResetPasswordView(APIView):
    """
        This class is used to reset the user's password.
        It receives the user's email, new password, and confirm password in the request body.
        It then updates the user's password in the database.
    """
    def put(self, request):
        email = request.data['email']
        password = request.data['password']
        confirm_password = request.data['confirmPassword']

        if password != confirm_password:
            raise AuthenticationFailed('Passwords do not match!')

        user = User.objects.filter(email=email).first()

        if user is None:
            raise AuthenticationFailed('User not found!')
        
        user.set_password(password)
        user.save()

        return Response({'message': 'Password reset successful!'}, status=200)