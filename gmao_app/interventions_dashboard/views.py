# -*- coding: utf-8 -*-
from django.http import HttpResponse, Http404

from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import status

from .serializers import InterventionSerializer
from .models import Intervention


class InterventionViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows interventions to be viewed or edited.
    """
    queryset = Intervention.objects.all()
    serializer_class = InterventionSerializer

    def get_intervention(self, pk):
        try:
            return Intervention.objects.get(pk=pk)
        except Intervention.DoesNotExist:
            raise Http404

    # Retrieve list of interventions
    def get(self, request):
        return Response(self.serializer_class(queryset).data)

    # Create intervention
    def post(self, request):
        serializer = InterventionSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # Update intervention
    def put(self, request, pk):
        intervention = self.get_intervention(pk)
        serializer = InterventionSerializer(instance=intervention, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # Delete intervention
    def delete(self, request, pk):
        intervention = self.get_intervention(pk)
        intervention.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)