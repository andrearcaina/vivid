from django.urls import path
from .views import (
    UpdatePassword, 
    UpdateEmail, 
    GetMembers, 
    UpdateMembership, 
    DeleteMember,
    ResetPassword,
    MembershipApproval,
    ActivityStatus
)

urlpatterns = [
    path('profile/password/', UpdatePassword.as_view(), name='changePassword'),
    path('profile/email/', UpdateEmail.as_view(), name='changeEmail'),
    path('members/', GetMembers.as_view(), name='getMembers'),
    path('approve/', UpdateMembership.as_view(), name='approveMembership'),
    path('reject/', DeleteMember.as_view(), name='deleteMember'),
    path('reset/', ResetPassword.as_view(), name='resetPassword'),
    path('activity/', ActivityStatus.as_view(), name='activityStatus'),
    path('approval/', MembershipApproval.as_view(), name='user'),
]