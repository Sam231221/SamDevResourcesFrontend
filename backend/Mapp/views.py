from multiprocessing import managers
from uuid import RESERVED_FUTURE
from django.shortcuts import render
from django.views.generic import View

from Mapp.models import Resource
from django.db.models import Q  # New

from rest_framework.decorators import api_view
from rest_framework.response import Response

from Mapp.models import Category
from .serializers import CategorySerailizer, ResourceSerializer, ResourceTypeSerializer


'''
we use Q objects to make more complex queries following.
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



@api_view(['GET'])
def categoryListApiView(request):
    categories = Category.objects.order_by('id')
    serializer = CategorySerailizer(categories, many=True)
    print(serializer.data)
    return Response(serializer.data)

@api_view(['POST'])
def categoryCreateApiView(request):
    if request.data['category']:
        Category.objects.create(
            name=request.data['category']
        )
        return Response('Category '+ request.data['category']+ ' was created successfully!.')
    else:
        return Response("Cannot Create a Category with Empty Name.")

@api_view(['GET'])
def getCategoryByIdApiView(request, pk):
    category=Category.objects.filter(pk=pk).first()
    print('category:', category)
    if category:
        serializer = CategorySerailizer(category, many=False)
        return Response({'success':True, 'category': serializer.data})
    else:
        return Response({'success': False, 'message':'Could not get the category with that id'})    


@api_view(['PUT'])
def categoryUpdateApiView(request, pk):
    category=Category.objects.filter(pk=pk).first()
    print('category:', category)
    if category:
        category.name =request.data['category']
        category.save()
        serializer = CategorySerailizer(category, many=False)
        return Response({'success':True, 'category': serializer.data})
    else:
        return Response({'success': False, 'message':'Could not get the category with that id'})    


@api_view(['DELETE'])
def categoryDeleteApiView(request, pk):
    category=Category.objects.filter(pk=pk).first()  
    category.delete()
    return Response('Category Deleted Succesfully!')  



@api_view(['GET'])
def resourceListApiView(request):
    resources = Resource.objects.all()
    serializer = ResourceSerializer(resources, many=True)
    print(serializer.data)
    return Response(serializer.data)

@api_view(['GET'])
def resourceTypeListApiView(request):
    resourcetypes = Category.objects.all()
    serializer = ResourceTypeSerializer(resourcetypes, many=True)
    print(serializer.data)
    return Response(serializer.data)        