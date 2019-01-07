from rest_framework import serializers
from .models import Image

class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        fields = (
            'id',
            'path',
            'tag'
        )
        model = Image

if __name__ == "__main__":
    print ("I'm in")