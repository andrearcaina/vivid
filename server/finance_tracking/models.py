from django.db import models
from user_auth.models import User

# Create your models here.
class CoachFinances(models.Model):
    class Meta:
        db_table = "coach_tracking"

    user = models.OneToOneField(User, blank=True, null=True, on_delete=models.CASCADE)
    payment_balance = models.IntegerField(default=0)
    number_classes_taught = models.IntegerField(default=0)