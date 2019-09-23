# -*- coding: utf-8 -*-
# Generated by Django 1.11.24 on 2019-09-18 17:14
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('interventions_dashboard', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='intervention',
            name='status',
            field=models.CharField(choices=[(b'd', b'Draft'), (b'v', b'Validated'), (b'c', b'Completed')], default=b'd', max_length=50),
        ),
    ]
