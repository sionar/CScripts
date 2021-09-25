from django.db import models
from accounts.models import Account

class Script(models.Model):
    created_at              = models.DateTimeField(auto_now_add=True)
    updated_at              = models.DateTimeField(auto_now=True)
    owner                   = models.ForeignKey('accounts.Account', related_name='scripts', on_delete=models.SET_NULL, null=True)
    title                   = models.CharField(max_length=60, blank=True)
    description             = models.TextField(blank=True)
    author                  = models.CharField(max_length=60, blank=True)
    script_type             = models.CharField(max_length=30, default='Normal')
    visible                 = models.BooleanField(default=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return self.title


class Version(models.Model):
    created_at              = models.DateTimeField(auto_now_add=True)
    updated_at              = models.DateTimeField(auto_now=True)
    script                  = models.ForeignKey(Script, on_delete=models.CASCADE, related_name='versions')
    version_num             = models.IntegerField(default=1, blank=False, editable=False)
    characters              = models.ManyToManyField('Character', through='VersionChar')

    # objects = VersionManager()

    class Meta:
        ordering = ['-version_num']

    def __str__(self):
        return str(self.script.id) + '_' + str(self.version_num)

    def script_id(self):
        return self.script.id


class CharacterManager(models.Manager):
    def create(self, *args, **kwargs):
        user = kwargs['owner']
        if not user.is_guest and user.is_admin:
            kwargs['custom'] = False
        else:
            kwargs['custom'] = True
        return super(CharacterManager, self).create(*args, **kwargs)   


class Character(models.Model):
    created_at              = models.DateTimeField(auto_now_add=True)
    updated_at              = models.DateTimeField(auto_now=True)
    owner                   = models.ForeignKey('accounts.Account', on_delete=models.SET_NULL, null=True)    
    name                    = models.CharField(max_length=30)
    char_type               = models.CharField(max_length=30, blank=True)
    desc1                   = models.CharField(max_length=120)
    desc2                   = models.CharField(max_length=120, blank=True)
    desc3                   = models.CharField(max_length=120, blank=True)
    night_first_desc        = models.TextField(blank=True)
    night_other_desc        = models.TextField(blank=True)
    night_first_order       = models.DecimalField(max_digits=5, decimal_places=2, default=0, blank=False)
    night_other_order       = models.DecimalField(max_digits=5, decimal_places=2, default=0, blank=False)
    custom                  = models.BooleanField(default=False)
    visible                 = models.BooleanField(default=True)
    playable                = models.BooleanField(default=True)
    image                   = models.ImageField(default='icon.png',upload_to='char_icons')

    objects = CharacterManager()

    def __str__(self):
        return self.name

class VersionChar(models.Model):
    created_at              = models.DateTimeField(auto_now_add=True)
    character               = models.ForeignKey(Character, on_delete=models.CASCADE)
    version                 = models.ForeignKey(Version, on_delete=models.CASCADE)
