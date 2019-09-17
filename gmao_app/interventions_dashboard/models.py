# -*- coding: utf-8 -*-
from django.db import models

class Intervention(models.Model):
    """
    Table to track all interventions
    """
    STATUS = [
        ('d', 'Draft'),
        ('v', 'Validated'),
        ('c', 'Completed')
    ]
    label = models.CharField(max_length=200)
    description = models.TextField(blank=True, null=True)
    technician = models.CharField(max_length=200)
    location = models.CharField(max_length=200)
    date = models.DateTimeField(null=True, blank=True)
    status = models.CharField(max_length=50, choices=STATUS, default='d')