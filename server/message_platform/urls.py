from django.urls import path
from .views import CreateRoom, MessageView

"""
    This is the URL routing for the message platform.
    It maps the URL to the views for creating rooms and getting messages.
    The URL pattern is /rooms/ for creating rooms and /rooms/<str:room_name>/ for getting messages.
    The views handle the creation of rooms and getting messages in a room.
    The views use Django's class-based views
"""
urlpatterns = [
    path("rooms/", CreateRoom.as_view(), name="create-room"),
    path("rooms/<str:room_name>/", MessageView.as_view(), name="messages")
]