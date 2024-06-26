import datetime
from user_auth.models import User
from django.db import models

class Room(models.Model):
    """
        Represents a chat room in the room table.
    """
    class Meta:
        db_table = 'rooms'

    room_name = models.CharField(max_length=255)
    # a room can have multiple users
    # a many to many field is used to establish a many-to-many relationship
    # it allows us to link multiple users to a room
    # this is useful for group chats where multiple users can be in the same room
    users = models.ManyToManyField(User, related_name="rooms")

    def __str__(self):
        return self.room_name
    
class Message(models.Model):
    """
        Represents a message in the messages table.
    """
    class Meta:
        db_table = 'messages'
    
    # foreign key is required to establish a one-to-many relationship
    # it allows us to link the message to a specific room and user
    # foreign key is like combining multiple tables in SQL and creating a relationship between them
    # which is what relational databases are all about (hence the name, relational database)
    # on_delete=models.CASCADE is used to delete all messages in a room when the room is deleted
    # the gist is: we are creating a room and then creating messages in that room based on the user
    # and the user is the sender of the message with a custom User that we created in the user_auth app
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    room = models.ForeignKey(Room, related_name='messages', on_delete=models.CASCADE)
    title = models.TextField(default="") # for annoucements only
    content = models.TextField(default="")
    timestamp = models.DateTimeField(default=datetime.datetime.now)

    def __str__(self):
        return str(self.room)