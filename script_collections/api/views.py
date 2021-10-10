from django.db.models import Q, Prefetch
from accounts.models import Account
from rest_framework import generics, filters
from .permissions import IsOwner

class CollectionCreateView(generics.CreateAPIView):
    queryset = Collection.objects.all()
    serializer_class = CollectionPostSerializer

class CollectionUpdateView(generics.UpdateAPIView):
    permission_classes = [IsOwner]
    queryset = Collection.objects.all()
    serializer_class = CollectionPostSerializer

class CollectionDestroyView(generics.DestroyAPIView):
    permission_classes = [IsOwner]
    queryset = Collection.objects.all()
    serializer_class = CollectionSerializer