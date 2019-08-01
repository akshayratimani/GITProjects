from django.urls import path
from . import views

urlpatterns = [
    path('home/', views.home, name='home'),
    path('home/login/', views.login, name='login'),
    path('home/login/login_post/', views.login_Post, name='login2'),
    path('home/register/', views.register, name='register'),
    path('home/register/register_post/', views.register_post, name='register2')

]
