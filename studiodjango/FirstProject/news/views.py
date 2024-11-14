from django.shortcuts import render
from django.shortcuts import render,get_object_or_404
from django.http import HttpResponse
from .models import Articolo, Giornalista
# Create your views here.
def home(request):
    articoli = Articolo.objects.all()
    giornalisti = Giornalista.objects.all()
    context={"articoli": articoli, "giornalisti":giornalisti}
    return render(request,'homepage.html',context)
def articoloDetailView(request,pk):
    articolo = get_object_or_404(Articolo, pk=pk)
    context={"articolo":articolo}
    return render(request,'articoloDetail.html',context)
    
