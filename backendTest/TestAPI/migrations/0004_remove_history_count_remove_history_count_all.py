# Generated by Django 4.2.2 on 2023-07-19 09:19

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('TestAPI', '0003_history_is_18_history_time_countlink'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='history',
            name='count',
        ),
        migrations.RemoveField(
            model_name='history',
            name='count_all',
        ),
    ]
