from django.views import View
from django.http import JsonResponse
from .models import Room, Message
from user_auth.models import User
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from json import loads

# the @csrf_exempt decorator is used to exempt the view from CSRF verification
# this is mandatory for POST requests from external sources like the frontend
@method_decorator(csrf_exempt, name="dispatch")
class CreateRoom(View):
    """
        This class is used to create a new room.
        It receives the room name in the request body
        and checks if the room already exists in the database.
        If the room does not exist, it creates a new room object.
    """
    def post(self, request):
        # get the room name from the POST request
        data = loads(request.body)
        room_name = data.get("room_name")

        # check if the room already exists
        try:
            room = Room.objects.get(room_name=room_name)
        except Room.DoesNotExist:
            room = Room(room_name=room_name)
            room.save()

        # if the room does not exist, create a new room
        # send a JSON response with a success message and the room name
        return JsonResponse({"message": "Room created successfully!", "room_name": room.room_name})

@method_decorator(csrf_exempt, name="dispatch")
class MessageView(View):
    """ 
        get the messages in a room based on the room name provided
        this is to get all the messages in a room when a user joins the room
        so that they can see the chat history
    """
    def get(self, request, room_name):
        room = Room.objects.get(room_name=room_name)
        messages = list(Message.objects.filter(room=room).values())
        # get the id of the user who sent the message
        # and get the first name and last name of the user

        for message in messages:
            user = User.objects.get(id=message['user_id'])
            message['first_name'] = user.first_name
            message['last_name'] = user.last_name

        return JsonResponse({"messages": messages})
