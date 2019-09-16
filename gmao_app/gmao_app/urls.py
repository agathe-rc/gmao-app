from django.conf.urls import url

from interventions_dashboard import views

urlpatterns = [
    url(r'^$', views.index, name='index'),
]
