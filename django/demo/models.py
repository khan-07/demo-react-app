from django.db import models
# Create your models here.




class Note(models.Model):
    note = models.TextField()
    userid = models.BigIntegerField()
    timestamp = models.DateTimeField(auto_now_add=True)

class Location(models.Model):
    lat = models.CharField(max_length=30)
    long = models.CharField(max_length=30)
    alt = models.CharField(max_length=30)
    userid = models.IntegerField(default=None)
    timestamp = models.DateTimeField(auto_now_add=True)
