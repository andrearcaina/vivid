from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import Room, Message

@csrf_exempt
def CreateRoom(request):
    if request.method == "POST":
        return JsonResponse({"message": "Room created successfully!"})
    
@csrf_exempt
def UpdateRoom(request, room_name):
    if request.method == "POST":
        return JsonResponse({"message": "Message successfully!"})