from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.exceptions import AuthenticationFailed
from .serializers import classSerializer
from .models import classes_offered
import jwt
import os

# Create your views here.
# used for instructor to create classes, data is passed in the body of the request
# {
#     "class_title": "name",
#     "instructor_name": "name",
#     "class_datetime": "YYYY-MM-DDTHH:MM:SS"
# }
class CreateClass(APIView):
    def post(self, request):
        serializer = classSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=200)
    
# allows user to join the class, appending them to the participants list
# must give body {'class_title': 'name of the class'}
class JoinClass(APIView):
    def put(self, request):

        class_title = request.data.get('class_title')

        # error checking if class name is correct for debugging
        try:
            class_name = classes_offered.objects.get(class_title=class_title)
        except class_name.DoesNotExist:
            return Response({'error': 'Class not found'}, status=404)

        # request body take the user's id from the user and sends it as a json to this function
        token = request.COOKIES.get('jwt')

        if not token:
            raise AuthenticationFailed('Unauthenticated!')

        try:
            payload = jwt.decode(token, str(os.environ.get('SECRET_KEY')), algorithms=['HS256'])
        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed('Unauthenticated!')

        user_id = str(payload['id'])

        # adding the user's id to the list of participants
        if user_id in class_name.participants:
            return Response({'error': 'User is already enrolled'}, status=404)

        class_name.participants.append(user_id)
        class_name.save()

        return Response({'message': 'Participant added successfully'}, status=200)
    
class UserShowClasses(APIView):
    def get(self, request):
                # request body take the user's id from the user and sends it as a json to this function
        token = request.COOKIES.get('jwt')

        if not token:
            raise AuthenticationFailed('Unauthenticated!')

        try:
            payload = jwt.decode(token, str(os.environ.get('SECRET_KEY')), algorithms=['HS256'])
        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed('Unauthenticated!')

        user_id = payload['id']

        # filtering through participants list 
        user_enrolled_classes = [i.class_title for i in classes_offered.objects.filter(participants__contains=[user_id])]

        # displaying message to user if they have no classes enrolled
        if len(user_enrolled_classes) == 0:
            return Response({'error': 'You are currently not enrolled in any classes'})
        
        # returned to the user 
        # {
        #     "message": [
        #         "cock",
        #         "othercock"
        #     ]
        # }
        return Response({'message': user_enrolled_classes}, status=200)