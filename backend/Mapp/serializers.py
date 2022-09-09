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
    category_name = serializers.SerializerMethodField()
    class Meta:
        model=ResourceType
        fields ="__all__"      

    #access by category_name in frontend
    def get_category_name(self, obj):
        return obj.category.name      