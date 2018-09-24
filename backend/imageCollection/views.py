from django.shortcuts import render
from rest_framework import generics
from .models import Image 
from .serializers import ImageSerializer
from django.views.decorators.csrf import csrf_exempt

# Create your views here.
import json
import os
from pathlib import Path
from django.http import HttpResponse
from django.http import JsonResponse
from .models import Image
import urllib.request

absolutePath = mypath = Path().absolute()
    
@csrf_exempt
def getImages(request):
    """
    Uses Google's custom search engine to retrieve images based on the label.
    Returns a serialized list of urls.
    """
    print("getting request: ", request)
    response_data = {"images": ['https://cdn.shopify.com/s/files/1/1215/1636/products/1_aa0c3a5e-76a0-4335-a52d-6bbd814b419b.jpg?v=1526614713']}
    return JsonResponse(response_data)

# @csrf_exempt
# def saveTrainingImage(request):
#     """
#     Saves the image to its corresponding label directory (or creates one
#     if the label directory does not exist) in the Training directory. 
#     Returns a 200 HTTP response and a 400 response upon failure.
#     """
#     print("saving image to training foler")

# @csrf_exempt
# def saveTestImage(request):
#     """
#     Saves the image to its corresponding label directory (or creates one
#     if the label directory does not exist) in the Test directory. 
#     Returns a 200 HTTP response and a 400 response upon failure.
#     """
#     print("saving image to test folder")

@csrf_exempt
def saveImage(request):
    """
    Saves the image in both the Test and Training directories. 
    Returns a 200 HTTP response and a 400 response upon failure.
    """
    ## axios post requests encode the json data so we must decode it to use it
    data = json.loads(request.body.decode('utf-8'))
    print(type(data))
    url = data["url"]
    tags = data["tags"]

    imageName = (url.split('/')[-1]).split(".")[0] + ".jpg"
    imageDirPath = str(absolutePath) + "/images/"
    newImagePath = imageDirPath + imageName

    print("Preparing to save: ", imageName, " tags: ", tags)
    print(urllib.request.urlretrieve(url, newImagePath))

    newImage = Image.objects.create(path=newImagePath, tags=tags)
    newImage.save()
    
    return HttpResponse(200)


class ImageCreate(generics.ListCreateAPIView):
    """
    Not necessary as an endpoint since the front end will request the image 
    to be saved and when it being saved in the backend, it will also be added 
    to the database. 
    """
    queryset = Image.objects.all()
    serializer_class = ImageSerializer



