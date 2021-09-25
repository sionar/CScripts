from django.utils.crypto import get_random_string
from accounts.api.serializers import RegistrationSerializer
from accounts.models import Account
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.authtoken.models import Token
from rest_framework.authtoken.views import ObtainAuthToken

@api_view(['POST',])
def registration_view(request):
    serializer = RegistrationSerializer(data=request.data)
    data = {}
    if serializer.is_valid(raise_exception=True):
        account = serializer.save()
        data['id'] = account.id
        data['username'] = account.username
        token = Token.objects.get(user=account).key
        data['token'] = token
        data['is_guest'] = False
    else:
        data = serializer.errors

    user = request.user
    if user and user.is_guest:
        user.delete()

    return Response(data)

@api_view(['POST',])
def guest_registration_view(request):
    account = Account(
        email=get_random_string(length=32) + '@clocktowerscripts.gg',
        username=get_random_string(length=32),
        is_guest=True
    )
    password = get_random_string(length=32)
    account.set_password(password)
    account.save()
    data = {}
    data['username'] = account.username
    token = Token.objects.get(user=account).key
    data['token'] = token
    data['is_guest'] = True
    return Response(data)

class CustomAuthToken(ObtainAuthToken):
    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        token, created = Token.objects.get_or_create(user=user)

        currentUser = request.user
        if currentUser and currentUser.is_guest:
            currentUser.delete()

        return Response({
            'token': token.key,
            'username': user.username,
            'is_guest': False
        })