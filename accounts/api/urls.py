from django.urls import path, include
from accounts.api.views import( registration_view, guest_registration_view )
from accounts.api.views import CustomAuthToken
from rest_framework.authtoken.views import obtain_auth_token

app_name = 'accounts'

urlpatterns = [
    path('register', registration_view, name='register'),
    path('login', CustomAuthToken.as_view(), name='login'),
    path('guest_register', guest_registration_view, name='register'),
]