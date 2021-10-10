from django.db import models

# Create your models here.

class Collection(models.Model):
    created_at              = models.DateTimeField(auto_now_add=True)
    updated_at              = models.DateTimeField(auto_now=True)
    name                    = models.CharField(max_length=60)
    owner                   = models.ForeignKey('accounts.Account', on_delete=models.CASCADE, related_name='collections', null=True)
    visible                 = models.BooleanField(default=True)
    scripts                 = models.ManyToManyField('char_scripts.Script', through='ScriptCollection')

    class Meta:
        ordering = ['created_at']

    def __str__(self):
        return str(self.id) + '_' + str(self.name)

class ScriptCollection(models.Model):
    created_at              = models.DateTimeField(auto_now_add=True)
    script                  = models.ForeignKey('char_scripts.Script', on_delete=models.CASCADE)
    collection              = models.ForeignKey(Collection, on_delete=models.CASCADE)
