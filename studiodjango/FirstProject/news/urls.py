from django.urls import path
from news.views import home, articoloDetailView

urlpatterns = [
    path('', home, name='homeviews'),
    path('articolo/<int:pk>', articoloDetailView, name='articoloDatail'),
]