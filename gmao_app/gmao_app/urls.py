from django.conf.urls import url, include
from rest_framework import routers

from django.contrib import admin
from interventions_dashboard import views

router = routers.DefaultRouter()

router.register(
    r'^interventions',
    views.InterventionViewSet,
    base_name='interventions'
)

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^api/', include(router.urls, namespace='api')),
    url(r'^$', views.index, name='index')
]

