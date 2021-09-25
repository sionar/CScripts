from django.core import exceptions
import django.contrib.auth.password_validation as validators
from accounts.models import Account
from rest_framework import serializers

class RegistrationSerializer(serializers.ModelSerializer):  
    password2 = serializers.CharField(style={'input_type':'password'}, write_only=True)

    class Meta:
        model = Account
        fields = ['email', 'username', 'password', 'password2']
        extra_kwargs = { 'password': {'write_only': True} }

    def save(self):
        account = Account(
            email=self.validated_data['email'],
            username=self.validated_data['username'],
            )
        password = self.validated_data['password']
        password2 = self.validated_data['password2']
        errors = dict()
        try:
            validators.validate_password(password=password, user=account)
        except exceptions.ValidationError as e:
            errors['password'] = list(e.messages)
            if errors:
                raise serializers.ValidationError(errors)

        if password != password2:
            raise serializers.ValidationError({'password': ['Passwords do not match.']})
        account.set_password(password)
        account.save()
        return account