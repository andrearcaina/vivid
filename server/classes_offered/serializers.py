from rest_framework import serializers
from .models import classes_offered

class classSerializer(serializers.ModelSerializer):
    """
        Serializes the classes_offered model.
        The code that would fit at $PLACEHOLDER$ is the definition of the fields that you want to include 
        in the serialized representation of the classes_offered model. You can specify the fields by using 
        the fields attribute in the Meta class. In this case, the fields you want to include are id, class_title, 
        instructor_name, class_datetime, and participants.
    """
    class Meta:
        model = classes_offered
        fields = ['id', 'class_title', 'instructor_name', 'class_datetime', 'participants']