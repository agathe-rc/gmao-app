# -*- coding: utf-8 -*-
from django.contrib import admin
from interventions_dashboard.models import Intervention

class InterventionAdmin(admin.ModelAdmin):
    list_display = ('label', 'description', 'technician', 'location', 'date', 'status')
    fields=('label', 'description', 'technician', 'location', 'date', 'status')

    admin.site.register(Intervention)


    