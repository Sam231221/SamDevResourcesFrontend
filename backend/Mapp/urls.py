from django.urls import path
from . import views
urlpatterns = [
    path('',views.HomeView.as_view(), name='home' ),
    path('categories/', views.categoryListApiView, name="categories" ),
    path('getcategory/<str:pk>/', views.getCategoryByIdApiView, name="getcategorybyid" ),
     path('createcategory/', views.categoryCreateApiView, name="createcategory" ),
    path('updatecategory/<str:pk>/', views.categoryUpdateApiView, name="deletecategory" ),
    path('deletecategory/<str:pk>/', views.categoryDeleteApiView, name="deletecategory" ),

  
  
    path('resources', views.resourceListApiView, name="resources" ),
    path('resourcetypes', views.resourceTypeListApiView, name="resourcetypes" ),

]