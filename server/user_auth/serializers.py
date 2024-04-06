from rest_framework import serializers
from .models import User

# creates a new user object with the fields specified in the User model
# a serializer is used to serialize the data from the model into a JSON object
# it helps to convert complex data types, like querysets and model instances, 
# into native Python datatypes that can be easily rendered into JSON, XML, or other content types
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'first_name', 'last_name', 'email', 'date_of_birth', 'date_joined', 'password', 'role']
        extra_kwargs = {'password': {'write_only': True}}

    # hashes the password before saving the user object to the database
    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        
        instance.save()
        return instance

