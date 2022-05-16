from unicodedata import category
from django.db import models

class Category(models.Model):
    name = models.CharField(max_length=100, null=True)
    
    def __str__(self)->str:
        return f'{self.name}'

class Resource(models.Model):
    name = models.CharField(max_length=100, null=True)
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True)
    def __str__(self)->str:
        return f'{self.name}'

class Element(models.Model):
    name = models.CharField(max_length=100, null=True)
    url = models.URLField(null=True)
    description = models.TextField(null=True, blank=True)
    resource = models.ForeignKey(Resource, on_delete=models.CASCADE, null=True)    