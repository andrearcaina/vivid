from rest_framework import serializers
from .models import classes_offered

class classSerializer(serializers.ModelSerializer):
    class Meta:
        model = classes_offered
        fields = ['id', 'class_title', 'instructor_name', 'class_datetime']