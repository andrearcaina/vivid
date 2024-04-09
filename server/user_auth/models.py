from typing import Any
from django.contrib.auth.models import AbstractUser, BaseUserManager
from django.db import models

class CustomUserManager(BaseUserManager):
    def create_user(self, email, password=None, **kwargs):
        if not email:
            raise ValueError('The Email field must be set')
        email = self.normalize_email(email)
        
        user = self.model(email=email, **kwargs)
        user.set_password(password)
        
        user.first_name = kwargs.get('first_name')
        user.last_name = kwargs.get('last_name')
        user.date_of_birth = kwargs.get('date_of_birth')
        user.role = kwargs.get('role')
        
        user.save(using=self._db)
        
        return user

    def create_superuser(self, email, password=None, **kwargs):
        kwargs.setdefault('is_staff', True)
        kwargs.setdefault('is_superuser', True)
        return self.create_user(email, password, **kwargs)

class User(AbstractUser):
    # change table name on Supabase
    class Meta:
        db_table = 'user_auth_db'
    
    email = models.EmailField(max_length=100, unique=True)
    date_of_birth = models.DateField(default='2000-01-01')
    password = models.CharField(max_length=100)
    role = models.CharField(max_length=20, default='member')

    username = None

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    objects = CustomUserManager()