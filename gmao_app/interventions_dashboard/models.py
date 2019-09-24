# -*- coding: utf-8 -*-
from django.db import models

class Intervention(models.Model):
    """
    Table to track all interventions
    """
    STATUS = [
        ('d', 'Draft'),
        ('v', 'Validated'),
        ('c', 'Closed')
    ]
    
    label = models.CharField(max_length=200)
    description = models.TextField(null=True)
    technician = models.CharField(max_length=200, blank=True)
    location = models.CharField(max_length=200)
    date = models.DateTimeField(null=True, blank=True)
    status = models.CharField(max_length=50, choices=STATUS, default='d')