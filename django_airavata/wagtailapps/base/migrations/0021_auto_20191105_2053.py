# -*- coding: utf-8 -*-
# Generated by Django 1.11.21 on 2019-11-05 20:53
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion
import modelcluster.fields


class Migration(migrations.Migration):

    dependencies = [
        ('django_airavata_wagtail_base', '0020_auto_20190417_1949'),
    ]

    operations = [
        migrations.CreateModel(
            name='CssLink',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('sort_order', models.IntegerField(blank=True, editable=False, null=True)),
                ('url', models.CharField(help_text='URL of CSS stylesheet.', max_length=255)),
            ],
            options={
                'ordering': ['sort_order'],
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='ExtraWebResources',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
            ],
            options={
                'verbose_name_plural': 'Extra Web Resources',
            },
        ),
        migrations.CreateModel(
            name='JsLink',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('sort_order', models.IntegerField(blank=True, editable=False, null=True)),
                ('url', models.CharField(help_text='URL of JavaScript script.', max_length=255)),
                ('extra_web_resources', modelcluster.fields.ParentalKey(on_delete=django.db.models.deletion.CASCADE, related_name='js_links', to='django_airavata_wagtail_base.ExtraWebResources')),
            ],
            options={
                'ordering': ['sort_order'],
                'abstract': False,
            },
        ),
        migrations.AddField(
            model_name='csslink',
            name='extra_web_resources',
            field=modelcluster.fields.ParentalKey(on_delete=django.db.models.deletion.CASCADE, related_name='css_links', to='django_airavata_wagtail_base.ExtraWebResources'),
        ),
    ]