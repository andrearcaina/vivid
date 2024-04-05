from django.urls import path
from .views import CreateClass, JoinClass, UserShowClasses, DeleteClass, ShowAllClassesCoach, ShowAvailableClasses

urlpatterns = [
    path("createclass/", CreateClass.as_view(), name="createclass"),
    path("joinclass/", JoinClass.as_view(), name="joinclass"),
    path("usershowclasses/", UserShowClasses.as_view(), name="usershowclasses"),
    path("deleteclass/", DeleteClass.as_view(), name="deleteclass"),
    path("coachshowclasses/", ShowAllClassesCoach.as_view(), name="coachshowclasses"),
    path("showavailableclasses/", ShowAvailableClasses.as_view(), name="showavailableclasses"),
]
