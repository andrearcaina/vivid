from django.urls import path
from .views import UpdatePassword, UpdateEmail, GetMembers, UpdateMembership

# modify these paths for profile management
urlpatterns = [
    path('profile/password/', UpdatePassword.as_view(), name='changePassword'),
    path('profile/email/', UpdateEmail.as_view(), name='changeEmail'),
    path('members/', GetMembers.as_view(), name='getMembers'),
    path('approve/', UpdateMembership.as_view(), name='approveMembership')
]