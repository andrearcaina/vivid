from django.views import View
from django.http import JsonResponse
from .models import Room, Message
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from datetime import datetime

# the @csrf_exempt decorator is used to exempt the view from CSRF verification
@method_decorator(csrf_exempt, name="dispatch")
class CreateRoom(View):
    def post(self, request):
        # get the room name from the POST request
        room_name = request.POST.get("room_name")

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
    # get the messages in a room based on the room name provided
    # this is to get all the messages in a room when a user joins the room
    # so that they can see the chat history
    def get(self, request, room_name):
        room = Room.objects.get(room_name=room_name)
        messages = Message.objects.filter(room=room).values()
        return JsonResponse({"messages": list(messages)})

    # post a message to a room based on the room name provided
    def post(self, request, room_name):
        # get the room based on the room name
        # get the first name, last name, and message from the POST request
        # the sender is a combination of the first name and last name
        # create a new message with the room, sender, and message
        # send a JSON response with a success message
        room = Room.objects.get(room_name=room_name)
        first_name = request.POST.get("first_name")
        last_name = request.POST.get("last_name")
        sender = f"{first_name} {last_name}"
        message = request.POST.get("message")
        new_message = Message(user=sender, room=room, message=message, datetime=datetime.now())
        new_message.save()
        return JsonResponse({"message": "Message sent successfully!"})