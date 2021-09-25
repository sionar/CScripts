from django.db.models import Q, Prefetch
from accounts.models import Account
from char_scripts.models import Script, Version, Character
from rest_framework import generics, filters
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from .serializers import ScriptSerializer, ScriptPostSerializer, VersionSerializer, VersionPostSerializer, CharacterSerializer, AccountSerializer, UserSerializer
from .permissions import IsOwnerOrVisible, IsOwnerOrVisibleVersion, IsOwnerOrAdmin, IsScriptOwner, IsOwnerOrAdminCharacter

class ScriptListView(generics.ListAPIView):
    serializer_class = ScriptSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['title']
    def get_queryset(self):
        queryset = Script.objects.filter(visible=True).filter(owner__isnull=False).filter(owner__is_guest=False).order_by('-created_at')
        type = self.request.query_params.get('type')
        if type is not None:
            queryset = queryset.filter(script_type=type)
        queryset = self.get_serializer_class().setup_eager_loading(queryset)
        return queryset


class ScriptDetailView(generics.RetrieveAPIView):
    permission_classes = [IsOwnerOrVisible]
    serializer_class = ScriptSerializer
    queryset = Script.objects.all()

class ScriptCreateView(generics.CreateAPIView):
    queryset = Script.objects.all()
    serializer_class = ScriptPostSerializer

class ScriptUpdateView(generics.UpdateAPIView):
    permission_classes = [IsOwnerOrAdmin]
    queryset = Script.objects.all()
    serializer_class = ScriptPostSerializer

class ScriptDestroyView(generics.DestroyAPIView):
    permission_classes = [IsOwnerOrAdmin]
    queryset = Script.objects.all()
    serializer_class = ScriptSerializer

class VersionCreateView(generics.CreateAPIView):
    permission_classes = [IsScriptOwner]
    serializer_class = VersionPostSerializer
    queryset = Version.objects.all()

class VersionUpdateView(generics.UpdateAPIView):
    permission_classes = [IsScriptOwner]
    serializer_class = VersionPostSerializer
    queryset = Version.objects.all()


class CharacterListView(generics.ListAPIView):
    serializer_class = CharacterSerializer
    pagination_class = None

    def get_queryset(self):
        user = self.request.user
        if user.is_anonymous or user.is_guest:
            return Character.objects.filter(custom=False)
        else:
            return Character.objects.filter(Q(custom=False) | Q(owner=user))

class CharacterDetailView(generics.RetrieveAPIView):
    permission_classes = [IsOwnerOrVisible]
    serializer_class = CharacterSerializer
    queryset = Character.objects.all()

class CharacterCreateView(generics.CreateAPIView):
    permission_classes = [IsAuthenticated]
    queryset = Character.objects.all()
    serializer_class = CharacterSerializer

class CharacterUpdateView(generics.UpdateAPIView):
    permission_classes = [IsOwnerOrAdminCharacter]
    queryset = Character.objects.all()
    serializer_class = CharacterSerializer

class CharacterDestroyView(generics.DestroyAPIView):
    permission_classes = [IsOwnerOrAdminCharacter]
    queryset = Character.objects.all()
    serializer_class = CharacterSerializer

class AccountDetailView(generics.RetrieveAPIView):
    serializer_class = UserSerializer
    lookup_field = 'username'

    def get_queryset(self):
        user = self.request.user
        if user.username == self.kwargs['username']:
            queryset = Account.objects.prefetch_related(
                Prefetch('scripts', queryset=Script.objects.all(), to_attr='filtered_scripts'))
        else:
            queryset = Account.objects.prefetch_related(Prefetch('scripts', queryset=Script.objects.filter(visible=True), to_attr='filtered_scripts'))
        return queryset