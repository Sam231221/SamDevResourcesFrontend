from django.shortcuts import render
from django.views.generic import View

from Mapp.models import Resource
from django.db.models import Q  # New
'''
we use Q objects to make more complex queries following

Use & (AND) operator to search for more than 2 fields. For example, when searching title & content, both should be true, when searching for a word such as “python”, so it(python) should be contained in both title and content fields
Use | (OR) operator to search for only one field. For example, when searching title | content, both don’t have to be true, only one is okay, when searching for a word such as “python”, so it(python) doesn’t have to be contained in both title and content fields
'''


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