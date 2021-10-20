from django.shortcuts import render
from django.http import JsonResponse
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from django.contrib.auth.models import User

from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from django.contrib.auth.hashers import make_password

from .models import *
from .serializers import *


@api_view(['GET'])
def get_products(request):
    """
    List all code snippets, or create a new snippet.
    """
    products = Product.objects.all()
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def get_product(request, pk):
    try:
        products = Product.objects.get(_id=pk)
    except:
        return Response(status=status.HTTP_404_NOT_FOUND)

    serializer = ProductSerializer(products, many=False)
    return Response(serializer.data)


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)

        serializer = UserSerializerWithToken(self.user).data

        for k,v in serializer.items():
            data[k] = v

        return data

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

@api_view(['POST'])
def registerUser(request):
    data = request.data

    try:
        # we do this instead of using a serializer with fields name, username, email, password
        user = User.objects.create(
            first_name=data['name'],
            username=data['username'],
            email=data['email'],
            password=make_password(data['password'])
        )

        serializer = UserSerializerWithToken(user, many=False)
        return Response(serializer.data)
    except:
        message = {'detail': 'User with this email already exists'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
# @permission_classes([IsAuthenticated])
def getUserProfile(request):
    user = request.user
    print(user)
    serializer = UserSerializer(user, many=False)
    return Response(serializer.data)

@api_view(['GET'])
# @permission_classes([IsAdminUser])
def getUsers(request):
    users = User.objects.all()
    serializer = UserSerializer(users, many=True)
    return Response(serializer.data)

