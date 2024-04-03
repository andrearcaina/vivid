from django.urls import path
from .views import CreateRoom, MessageView

urlpatterns = [
    path("rooms/", CreateRoom.as_view(), name="create-room"),
    path("rooms/<str:room_name>/", MessageView.as_view(), name="update-room"),
]