from .models import Category,  Resource, ResourceType
from django.contrib import admin

admin.site.register(Category)
class ResourceAlbum(admin.TabularInline):
   model = Resource
   extra = 5
  
class ResourceAdmin(admin.ModelAdmin):
   inlines = [ResourceAlbum]   
   
admin.site.register(ResourceType, ResourceAdmin)