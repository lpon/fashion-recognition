from django.db import models

# Create your models here.


class Image(models.Model): 
    path = models.CharField(max_length=250, unique=True)
    tags = models.CharField(max_length=250)
    objects = models.Manager()

    def __str__(self):
        return self.tags + ": " + self.path 


class LabelCurrentPage(models.Model): 
    label = models.CharField(max_length=250, unique=True)
    page = models.IntegerField()
    objects = models.Manager()

    def __str__(self):
        return self.label + " - " + str(self.page)