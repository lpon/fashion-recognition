from django.db import models

# Create your models here.


class Image(models.Model): 
    path = models.FilePathField()
    tags = models.CharField(max_length=200)