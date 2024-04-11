from django.urls import path
from .views import (
    ShowAllCoaches, 
    ResetBalance, 
    CountClassesTeaching, 
    ShowLastPayment
)

urlpatterns = [
    path('showallcoaches/', ShowAllCoaches.as_view(), name='showallcoaches'),
    path('resetbalance/', ResetBalance.as_view(), name='resetbalance'),
    path('countclassesteaching/', CountClassesTeaching.as_view(), name='countclassesteaching'),
    path('showlastpayment/', ShowLastPayment.as_view(), name='showlastpayment'),
]