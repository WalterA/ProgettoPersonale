from django.shortcuts import render
from django.http import HttpResponse
# Create your views here.
def homepage(request):
    return HttpResponse("<h1>Welcome to the homepage!</h1>")
def index(request):
    return HttpResponse("<h1>Pages</h1>")