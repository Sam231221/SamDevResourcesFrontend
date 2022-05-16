from .models import Category, Element, Resource
from django.contrib import admin

admin.site.register(Category)
class ElementAlbum(admin.TabularInline):
   model = Element
   extra = 5
  
class ResourceAdmin(admin.ModelAdmin):
   inlines = [ElementAlbum]   
   
admin.site.register(Resource, ResourceAdmin)