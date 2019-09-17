# -*- coding: utf-8 -*-
from django.http import HttpResponse

from rest_framework import viewsets
from rest_framework.response import Response

from .serializers import InterventionSerializer
from .models import Intervention


def index(request):
    return HttpResponse("Hello, world. You're at the polls index.")


class InterventionViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows interventions to be viewed or edited.
    """
    queryset = Intervention.objects.all()
    serializer_class = InterventionSerializer

    def get(self, request, *args):
        return Response(self.serializer_class(queryset).data)
