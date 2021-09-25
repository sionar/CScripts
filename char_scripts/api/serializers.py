from django.contrib.sessions.backends.db import SessionStore
from django.db.models import Prefetch
from accounts.models import Account
from char_scripts.models import Script, Version, Character, VersionChar
from rest_framework import serializers

class AccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = ('username', 'is_guest')

class CharacterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Character
        fields = ('id', 'name', 'char_type', 'desc1', 'desc2', 'desc3', 'night_first_desc', 'night_other_desc', 'night_first_order', 'night_other_order', 'playable', 'custom', 'visible', 'image')

    def create(self, validated_data):
        validated_data['owner'] = self.context['request'].user
        return super().create(validated_data)

    def update(self, instance, validated_data):
        validated_data.pop('owner', None)
        validated_data.pop('custom', None)
        return super().update(instance, validated_data)

class CharacterPostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Character
        fields = ('id',)
        depth = 1


class VersionSerializer(serializers.ModelSerializer):
    script_id = serializers.ReadOnlyField()
    class Meta:
        model = Version
        fields = ('id', 'script_id', 'version_num', 'characters', )
        depth = 1
    characters = CharacterSerializer(many=True)

class VersionPostSerializer(serializers.ModelSerializer):
    characters = CharacterPostSerializer(many=True)
    class Meta:
        model = Version
        fields = ('id', 'version_num', 'characters',)
        depth = 1

    def create(self, validated_data):
        script = Script.objects.get(id=self.context['view'].kwargs['script_id'])
        validated_data['script'] = script
        latest_version = Version.objects.filter(script=script).first()
        version_num = latest_version.version_num + 1 if latest_version else 1
        validated_data['version_num'] = version_num
        validated_data.pop('characters')
        version = Version.objects.create(**validated_data)
        data = self.context['request'].data
        for element in data['characters']:
            id = element['id']
            character = Character.objects.get(id=id)
            vc = VersionChar(version=version, character=character)
            vc.save()
        return version

    def update(self, instance, validated_data):
        script = Script.objects.get(id=self.context['view'].kwargs['script_id'])
        latest_version = Version.objects.filter(script=script).first()
        version_num = latest_version.version_num
        validated_data['version_num'] = version_num
        if 'characters' in validated_data:
            validated_data.pop('characters')
        version = super().update(instance, validated_data)
        version.characters.clear()
        data = self.context['request'].data
        for element in data['characters']:
            id = element['id']
            character = Character.objects.get(id=id)
            vc = VersionChar(version=version, character=character)
            vc.save()
        return version


class ScriptSerializer(serializers.ModelSerializer):
    owner = AccountSerializer()
    versions = VersionSerializer(many=True, read_only=True)
    class Meta:
        model = Script
        fields = ('id', 'created_at', 'updated_at', 'owner', 'title', 'description', 'author', 'script_type', 'versions', 'visible')
        depth = 2

    @staticmethod
    def setup_eager_loading(queryset):
        queryset = queryset.select_related('owner')
        queryset = queryset.prefetch_related('versions', 'versions__characters')
        return queryset
    
class ScriptPostSerializer(serializers.ModelSerializer):
    owner = AccountSerializer(read_only=True)
    class Meta:
        model = Script
        fields = ('id', 'title', 'description', 'author', 'visible', 'script_type', 'owner')

    def create(self, validated_data):
        SCRIPT_TYPES = ['Normal', 'Teensyville', 'Phobos']
        user = self.context['request'].user
        validated_data['owner'] = user
        if validated_data['script_type'] not in SCRIPT_TYPES:
            raise serializers.ValidationError({'Invalid script type field.'})
        if user.is_guest:
            validated_data['visible'] = True
        return super().create(validated_data)

    def update(self, instance, validated_data):
        validated_data.pop('owner', None)
        user = self.context['request'].user
        if user.is_guest:
            validated_data.pop('visible', None)
        return super().update(instance, validated_data)

class UserSerializer(serializers.ModelSerializer):
    scripts = ScriptSerializer(source='filtered_scripts', many=True, read_only=True)
    class Meta:
        model = Account
        fields = ('username', 'is_guest', 'scripts')