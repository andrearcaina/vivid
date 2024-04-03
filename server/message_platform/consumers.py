from channels.generic.websocket import AsyncWebsocketConsumer
from channels.db import database_sync_to_async
from .models import Room, Message
from datetime import datetime
import json

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
        message = text_data_json['message']

        await self.save_message(message)

        await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type': 'chat_message',
                'message': message
            }
        )

    async def chat_message(self, event):
        """
        Called when a message is received from the room group.

        It sends the message to the WebSocket.
        """
        message = event['message']

        await self.send(text_data=json.dumps({
            'message': message
        }))

    @database_sync_to_async
    def save_message(self, message):
        """
        Saves the message to the database.

        It gets the room object based on the room name, checks if the message already exists
        in the database, and creates a new message object if it doesn't exist.
        """
        room = Room.objects.get(room_name=self.room_name)
        
        if not Message.objects.filter(user=self.scope['user'], room=room, content=message).exists():
            new_message = Message(user=self.scope['user'], room=room, content=message, timestamp=datetime.now())
            new_message.save()