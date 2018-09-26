from django.shortcuts import render
from rest_framework import generics
from .models import Image 
from .serializers import ImageSerializer
from django.views.decorators.csrf import csrf_exempt

# Create your views here.
import json
import os
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
        labelCurrentPage = LabelCurrentPage.objects.create(label=searchTerm, page=0)
        labelCurrentPage.save()
    else:
        labelCurrentPage = LabelCurrentPage.objects.get(label=searchTerm).page


    my_cse_id = CONFIG["my_cse_id"]
    my_api_key = CONFIG["my_api_key"]
    response_data = {"urls": []}
    
    # i = 0
    # while (i < 10):
    #     startIndex = labelCurrentPage
    #     searchUrl = "https://www.googleapis.com/customsearch/v1?q=" + \
    #         searchTerm + "&start=" + str(startIndex) + "&key=" + my_api_key + "&cx=" + my_cse_id + \
    #         "&searchType=image"

    #     result = json.loads(requests.get(searchUrl).content.decode('utf-8'))
    #     print(result)
    #     for item in result["items"]:
    #         response_data["urls"].append(item["link"])
        
    #     startIndex += 10
    #     i += 1

    response_data["urls"] = ([
                        'https://i.ebayimg.com/images/g/RVkAAOSwQ6pZkrHB/s-l300.jpg', 
                        'https://i.ebayimg.com/images/g/4vUAAOSw44BYWIar/s-l300.jpg', 
                        'https://cdn.shopify.com/s/files/1/0758/2735/products/TB2KbmOqpXXXXasXXXXXXXXXXXX__108409380.jpg_600x600_3a0893ff-53c2-401f-8144-ecb7dbcfd243.jpg?v=1510921323', 
                        'https://ae01.alicdn.com/kf/HTB101TxRVXXXXcGXpXXq6xXFXXXt/Harajuku-Skirts-Womens-2017-Korean-Summer-Style-New-Plaid-Pleated-Skirt-Rock-Kawaii-High-Waist-Fashion.jpg_640x640.jpg', 
                        'https://cdn.store-assets.com/s/113714/i/427524.jpeg', 
                        'https://dlp2gfjvaz867.cloudfront.net/product_photos/38567286/U_5DA_5D)_5B_25VAGIGCXJ8Q3AK2_5DB_original.png', 'https://gd.image-gmkt.com/li/060/420/1007420060.g_400-w-st_g.jpg', 
                        'https://ae01.alicdn.com/kf/HTB12C1sQVXXXXXQapXXq6xXFXXXA/2018-New-Korean-Style-Summer-Women-High-Waisted-Pleated-Lace-Black-Skirts-Female-Casual-Three-Layers.jpg_640x640.jpg', 
                        'https://i.ebayimg.com/images/g/RVkAAOSwQ6pZkrHB/s-l300.jpg'
                        ])

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



