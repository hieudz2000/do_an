# Generated by Django 4.2.2 on 2023-07-29 09:00

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('TestAPI', '0005_remove_addlink_text_historylogin'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='linkblock',
            name='user',
        ),
        migrations.DeleteModel(
            name='CountLink',
        ),
        migrations.DeleteModel(
            name='LinkBlock',
        ),
    ]
