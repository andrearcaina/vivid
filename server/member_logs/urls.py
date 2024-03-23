from django.urls import path
from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("<int:member_id>/", views.member, name="member")
]