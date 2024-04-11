from django.urls import path
from .views import ( 
    CreateClass, 
    JoinClass, 
    ShowUserClasses, 
    DeleteClass, 
    ShowAllCoachClasses, 
    ShowAvailableClasses, 
    ShowClassMembers
)

urlpatterns = [
    path("createclass/", CreateClass.as_view(), name="createclass"),
    path("joinclass/", JoinClass.as_view(), name="joinclass"),
    path("deleteclass/", DeleteClass.as_view(), name="deleteclass"),
    path("showuserclasses/", ShowUserClasses.as_view(), name="showuserclasses"),
    path("showcoachclasses/", ShowAllCoachClasses.as_view(), name="showcoachclasses"),
    path("showavailableclasses/", ShowAvailableClasses.as_view(), name="showavailableclasses"),
    path("showmembersinclass/", ShowClassMembers.as_view(), name="showmembersinclass"),
]
