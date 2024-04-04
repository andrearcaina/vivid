from django.db import models

class Member(models.Model):
    # change table name on Supabase
    class Meta:
        db_table = 'member_logs'

    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    email = models.EmailField(max_length=100, unique=True)
    date_of_birth = models.DateField()
    payment_status = models.CharField(max_length=100)
    membership_approved = models.BooleanField(default=False)
    attendance_count = models.IntegerField(default=0)
    # can connect two tables with a foreign key
    # get password with Member.userAuth.password
    # userAuth = models.ForeignKey(User, blank=True, null=True, on_delete=models.CASCADE)