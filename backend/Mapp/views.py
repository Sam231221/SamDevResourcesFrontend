from multiprocessing import managers
from uuid import RESERVED_FUTURE
from django.shortcuts import render
from django.views.generic import View

from Mapp.models import Resource
from django.db.models import Q  # New

from rest_framework.decorators import api_view
from rest_framework.response import Response

from Mapp.models import Category
from Mapp.models import ResourceType
from .serializers import CategorySerailizer, ResourceSerializer, ResourceTypeSerializer


'''
we use Q objects to make more complex queries following.
Use & (AND) operator to search for more than 2 fields. For example, when searching title & content, both should be true, when searching for a word such as “python”, so it(python) should be contained in both title and content fields
Use | (OR) operator to search for only one field. For example, when searching title | content, both don’t have to be true, only one is okay, when searching for a word such as “python”, so it(python) doesn’t have to be contained in both title and content fields
'''


@api_view(['GET'])
def homeView(request):
    keyword =request.GET.get('keyword')
    print(keyword)
    if not keyword:
        resourcetype_list=list(ResourceType.objects.values())
        print(resourcetype_list)
        for resource_type in resourcetype_list:
            rt=ResourceType.objects.get(id=resource_type['id'])
            print('rt:', rt)
            resource_type['resources'] = list(rt.resource_set.values())
        print('\n',resourcetype_list)
        return Response(resourcetype_list)
    else:
        resourcetype_list=list(ResourceType.objects.filter(name__icontains=keyword).values())
        print(resourcetype_list)
        for resource_type in resourcetype_list:
            rt=ResourceType.objects.get(id=resource_type['id'])
            print('rt:', rt)
            resource_type['resources'] = list(rt.resource_set.values())
        print('\n',resourcetype_list)
        return Response(resourcetype_list)        

'''
@api_view(['GET'])
def homeView(request):
    resource_list=list(Resource.objects.values())
    r = ResourceType.objects.get(id =1)
    v= list(r.resource_set.values())
    print('\n',v)
    return Response(resource_list)


@api_view(['GET'])
def homeView(request):
    resourcetype_list=list(Resource.objects.values())
    print(resourcetype_list)
    for resource_type in resourcetype_list:
        rt=ResourceType.objects.filter(pk=resource_type['id']).first()
        print('rt:', rt)
        resource_type['resources'] = list(rt.resource_set.values())
    print('\n',resourcetype_list)
    return Response(resourcetype_list)
'''

"""--------------------------------
Category API
--------------------------------"""


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



"""--------------------------------
ResourceType API
--------------------------------"""

@api_view(['GET'])
def resourceTypeListApiView(request):
    resourcetypes = ResourceType.objects.all()
    print(resourcetypes)
    serializer = ResourceTypeSerializer(resourcetypes, many=True)
    print(serializer.data)
    return Response(serializer.data)    

@api_view(['POST'])
def resourceTypeCreateApiView(request):
    name = request.data['name']
    category = request.data['category']

    if name and category:
        category_obj = Category.objects.filter(name=category).first()
        print('\ncategoryob:',category_obj.name, '\n')
        ResourceType.objects.create(
            name=name, category=category_obj
        )
        return Response('ResourceType '+ name+ ' was created successfully!.')
    else:
        return Response("Cannot Create a ResourceType with Empty fields.")

@api_view(['GET'])
def getResourceTypeByIdApiView(request, pk):
    resourcetype=ResourceType.objects.filter(pk=pk).first()
    print('ResourceType:', resourcetype)
    if resourcetype:
        serializer = ResourceTypeSerializer(resourcetype, many=False)
        return Response({'success':True, 'resourcetype': serializer.data})
    else:
        return Response({'success': False, 'message':'Could not get the ResourceType with that id'})    


@api_view(['PUT'])
def resourceTypeUpdateApiView(request, pk):
    print('\n\n')
    resourcetype=ResourceType.objects.filter(pk=pk).first()
    category_obj = Category.objects.filter(name=request.data['categoryname']).first()
    if resourcetype:
        resourcetype.name =request.data['name']
        resourcetype.category =category_obj
        resourcetype.save()
        serializer = ResourceTypeSerializer(resourcetype, many=False)
        return Response({'success':True, 'resourcetype': serializer.data})
    else:
        return Response({'success': False, 'message':'Could not get the category with that id'})    

@api_view(['DELETE'])
def resourceTypeDeleteApiView(request, pk):
    resourcetype=ResourceType.objects.filter(pk=pk).first()  
    resourcetype.delete()
    return Response('ResourceType Deleted Succesfully!')  



"""--------------------------------
Resource API
--------------------------------"""

@api_view(['GET'])
def resourceListApiView(request):
    resources = Resource.objects.all()
    serializer = ResourceSerializer(resources, many=True)
    print('\n\n\n')
    print(serializer.data)
    return Response(serializer.data)


@api_view(['POST'])
def resourceCreateApiView(request):
    name = request.data['name']
    url = request.data['url']
    description = request.data['description']
    resourcetype = request.data['resourcetype']

    if name and url and description and resourcetype:
        resourcetype_obj = ResourceType.objects.filter(name=resourcetype).first()
        print(resourcetype_obj)
        Resource.objects.create(
            name=name, url=url, description=description ,resource=resourcetype_obj
        )
        return Response('Resource '+ name+ ' was created successfully!.')
    else:
        return Response("Cannot Create a Resource with Empty fields.")

@api_view(['GET'])
def getResourceByIdApiView(request, pk):
    resource=Resource.objects.filter(pk=pk).first()
    print('ResourceType:', resource)
    if resource:
        serializer = ResourceSerializer(resource, many=False)
        return Response({'success':True, 'resource': serializer.data})
    else:
        return Response({'success': False, 'message':'Could not get the Resource with that id'})    


@api_view(['PUT'])
def resourceUpdateApiView(request, pk):
    resource=Resource.objects.filter(pk=pk).first()
    print('Resource:', resource)
    resourcetype_obj = ResourceType.objects.filter(name=request.data['resourcetype'] ).first()
    if resource:
        resource.name =request.data['name']
        resource.url = request.data['url']
        resource.description = request.data['description']
        resource.resource = resourcetype_obj
        resource.save()
        serializer = ResourceSerializer(resource, many=False)
        return Response({'success':True, 'resource': serializer.data})
    else:
        return Response({'success': False, 'message':'Could not get the category with that id'})    


@api_view(['DELETE'])
def resourceDeleteApiView(request, pk):
    resource=Resource.objects.filter(pk=pk).first()  
    resource.delete()
    return Response('Resourc Deleted Succesfully!')  


    