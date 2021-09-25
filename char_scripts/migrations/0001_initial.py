# Generated by Django 3.2.6 on 2021-09-25 17:10

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Character',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('name', models.CharField(max_length=30)),
                ('char_type', models.CharField(blank=True, max_length=30)),
                ('desc1', models.CharField(max_length=120)),
                ('desc2', models.CharField(blank=True, max_length=120)),
                ('desc3', models.CharField(blank=True, max_length=120)),
                ('night_first_desc', models.TextField(blank=True)),
                ('night_other_desc', models.TextField(blank=True)),
                ('night_first_order', models.DecimalField(decimal_places=2, default=0, max_digits=5)),
                ('night_other_order', models.DecimalField(decimal_places=2, default=0, max_digits=5)),
                ('custom', models.BooleanField(default=False)),
                ('visible', models.BooleanField(default=True)),
                ('playable', models.BooleanField(default=True)),
                ('image', models.ImageField(default='icon.png', upload_to='char_icons')),
                ('owner', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Script',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('title', models.CharField(blank=True, max_length=60)),
                ('description', models.TextField(blank=True)),
                ('author', models.CharField(blank=True, max_length=60)),
                ('script_type', models.CharField(default='Normal', max_length=30)),
                ('visible', models.BooleanField(default=True)),
                ('owner', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='scripts', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'ordering': ['-created_at'],
            },
        ),
        migrations.CreateModel(
            name='Version',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('version_num', models.IntegerField(default=1, editable=False)),
            ],
            options={
                'ordering': ['-version_num'],
            },
        ),
        migrations.CreateModel(
            name='VersionChar',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('character', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='char_scripts.character')),
                ('version', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='char_scripts.version')),
            ],
        ),
        migrations.AddField(
            model_name='version',
            name='characters',
            field=models.ManyToManyField(through='char_scripts.VersionChar', to='char_scripts.Character'),
        ),
        migrations.AddField(
            model_name='version',
            name='script',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='versions', to='char_scripts.script'),
        ),
    ]
