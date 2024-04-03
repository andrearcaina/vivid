from django.urls import path
from . import views

urlpatterns = [
    path("rooms/", views.CreateRoom, name="create-room"),
    path("<str:room_name>/", views.UpdateRoom, name="update-room"),
]