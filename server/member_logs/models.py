from django.db import models

class Member(models.Model):
    # change table name on Supabase
    class Meta:
        db_table = 'member_logs'

    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    email = models.EmailField(max_length=100, unique=True)
    phone_number = models.CharField(max_length=100)
    date_of_birth = models.DateField()
    payment_status = models.CharField(max_length=100)
    membership_approved = models.BooleanField(default=False)
    attendance_count = models.IntegerField(default=0)