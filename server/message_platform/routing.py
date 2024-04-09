from django.urls import path
from .consumers import ChatConsumer

""" 
    This is the URL routing for the WebSocket chat consumer.
    It maps the WebSocket URL to the chat consumer.
    The URL pattern is /ws/chat/<str:room_name>/.
    The room_name is passed as a string to the chat consumer.
    The chat consumer is then called to handle the WebSocket connection.
    The chat consumer is an asynchronous WebSocket consumer that handles the chat functionality.
    It handles the connection, disconnection, receiving and sending of messages for a specific chat room.
    The chat consumer uses JWT tokens for authentication and authorization.
    This enables secure chat functionality for authenticated users.
    The chat consumer uses the Django channels library to handle WebSocket connections.
    The Django channels library provides a way to handle WebSocket connections in Django.
    It allows us to create asynchronous WebSocket consumers that handle WebSocket connections.
"""
websocket_urlpatterns = [
    path('ws/chat/<str:room_name>/', ChatConsumer.as_asgi()),
]