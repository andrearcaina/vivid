from django.urls import path
from .views import ShowAllCoaches, ResetBalance

urlpatterns = [path('showallcoaches/', ShowAllCoaches.as_view(), name='showallcoaches'),
               path('resetbalance/', ResetBalance.as_view(), name='resetbalance'),]