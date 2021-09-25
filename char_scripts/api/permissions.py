from django.core.exceptions import ObjectDoesNotExist
from char_scripts.models import Script
from rest_framework import permissions

class IsOwnerOrVisible(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        return obj.visible or obj.owner == request.user

class IsOwnerOrVisibleVersion(permissions.BasePermission):
    def has_permission(self, request, view):
        try:
            script = Script.objects.get(id=view.kwargs['script_id'])
            return script.visible or script.owner == request.user
        except ObjectDoesNotExist:
            return False
    
class IsOwnerOrAdmin(permissions.BasePermission):
    def has_permission(self, request, view):
        user = request.user
        try:
            script = Script.objects.get(id=view.kwargs['pk'])
            return script.owner == user or user.is_admin or user.is_staff or user.is_superuser
        except ObjectDoesNotExist:
            return False

class IsScriptOwner(permissions.BasePermission):
    def has_permission(self, request, view):
        user = request.user
        try:
            script = Script.objects.get(id=view.kwargs['script_id'])
            return script.owner != None and script.owner == request.user
        except ObjectDoesNotExist:
            return False

class IsOwnerOrAdminCharacter(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        user = request.user
        return obj.owner == user or user.is_admin or user.is_staff or user.is_superuser