from django.shortcuts import render

# Create your views here.


class ImageCollection: 
    root_dir = "~/Desktop"

    def getImages(label):
        """
        Uses Google's custom search engine to retrieve images based on the label.
        Returns a serialized list of urls.
        """
        print("getting images")

    def saveTrainingImage(image_data):
        """
        Saves the image to its corresponding label directory (or creates one
        if the label directory does not exist) in the Training directory. 
        Returns a 200 HTTP response and a 400 response upon failure.
        """
        print("saving image to training foler")

    def saveTestImage(image_data):
        """
        Saves the image to its corresponding label directory (or creates one
        if the label directory does not exist) in the Test directory. 
        Returns a 200 HTTP response and a 400 response upon failure.
        """
        print("saving image to test folder")

    
    def saveImage(image_data):
        """
        Saves the image in both the Test and Training directories. 
        Returns a 200 HTTP response and a 400 response upon failure.
        """
        saveTestImage(image_data)
        saveTrainingImage(image_data)




