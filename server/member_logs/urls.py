from django.urls import path
from .views import UpdatePassword

# modify these paths for profile management
urlpatterns = [
    path('profile/password/', UpdatePassword.as_view(), name='changePassword')
]