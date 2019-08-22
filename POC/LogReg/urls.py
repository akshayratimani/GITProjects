from django.urls import path
from . import views

urlpatterns = [
    path('home/', views.home, name='home'),
    path('login/', views.login, name='login'),
    path('login_post/', views.login_post, name='login2'),
    path('logout/', views.logout, name='logout'),
    path('register/', views.register, name='register'),
    path('register_post/', views.register_post, name='register2'),
    path('add_book/', views.add_book, name='add_book'),
    path('add_book_post/', views.add_book_post, name='add_book_post'),
    path('view_books/', views.view_books, name='view_books')

]
