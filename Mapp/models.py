from django.db import models

class Resource(models.Model):
    name = models.CharField(max_length=100, null=True)

class Element(models.Model):
    name = models.CharField(max_length=100, null=True)
    url = models.URLField(null=True)
    description = models.TextField(null=True, blank=True)
    resource = models.ForeignKey(Resource, on_delete=models.CASCADE, null=True)    