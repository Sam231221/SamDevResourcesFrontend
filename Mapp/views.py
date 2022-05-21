from django.shortcuts import render
from django.views.generic import View

from Mapp.models import Resource
from django.db.models import Q  # New
class HomeView(View):
 def get(self, request):
    context={}
    search_resource = request.GET.get('query')
    if search_resource:
        resources = Resource.objects.filter(Q(name__icontains=search_resource))
    else:
        resources = Resource.objects.all()
    
    context={
        'resources': resources
    }
    return render(request, 'home.html', context)