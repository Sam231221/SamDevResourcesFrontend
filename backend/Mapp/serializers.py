from .models import Resource, ResourceType, Category
from rest_framework import serializers

class CategorySerailizer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = "__all__"

class ResourceTypeSerializer(serializers.ModelSerializer):
    category_name = serializers.SerializerMethodField()
    class Meta:
        model=ResourceType
        fields ="__all__"      

    #access by category_name in frontend
    def get_category_name(self, obj):
        return obj.category.name      

class ResourceSerializer(serializers.ModelSerializer):
    resourcetype_name = serializers.SerializerMethodField()
    class Meta:
        model=Resource
        fields ="__all__"

    #access by resourcetype_name in frontend(YOu must include custom field i.e resourcetype_name)
    def get_resourcetype_name(self, obj):
        return obj.resource.name     

