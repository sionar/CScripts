from django.urls import path
from .views import index

urlpatterns = [
    path('', index),
    path('user/<str:username>', index),
    path('script/create', index),
    path('script/<int:id>', index)
]