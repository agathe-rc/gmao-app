# -*- coding: utf-8 -*-
from .models import Intervention
from rest_framework import serializers

class InterventionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Intervention
        fields = ['id', 'label', 'description', 'technician', 'location', 'date', 'status']