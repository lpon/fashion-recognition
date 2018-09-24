from django.db import models

# Create your models here.


class Image(models.Model): 
    path = models.CharField(max_length=250)
    tags = models.CharField(max_length=250)
    objects = models.Manager()