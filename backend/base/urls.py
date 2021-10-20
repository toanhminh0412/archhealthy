from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from . import views
from rest_framework_simplejwt.views import TokenObtainPairView


urlpatterns = [
    path('api/products/', views.get_products),
    path('api/products/<int:pk>', views.get_product),
    path('api/users/login/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/users/register/', views.registerUser, name='registerUser'),
    path('api/users/profile/', views.getUserProfile, name='user_profile'),
    path('api/users/', views.getUsers, name='users'),
]

urlpatterns = format_suffix_patterns(urlpatterns)