from django.urls import path
from .views import RegisterView, LogoutView, LoginView, UserView

urlpatterns = [
    path("user/", UserView.as_view(), name="user"),
    path("login/", LoginView.as_view(), name="login"),
    path("logout/", LogoutView.as_view(), name="logout"),
    path("register/", RegisterView.as_view(), name="register"),
]
