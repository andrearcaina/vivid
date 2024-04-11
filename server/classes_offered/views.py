from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.exceptions import AuthenticationFailed
from .serializers import classSerializer
from .models import classes_offered
from user_auth.models import User
from django.utils import timezone
from datetime import datetime
import jwt
import os

class CreateClass(APIView):
    """
    Used for instructors (coaches) to create classes.
    """
    def post(self, request):
        """
        Handles the POST request to create a new class.
        """
        # Retrieve the user's token from the request cookies
        token = request.COOKIES.get('jwt')

        if not token:
            raise AuthenticationFailed('Unauthenticated!')

        try:
            payload = jwt.decode(token, str(os.environ.get('SECRET_KEY')), algorithms=['HS256'])
        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed('Unauthenticated!')

        # Check if the user's role is "coach"
        role = User.objects.get(id=payload['id']).role

        if role != "coach":
            return Response({"error": "Role is not coach"}, status=404)

        body = request.data

        # Check if the class date and time is in the future
        class_datetime = datetime.strptime(body['class_datetime'], '%Y-%m-%dT%H:%M')
        
        if class_datetime < datetime.now():
            return Response({'error': 'Class date and time cannot be in the past'}, status=404)

        # Create a new instance of the classSerializer and validate the request data
        serializer = classSerializer(data=body)
        serializer.is_valid(raise_exception=True)

        # Save the serialized data to create a new class
        serializer.save()

        return Response(serializer.data, status=200)

class JoinClass(APIView):
    """
    Allows users to join a class by appending them to the participants list.
    """
    def put(self, request):
        """
        Handles the PUT request to join a class.
        """
        class_title = request.data.get('class_title')
        print(classes_offered.objects.get(class_title=class_title))

        # Error checking if class name is correct for debugging
        try:
            class_name = classes_offered.objects.get(class_title=class_title)
        except classes_offered.DoesNotExist:
            return Response({'error': 'Class not found'}, status=404)

        # Retrieve the user's token from the request cookies
        token = request.COOKIES.get('jwt')

        if not token:
            raise AuthenticationFailed('Unauthenticated!')

        try:
            payload = jwt.decode(token, str(os.environ.get('SECRET_KEY')), algorithms=['HS256'])
        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed('Unauthenticated!')

        user_id = str(payload['id'])

        # Adding the user's id to the list of participants
        if user_id in class_name.participants:
            return Response({'error': 'User is already enrolled'}, status=404)

        class_name.participants.append(user_id)
        class_name.save()

        return Response({'message': 'Participant added successfully'}, status=200)

class ShowUserClasses(APIView):
    """
    Shows the classes that a user is enrolled in.
    """
    def get(self, request):
        """
        Handles the GET request to show user's enrolled classes.
        """
        # Retrieve the user's token from the request cookies
        token = request.COOKIES.get('jwt')

        if not token:
            raise AuthenticationFailed('Unauthenticated!')

        try:
            payload = jwt.decode(token, str(os.environ.get('SECRET_KEY')), algorithms=['HS256'])
        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed('Unauthenticated!')

        # Getting user's id for showing their classes
        user_id = str(payload['id'])

        queryset = classes_offered.objects.filter(participants__contains=[user_id])
        serializer = classSerializer(queryset, many=True)
        serialized_data = serializer.data

        # Filtering through participants list to show class name, instructor name, and class datetime
        enrolled_class_name = [i['class_title'] for i in serialized_data]
        enrolled_class_instructor = [i['instructor_name'] for i in serialized_data]
        enrolled_class_datetime = [i['class_datetime'] for i in serialized_data]

        # Displaying message to user if they have no classes enrolled
        if len(enrolled_class_name) == 0:
            return Response({'error': 'You are currently not enrolled in any classes'})

        # Returned to the user in JSON format
        return Response({'class_name': enrolled_class_name, 'instructor_name': enrolled_class_instructor, 'class_datetime': enrolled_class_datetime}, status=200)

class ShowAllCoachClasses(APIView):
    """
    Shows all the classes that a coach is instructing.
    """
    def get(self, request):
        """
        Handles the GET request to show coach's classes.
        """
        # Retrieve the user's token from the request cookies
        token = request.COOKIES.get('jwt')

        if not token:
            raise AuthenticationFailed('Unauthenticated!')

        try:
            payload = jwt.decode(token, str(os.environ.get('SECRET_KEY')), algorithms=['HS256'])
        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed('Unauthenticated!')

        data = User.objects.get(id=payload['id'])
        full_name = data.first_name + " " + data.last_name # Getting the user's full name to check for objects

        # Serializing data into python dictionary
        queryset = classes_offered.objects.filter(instructor_name=full_name)
        serializer = classSerializer(queryset, many=True)
        serialized_data = serializer.data

        teaching_class_titles = [i['class_title'] for i in serialized_data]
        teaching_datetimes = [i['class_datetime'] for i in serialized_data]

        # Displaying message to coach if they have no classes enrolled
        if len(teaching_class_titles) == 0:
            return Response({'error': 'You are currently not teaching any classes'})

        return Response({'class_name': teaching_class_titles, "instructor_name": full_name, 'class_datetime': teaching_datetimes}, status=200)

class ShowAvailableClasses(APIView):
    """
    Shows all the classes available for enrollment.
    """
    def get(self, request):
        """
        Handles the GET request to show available classes.
        """
        # Retrieve the user's token from the request cookies
        token = request.COOKIES.get('jwt')

        if not token:
            raise AuthenticationFailed('Unauthenticated!')

        try:
            payload = jwt.decode(token, str(os.environ.get('SECRET_KEY')), algorithms=['HS256'])
        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed('Unauthenticated!')
        
        if not payload:
            return Response({"error": "User not found"}, status=404)

        queryset = classes_offered.objects.all()

        if not queryset:
            return Response({"error": "There are no classes available for enrollment!"}, status=404)

        for item in queryset:
            if item.class_datetime < timezone.now():
                queryset = queryset.exclude(class_title=item.class_title)

        serializer = classSerializer(queryset, many=True)
        serialized_data = serializer.data

        class_titles = [item['class_title'] for item in serialized_data]
        instructors = [item['instructor_name'] for item in serialized_data]
        datetimes = [item['class_datetime'] for item in serialized_data]

        return Response({"class_name": class_titles, "instructor_name": instructors, "class_datetime": datetimes}, status=200)

class DeleteClass(APIView):
    """
    Deletes a class from the coach dashboard.
    """
    def delete(self, request):
        """
        Handles the DELETE request to delete a class.
        """
        class_title = request.data.get('class_title')

        # Error checking if class name is correct for debugging
        try:
            class_name = classes_offered.objects.get(class_title=class_title)
        except classes_offered.DoesNotExist:
            return Response({'error': 'Class not found'}, status=404)

        class_name.delete()
        return Response({'message': 'Class successfully deleted'}, status=200)

class ShowClassMembers(APIView):
    """
    Shows all the members in a specific class.
    """
    def get(self, request):
        """
        Handles the GET request to show class members.
        """
        class_title = request.data['class_title']

        selected_class = classes_offered.objects.get(class_title=class_title)
        list_of_participants = selected_class.participants

        return Response({"message": list_of_participants}, status=200)
