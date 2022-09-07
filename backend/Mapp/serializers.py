from .models import Resource, ResourceType, Category
from rest_framework import serializers

class CategorySerailizer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = "__all__"

class ResourceSerializer(serializers.ModelSerializer):
    class Meta:
        model=Resource
        fields ="__all__"

class ResourceTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model=ResourceType
        fields ="__all__"        