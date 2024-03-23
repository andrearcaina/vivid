from django.contrib.auth.models import AbstractUser
from django.db import models

# Create your models here.
class User(AbstractUser):
    # change table name on Supabase
    class Meta:
        db_table = 'user_auth_db'
    
    name = models.CharField(max_length=100)
    email = models.EmailField(max_length=100, unique=True)
    password = models.CharField(max_length=100)
    is_member = models.BooleanField(default=False)
    is_treasurer = models.BooleanField(default=False)
    is_coach = models.BooleanField(default=False)

    username = None

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []