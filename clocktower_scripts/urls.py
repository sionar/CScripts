"""clocktower_scripts URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin, auth
from django.urls import path, include
from django.views.generic import TemplateView


urlpatterns = [
    path('api-auth/', include('rest_framework.urls')),
    path('api/char_scripts/', include('char_scripts.api.urls', 'char_scripts_api')),
    path('api/account/', include('accounts.api.urls', 'accounts_api')),
    path('api/password_reset/', include('django_rest_passwordreset.urls', namespace='password_reset')),
    path('api/collections/', include('script_collections.api.urls', 'script_collections_api')),
    path('admin/', admin.site.urls),
    path('', include('frontend.urls'))
]
