from django.urls import path

from .views import (
    ScriptListView, 
    ScriptDetailView,
    ScriptCreateView,
    ScriptUpdateView,
    ScriptDestroyView,
    AccountDetailView,
    VersionCreateView,
    VersionUpdateView,
    CharacterListView
    # CharacterDetailView,
    # CharacterCreateView,
    # CharacterUpdateView,
    # CharacterDestroyView,
    )

app_name = 'char_scripts'

urlpatterns = [
    path('script/', ScriptListView.as_view()),
    path('script/<int:pk>', ScriptDetailView.as_view()),
    path('script/create', ScriptCreateView.as_view()),
    path('script/<int:pk>/update', ScriptUpdateView.as_view()),
    path('script/<int:pk>/delete', ScriptDestroyView.as_view()),
    path('user/<str:username>', AccountDetailView.as_view()),
    path('version/<int:script_id>/create', VersionCreateView.as_view()),
    path('version/<int:script_id>/<int:pk>/update', VersionUpdateView.as_view()),
    path('character/', CharacterListView.as_view()),
    # path('character/<int:pk>', CharacterDetailView.as_view()),
    # path('character/create', CharacterCreateView.as_view()),
    # path('character/<int:pk>/update', CharacterUpdateView.as_view()),
    # path('character/<int:pk>/delete', CharacterDestroyView.as_view()),
]