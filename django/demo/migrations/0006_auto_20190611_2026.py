# Generated by Django 2.2.2 on 2019-06-11 19:26

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('demo', '0005_auto_20190611_2013'),
    ]

    operations = [
        migrations.AlterField(
            model_name='note',
            name='userid',
            field=models.ForeignKey(default=None, on_delete=django.db.models.deletion.PROTECT, to=settings.AUTH_USER_MODEL),
        ),
    ]
