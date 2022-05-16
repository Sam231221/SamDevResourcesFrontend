from unicodedata import category
from django.shortcuts import render
from django.views.generic import View,TemplateView

from Mapp.models import Resource

class HomeView(TemplateView):
    template_name='home.html'

    def get_context_data(self, **kwargs):
        context = super(HomeView, self).get_context_data(**kwargs)
        context['webresources']=Resource.objects.filter(category__name='Web Development')
        context['learningresources']=Resource.objects.filter(category__name='Learning Resource')
        return context