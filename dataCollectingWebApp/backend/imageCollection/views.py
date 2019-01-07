from django.shortcuts import render
from rest_framework import generics
from .serializers import ImageSerializer
from django.views.decorators.csrf import csrf_exempt

# Create your views here.
import json
import os
import shutil
import requests
from pathlib import Path
from django.http import HttpResponse
from django.http import JsonResponse
from .models import Image, LabelCurrentPage
from google_images_search import GoogleImagesSearch
import urllib.request
from .config import CONFIG

absolutePath = mypath = Path().absolute()
    
@csrf_exempt
def getImages(request):
    """
    Uses Google's custom search engine to retrieve images based on the label.
    Returns a serialized list of urls.
    """
    print("getting request: ", request)
    data = json.loads(request.body.decode('utf-8'))
    searchTerm = data["label"]
    
    if LabelCurrentPage.objects.filter(label=searchTerm).count() == 0:
        labelCurrentPage = LabelCurrentPage.objects.create(label=searchTerm, page=1)
        labelCurrentPage.save()

    currentPage = LabelCurrentPage.objects.get(label=searchTerm).page

    my_cse_id = CONFIG["my_cse_id"]
    print(my_cse_id)
    my_api_key = CONFIG["my_api_key"]
    print(my_api_key)
    response_data = {"urls": []}
    
    i = 0

    while (i <= 50):
        startIndex = currentPage + i
        # print("count ", startIndex)
        searchUrl = "https://www.googleapis.com/customsearch/v1?q=" + \
            searchTerm + "&start=" + str(startIndex) + "&key=" + my_api_key + "&cx=" + my_cse_id + \
            "&searchType=image"

        result = json.loads(requests.get(searchUrl).content.decode('utf-8'))
        print(result)
        print(result.keys)
        
        if "items" not in result:
            break

        for item in result["items"]:
            response_data["urls"].append(item["link"])
        
        i += 10

    # response_data["urls"] = ([
    #                     'https://i.ebayimg.com/images/g/RVkAAOSwQ6pZkrHB/s-l300.jpg', 
    #                     'https://i.ebayimg.com/images/g/4vUAAOSw44BYWIar/s-l300.jpg', 
    #                     'https://cdn.shopify.com/s/files/1/0758/2735/products/TB2KbmOqpXXXXasXXXXXXXXXXXX__108409380.jpg_600x600_3a0893ff-53c2-401f-8144-ecb7dbcfd243.jpg?v=1510921323', 
    #                     'https://ae01.alicdn.com/kf/HTB101TxRVXXXXcGXpXXq6xXFXXXt/Harajuku-Skirts-Womens-2017-Korean-Summer-Style-New-Plaid-Pleated-Skirt-Rock-Kawaii-High-Waist-Fashion.jpg_640x640.jpg', 
    #                     'https://cdn.store-assets.com/s/113714/i/427524.jpeg', 
    #                     'https://dlp2gfjvaz867.cloudfront.net/product_photos/38567286/U_5DA_5D)_5B_25VAGIGCXJ8Q3AK2_5DB_original.png', 'https://gd.image-gmkt.com/li/060/420/1007420060.g_400-w-st_g.jpg', 
    #                     'https://ae01.alicdn.com/kf/HTB12C1sQVXXXXXQapXXq6xXFXXXA/2018-New-Korean-Style-Summer-Women-High-Waisted-Pleated-Lace-Black-Skirts-Female-Casual-Three-Layers.jpg_640x640.jpg', 
    #                     'https://i.ebayimg.com/images/g/RVkAAOSwQ6pZkrHB/s-l300.jpg'
    #                     ])
    # print(response_data)
    return JsonResponse(response_data)

@csrf_exempt
def setCurrentPage(request):
    """
    Sets the current index for this specific search request so that when the term is
    searched again, the images are gathered from the current index.
    """
    data = json.loads(request.body.decode('utf-8'))
    searchTerm = data["label"]
    count = data["count"]
    
    if LabelCurrentPage.objects.filter(label=searchTerm).count() == 1:
        print(LabelCurrentPage.objects.get(label=searchTerm).page)
        label = LabelCurrentPage.objects.get(label=searchTerm)
        label.page += count
        label.save()
        print(LabelCurrentPage.objects.get(label=searchTerm).page)

    return HttpResponse(200)

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
    imageName = (url.split('/')[-1]).split(".")[0] + ".jpg"

    if "tag" not in data:
        tag = "test"
        imageDirPath = str(absolutePath) + "/images/test/"
    else:
        tag = data["tag"]
        imageDirPath = str(absolutePath) + "/images/training/"

    newImagePath = imageDirPath + imageName

    print("Preparing to save: ", imageName, " tag: ", tag)
    print(urllib.request.urlretrieve(url, newImagePath))

    newImage = Image.objects.create(path=newImagePath, tag=tag)
    newImage.save()
    
    return HttpResponse(200)


def processDataIntoLabelledDirectories():
    """
    Adds the images currently stored in the database into directories named after
    a given label.
    """
    
    allImages = Image.objects.all()

    labelledDirs = {"korean_jacket": str(absolutePath) + "/imageCollection/dataset/korean_jacket", 
                    "korean_pants": str(absolutePath) + "/imageCollection/dataset/korean_pants",
                    "korean_shirt": str(absolutePath) + "/imageCollection/dataset/korean_shirt",
                    "korean_skirt": str(absolutePath) + "/imageCollection/dataset/korean_skirt",
                    "korean_sweater": str(absolutePath) + "/imageCollection/dataset/korean_sweater",
                    "korean_shorts": str(absolutePath) + "/imageCollection/dataset/korean_shorts",
                    "korean_dress": str(absolutePath) + "/imageCollection/dataset/korean_dress",
                    "western_jacket": str(absolutePath) + "/imageCollection/dataset/western_jacket",
                    "western_pants": str(absolutePath) + "/imageCollection/dataset/western_pants",
                    "western_shirt": str(absolutePath) + "/imageCollection/dataset/western_shirt",
                    "western_skirt": str(absolutePath) + "/imageCollection/dataset/western_skirt",
                    "western_sweater": str(absolutePath) + "/imageCollection/dataset/western_sweater",
                    "western_shorts": str(absolutePath) + "/imageCollection/dataset/western_shorts",
                    "western_dress": str(absolutePath) + "/imageCollection/dataset/western_dress",
                    }
    
    for image in allImages:
        tag = image.tag
        key = "" 

        if "korean" in tag:
            key = "korean" 
        else:
             key = "western"

        if "jacket" in tag or "coat" in tag: 
            key += "_jacket"
        elif "pants" in tag: 
            key += "_pants"
        elif "shirt" in tag or "top" in tag or "blouse" in tag: 
            key += "_shirt"
        elif "skirt" in tag: 
            key += "_skirt"                        
        elif "sweater" in tag: 
            key += "_sweater"
        elif "shorts" in tag: 
            key += "_shorts"
        elif "dress" in tag: 
            key += "_dress"    

        shutil.copy(image.path, labelledDirs[key])


class ImageCreate(generics.ListCreateAPIView):
    """
    Not necessary as an endpoint since the front end will request the image 
    to be saved and when it being saved in the backend, it will also be added 
    to the database. 
    """
    queryset = Image.objects.all()
    serializer_class = ImageSerializer



