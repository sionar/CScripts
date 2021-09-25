from django.contrib import admin

# Register your models here.
from .models import Character, Script, Version

admin.site.register(Character)
admin.site.register(Script)
admin.site.register(Version)
