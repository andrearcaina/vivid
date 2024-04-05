from django.db import models
from user_auth.models import User

class Member(models.Model):
    # change table name on Supabase
    class Meta:
        db_table = 'member_logs'

    # can connect two tables with a foreign key
    # get password with Member.userAuth.password
    user = models.ForeignKey(User, blank=True, null=True, on_delete=models.CASCADE)
    payment_status = models.CharField(max_length=100)
    membership_approved = models.BooleanField(default=False)
    attendance_count = models.IntegerField(default=0)