from rest_framework.response import Response
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from rest_framework.views import APIView
from rest_framework import status
from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Profile
from .models import Product
from .models import Category
from .models import Currency
from .serializers import ProfileSerializer
from .serializers import ProductSerializer
from .serializers import CurrencySerializer
from .serializers import ProductJoinSerializer


# Serializers
# login start
class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
 
        # Add custom claims
        token['username'] = user.username
        token['email'] = user.email
        token['waga'] = "baga"
        # ...
 
        return token

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

# login end

# register
@api_view(['POST'])
def register(request):
    user = User.objects.create_user(
                username=request.data['username'],
                email=request.data['email'],
                password=request.data['password'],
                is_superuser=1
            )
    user.is_active = True
    user.is_staff = True
    user.save()
    return Response("new user born")


# test only start...........
@api_view(['GET'])
def test(r):
    return Response ("test")

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def test_pri(r):
    return Response ("private area")
# test only end...........

        
@permission_classes([IsAuthenticated])
class ProfileView(APIView):
    def get(self, request):
        # if request.user.is_authenticated:
            my_model = Profile.objects.all()
            serializer = ProfileSerializer(my_model, many=True)
            return Response(serializer.data)
        # return Response("please login...")

    def post(self, request):
        serializer = ProfileSerializer(data=request.data, context={'user': request.user})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
   
    def put(self, request, pk):
        my_model = Profile.objects.get(pk=pk)
        serializer = ProfileSerializer(my_model, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# class ProductSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Product
#         fields = '__all__'

# class CurrencySerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Currency
#         fields = '__all__'

# class ProductJoinSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Product
#         fields = '__all__'
#         # fields = ['id', 'title', 'description', 'image', 'price', 'currencyOf']
#         depth = 1

@permission_classes([IsAuthenticated])
class ProductView(APIView):

    def get(self, request):
        # if request.user.is_authenticated:
            my_model = Product.objects.all()
            # print(my_model)
            # products = []

            # for product in my_model:
            #     products.append({'id': product.id, 'description': product.description, 'currency': product.currency})

            # print(products)
            # return products
            serializer = ProductJoinSerializer(my_model, many=True)
            # print(serializer.data)
            return Response(serializer.data)
        # return Response("please login...")

    def post(self, request):
        serializer = ProductSerializer(data=request.data, context={'user': request.user})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
   
    def put(self, request, pk):
        my_model = Product.objects.get(pk=pk)
        serializer = ProductSerializer(my_model, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
   
    def delete(self, request, pk):
        my_model = Product.objects.get(pk=pk)
        my_model.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

# student CRUD - start


# @permission_classes([IsAuthenticated])
# class StudentView(APIView):

#     def get(self, request):
#         # if request.user.is_authenticated:
#             my_model = Student.objects.all()
#             serializer = StudentSerializer(my_model, many=True)
#             return Response(serializer.data)
#         # return Response("please login...")

#     def post(self, request):
#         serializer = StudentSerializer(data=request.data, context={'user': request.user})
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data, status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
   
#     def put(self, request, pk):
#         my_model = Student.objects.get(pk=pk)
#         serializer = StudentSerializer(my_model, data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
   
#     def delete(self, request, pk):
#         my_model = Student.objects.get(pk=pk)
#         my_model.delete()
#         return Response(status=status.HTTP_204_NO_CONTENT)

# # student CRUD - end
