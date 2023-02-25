from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework import serializers
from .models import Profile
from .models import Product
from .models import Currency

class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = '__all__'
    def create(self, validated_data):
        user = self.context['user']
        print("-----------------------------------------------------------------------------------")
        print(user)
        return Profile.objects.create(**validated_data,user=user)
    
class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'

class CurrencySerializer(serializers.ModelSerializer):
    class Meta:
        model = Currency
        fields = '__all__'

class ProductJoinSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'
        # fields = ['id', 'title', 'description', 'image', 'price', 'currencyOf']
        depth = 1
