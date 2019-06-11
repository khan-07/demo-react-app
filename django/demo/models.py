from django.db import models
# Create your models here.
from django.contrib.auth.models import User


class Note(models.Model):
    note = models.TextField()
    userid = models.ForeignKey(User, models.PROTECT, default=None)
    timestamp = models.DateTimeField(auto_now_add=True)

class Location(models.Model):
    lat = models.CharField(max_length=30)
    long = models.CharField(max_length=30)
    alt = models.CharField(max_length=30)
    # userid = models.IntegerField(default=None)
    userid = models.ForeignKey(User, models.PROTECT, default=None)
    timestamp = models.DateTimeField(auto_now_add=True)
