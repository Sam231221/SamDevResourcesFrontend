from django.urls import path
from . import views
urlpatterns = [
    path('dashboard',views.homeView, name='home' ),
    path('categories/', views.categoryListApiView, name="categories" ),
    path('getcategory/<str:pk>/', views.getCategoryByIdApiView, name="getcategorybyid" ),
     path('createcategory/', views.categoryCreateApiView, name="createcategory" ),
    path('updatecategory/<str:pk>/', views.categoryUpdateApiView, name="deletecategory" ),
    path('deletecategory/<str:pk>/', views.categoryDeleteApiView, name="deletecategory" ),

  
  
    path('resourcetypes/', views.resourceTypeListApiView, name="resources" ),
    path('getresourcetype/<str:pk>/', views.getResourceTypeByIdApiView ,name="getresourcetype" ),
    path('createresourcetype/', views.resourceTypeCreateApiView, name="createresourcetype"),
    path('updateresourcetype/<str:pk>/', views.resourceTypeUpdateApiView, name="updateresourcetype"),
    path('deleteresourcetype/<str:pk>/', views.resourceTypeDeleteApiView, name='deleteresourcetype'),


    path('resources/', views.resourceListApiView, name="resourcetypes"),
    path('getresource/<str:pk>/',views.getResourceByIdApiView, name="getresource"),
    path('createresource/', views.resourceCreateApiView, name="createresources"),
    path('updateresource/<str:pk>/', views.resourceUpdateApiView, name="updateresource"),
    path('deleteresource/<str:pk>/', views.resourceDeleteApiView, name="deleteresource"),

]