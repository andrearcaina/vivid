from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.exceptions import AuthenticationFailed
from .serializers import CoachFinancesSerializer
from .models import CoachFinances, User
from classes_offered.models import classes_offered
from datetime import datetime
import jwt
import os

# Create your views here.
# endpoint for showing all coaches information
class ShowAllCoaches(APIView):
    """
        This class retrieves all the coaches' information from the coach finance table.
    """
    def get(self, request):
        # Retrieve the user's token from the request cookies
        token = request.COOKIES.get('jwt')

        if not token:
            raise AuthenticationFailed('Unauthenticated!')

        try:
            payload = jwt.decode(token, str(os.environ.get('SECRET_KEY')), algorithms=['HS256'])
        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed('Unauthenticated!')

        # Check if the user's role is "treasurer"
        role = User.objects.get(id=payload['id']).role

        if role != "treasurer":
            return Response({"error": "Role is not treasurer"}, status=404)

        # serializing rows from coach finance table
        queryset = CoachFinances.objects.all()
        serializer = CoachFinancesSerializer(queryset, many=True)

        return Response({"members": serializer.data}, status=200)

# must input
# {
# id: (COACH TABLE ROW ID)
# }
class ResetBalance(APIView):
    """
        This class resets the current payment balance for a coach to 0 
        and updates the last payment balance to the current payment balance.
    """
    def put(self, request):
                # Retrieve the user's token from the request cookies
        token = request.COOKIES.get('jwt')

        if not token:
            raise AuthenticationFailed('Unauthenticated!')

        try:
            payload = jwt.decode(token, str(os.environ.get('SECRET_KEY')), algorithms=['HS256'])
        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed('Unauthenticated!')

        # Check if the user's role is "treasurer"
        role = User.objects.get(id=payload['id']).role

        if role != "treasurer":
            return Response({"error": "Role is not treasurer"}, status=404)

        # getting the coach object for the row id given
        row_id = request.data['id']
        coach = CoachFinances.objects.get(id=row_id)

        # updating last payment balance and resetting the current payment balance
        coach.last_payment_balance = coach.payment_balance
        # resetting the current payment balance to 0 (start of new month)
        # resetting the number of classes taught to 0 (start of new month)
        coach.number_classes_taught = 0
        coach.payment_balance = 0
        coach.save()

        return Response({"message": "Balance successfully set to 0"}, status=200)

# must input
# {
# id: (COACH TABLE ROW ID)
# }
class CountClassesTeaching(APIView):
    """
        This class counts the number of classes a coach is teaching in the current month
    """
    def put(self, request):
        # Retrieve the user's token from the request cookies
        token = request.COOKIES.get('jwt')

        if not token:
            raise AuthenticationFailed('Unauthenticated!')

        try:
            payload = jwt.decode(token, str(os.environ.get('SECRET_KEY')), algorithms=['HS256'])
        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed('Unauthenticated!')

        # Check if the user's role is "treasurer"
        role = User.objects.get(id=payload['id']).role

        if role != "treasurer":
            return Response({"error": "Role is not treasurer"}, status=404)
        
        # getting current month
        current_month = datetime.now().month

        # getting coach name to filter classes offered
        id = request.data['id']
        coach = CoachFinances.objects.get(id=id)
        full_name = coach.user.first_name + " " + coach.user.last_name

        # counting the number of classes they are teaching that month, will be used for salary calculations for the month
        queryset = classes_offered.objects.filter(instructor_name=full_name)
        count = sum(1 for i in queryset if i.class_datetime.month == current_month)
        coach.number_classes_taught = count

        # setting the payment balance for the coach depending on the number of the classes they teach
        coach.payment_balance = count * 10

        coach.save()

        return Response({"count": count, "payment": count * 10}, status=200)

# coach displaying last month's payment
class ShowLastPayment(APIView):
    """
        This class retrieves the last payment balance for a coach.
    """
    def get(self, request):
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
        
        id = payload['id']
        last_payment = CoachFinances.objects.get(user_id=id).last_payment_balance

        return Response({"last_payment_balance": last_payment}, status=200)