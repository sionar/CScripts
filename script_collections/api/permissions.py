from django.core.exceptions import ObjectDoesNotExist
from accounts.models import Account
from rest_framework import permissions

class IsOwner(permissions.BasePermission):
  def has_object_permission(self, request, view, obj):
      return obj.owner == request.user