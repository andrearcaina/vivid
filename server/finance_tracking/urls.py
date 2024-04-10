from django.urls import path
from .views import ShowAllCoaches

urlpatterns = [path('showallcoaches/', ShowAllCoaches.as_view(), name='showallcoaches'),]