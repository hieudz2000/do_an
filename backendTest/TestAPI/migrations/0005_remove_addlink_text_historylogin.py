# Generated by Django 4.2.2 on 2023-07-29 08:53

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('TestAPI', '0004_remove_history_count_remove_history_count_all'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='addlink',
            name='text',
        ),
        migrations.CreateModel(
            name='HistoryLogin',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('timeLogin', models.DateTimeField(default=django.utils.timezone.now)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]