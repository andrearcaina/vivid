from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.exceptions import AuthenticationFailed
from .serializers import classSerializer
from .models import classes_offered
from user_auth.models import User
import jwt
import os

# used for instructor to create classes, data is passed in the body of the request
# {
#     "class_title": "name",
#     "instructor_name": "name",
#     "class_datetime": "YYYY-MM-DDTHH:MM:SS"
# }
class CreateClass(APIView):
    def post(self, request):
        # request body take the user's id from the user and sends it as a json to this function
        token = request.COOKIES.get('jwt')

        if not token:
            raise AuthenticationFailed('Unauthenticated!')

        try:
            payload = jwt.decode(token, str(os.environ.get('SECRET_KEY')), algorithms=['HS256'])
        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed('Unauthenticated!')

        role = User.objects.get(id=payload['id']).role

        if (role != "coach"):
            return Response({"error": "role is not coach"}, status=404)

        serializer = classSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=200)
    
# allows user to join the class, appending them to the participants list
# must give body {'class_title': 'name of the class'}
class JoinClass(APIView):
    def put(self, request):

        class_title = request.data.get('class_title')
        print(classes_offered.objects.get(class_title=class_title))

        # error checking if class name is correct for debugging
        try:
            class_name = classes_offered.objects.get(class_title=class_title)
        except classes_offered.DoesNotExist:
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

# function for users to show which classes they're enrolled in
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

        # getting user's id for showing their classes
        user_id = str(payload['id'])

        queryset = classes_offered.objects.filter(participants__contains=[user_id])
        serializer = classSerializer(queryset, many=True)
        serialized_data = serializer.data

        # filtering through participants list to show class name, instructor name, and class datetime
        enrolled_class_name = [i['class_title'] for i in serialized_data]
        enrolled_class_instructor = [i['instructor_name'] for i in serialized_data]
        enrolled_class_datetime = [i['class_datetime'] for i in serialized_data]

        # displaying message to user if they have no classes enrolled
        if len(enrolled_class_name) == 0:
            return Response({'error': 'You are currently not enrolled in any classes'})

        # returned to the user in json format
        # {
        #     "class_name": [
        #         "classname1",
        #         "classname2"
        #     ],
        #     "instructor_name": [
        #         "name1",
        #         "name2"
        #     ],
        #     "class_datetime": [
        #         "2024-04-03T09:10:00Z",
        #         "2004-07-19T02:10:00Z"
        #     ]
        # }
        return Response({'class_name': enrolled_class_name,'instructor_name': enrolled_class_instructor, 'class_datetime': enrolled_class_datetime}, status=200)

# function to show all of the classes that the coach is instructing
class ShowAllClassesCoach(APIView):
    def get(self, request):
        # request body take the user's id from the user and sends it as a json to this function
        token = request.COOKIES.get('jwt')

        if not token:
            raise AuthenticationFailed('Unauthenticated!')

        try:
            payload = jwt.decode(token, str(os.environ.get('SECRET_KEY')), algorithms=['HS256'])
        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed('Unauthenticated!')

        data = User.objects.get(id=payload['id'])
        full_name = data.first_name + " " + data.last_name # getting the user's full name to check for objects

        # serializing data into python dictionary
        queryset = classes_offered.objects.filter(instructor_name=full_name)
        serializer = classSerializer(queryset, many=True)
        serialized_data = serializer.data

        teaching_class_titles = [i['class_title'] for i in serialized_data]
        teaching_datetimes = [i['class_datetime'] for i in serialized_data]

        # displaying message to coach if they have no classes enrolled
        if len(teaching_class_titles) == 0:
            return Response({'error': 'You are currently not teaching any classes'})
        
        return Response({'class_titles': teaching_class_titles, 'datetimes': teaching_datetimes}, status=200)

# function for showing all classes available for enrollment for member
class ShowAvailableClasses(APIView):
    def get(self, request):
        queryset = classes_offered.objects.all()

        if not queryset:
            return Response({"error": "There are no classes available for enrollment!"}, status=404)

        serializer = classSerializer(queryset, many=True)
        serialized_data = serializer.data

        class_titles = [item['class_title'] for item in serialized_data]
        instructors = [item['instructor_name'] for item in serialized_data]
        datetimes = [item['class_datetime'] for item in serialized_data]

        return Response({"class_titles": class_titles, "instructors": instructors, "datetimes": datetimes}, status=200)
    
# function for deleting a class from coach dashboard
class DeleteClass(APIView):
    def delete(self, request):
        class_title = request.data.get('class_title')

        # error checking if class name is correct for debugging
        try:
            class_name = classes_offered.objects.get(class_title=class_title)
        except classes_offered.DoesNotExist:
            return Response({'error': 'Class not found'}, status=404)
        
        class_name.delete()
        return Response({'message': 'class successfully deleted'}, status=200)
    
# function to show all the members in a specific class
# body:
# {
#     "class_title": "class title name" 
# }
class ClassShowMembers(APIView):
    def get(self, request):
        class_title = request.data['class_title']

        selected_class = classes_offered.objects.get(class_title=class_title)
        list_of_participants = selected_class.participants
        
        return Response({"message": list_of_participants}, status=200)