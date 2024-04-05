from django.urls import path
from .views import CreateClass, JoinClass, UserShowClasses

urlpatterns = [
    path("createclass/", CreateClass.as_view(), name="createclass"),
    path("joinclass/", JoinClass.as_view(), name="joinclass"),
    path("usershowclasses/", UserShowClasses.as_view(), name="usershowclasses"),
]
