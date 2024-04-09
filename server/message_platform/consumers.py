from channels.generic.websocket import AsyncWebsocketConsumer
from channels.db import database_sync_to_async
from .models import Room, Message
from user_auth.models import User
from datetime import datetime
import json
import jwt
import os

class ChatConsumer(AsyncWebsocketConsumer):
    """
    Represents a WebSocket consumer for handling chat functionality.

    This consumer handles the connection, disconnection, receiving and sending of messages
    for a specific chat room.
    """

    async def connect(self):
        """
        Called when a WebSocket connection is established.

        It retrieves the room name from the URL route's kwargs, joins the room group,
        and accepts the connection.
        """
        self.room_name = self.scope['url_route']['kwargs']['room_name']
        self.room_group_name = f'chat_{self.room_name}'
        headers = self.scope['headers']

        # get the token from the headers
        for key, value in headers:
            if key == b'cookie':
                self.token = value.decode().split('=')[1]
                break
            if key == b'authorization':
                self.token = value
                break

        try:
            payload = jwt.decode(self.token, str(os.environ.get('SECRET_KEY')), algorithms=['HS256'])
            self.scope['user'] = await self.get_user(payload['id'])
            await self.add_user_to_room(self.scope['user'])
        except jwt.ExpiredSignatureError:
            await self.close(code=4001)
            return
        
        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )

        await self.accept()

    async def disconnect(self, close_code):
        """
        Called when a WebSocket connection is closed.

        It leaves the room group.
        """
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )

    async def receive(self, text_data):
        """
        Called when a message is received from the WebSocket.

        It parses the received JSON data, saves the message to the database,
        and sends the message to the room group.
        """
        text_data_json = json.loads(text_data)

        first_name = self.scope['user'].first_name
        last_name = self.scope['user'].last_name
        message = text_data_json['message']
        title = text_data_json['title'] or ""
        date = text_data_json['timestamp']

        await self.save_message(message, date, title)

        await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type': 'chat_message',
                'title': title,
                'first_name': first_name,
                'last_name': last_name,
                'message': message,
                'date': date
            }
        )

    async def chat_message(self, event):
        """
        Called when a message is received from the room group.

        It sends the message to the WebSocket.
        """
        first_name = event['first_name']
        last_name = event['last_name']
        message = event['message']
        date = event['date']
        title = event['title']

        await self.send(text_data=json.dumps({
            'title': title,
            'first_name': first_name,
            'last_name': last_name,
            'message': message,
            'date': date
        }))

    @database_sync_to_async
    def save_message(self, message, date, title):
        """
        Saves the message to the database.

        It gets the room object based on the room name, checks if the message already exists
        in the database, and creates a new message object if it doesn't exist.
        """
        room = Room.objects.get(room_name=self.room_name)
        
        if not Message.objects.filter(user=self.scope['user'], room=room, content=message).exists():
            new_message = Message(user=self.scope['user'], room=room, content=message, timestamp=date, title=title)
            new_message.save()

    @database_sync_to_async
    def get_user(self, user_id):
        """
        Gets the user based on the user ID.

        This is to retrieve the user from the database based on the user ID from the JWT payload.

        If the user does not exist, it returns None.

        This basically authorizes the user to connect to the WebSocket.
        """
        try:
            return User.objects.get(id=user_id)
        except User.DoesNotExist:
            return None
        
    @database_sync_to_async
    def add_user_to_room(self, user):
        """
        Adds the user to the room_user table.

        This is to keep track of the users in a specific room.
        """
        try:
            room, _ = Room.objects.get_or_create(room_name=self.room_name)
            room.users.add(user)
        except Room.DoesNotExist:
            return None