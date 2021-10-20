from rest_framework import serializers
from .models import *

from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = "__all__"

class CustomerOrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomerOrder
        fields = "__all__"

class AddProductSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    qty = serializers.IntegerField()

class UserSerializer(serializers.ModelSerializer):
    name = serializers.SerializerMethodField(read_only=True)
    _id = serializers.SerializerMethodField(read_only=True)
    isAdmin = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields = ['id', '_id', 'username', 'email', 'name', 'isAdmin']

    # Create a field _id for User
    def get__id(self, obj):
        return obj.id

    # Create a field isAdmin for User
    def get_isAdmin(self, obj):
        return obj.is_staff

    # Create a field name for User
    def get_name(self, obj):
        name = obj.first_name
        if name == "":
            name = obj.email
        return name

class UserSerializerWithToken(UserSerializer):
    token = serializers.SerializerMethodField(read_only=True)
    class Meta:
        model = User
        fields = ['id', '_id', 'username', 'email', 'name', 'isAdmin', 'token']

    def get_token(self, obj):
        token = RefreshToken.for_user(obj)
        return str(token.access_token)