from django.contrib.auth.models import AbstractUser
from django.db import models

# Create your models here.
class User(AbstractUser):
    # change table name on Supabase
    class Meta:
        db_table = 'user_auth_db'
    
    email = models.EmailField(max_length=100, unique=True)
    password = models.CharField(max_length=100)
    role = models.CharField(max_length=20, default='member')

    username = None

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []