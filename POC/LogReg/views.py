from django.db import IntegrityError
from django.shortcuts import render
from django.http import HttpResponse
from LogReg import models
from .models import User
from .models import Book


def home(request):
    return render(request, 'home.html', {'name': 'akshay'})


def login(request):
    return render(request, 'login.html')


def login_post(request):
    val1 = request.POST['un']
    val2 = request.POST['pwd']
    try:
        User.objects.get(username=val1, password=val2)
        request.session['username'] = val1
        return render(request, 'temp.html', {'data': 'true'})
    except User.DoesNotExist:
        return render(request, 'temp.html', {'data': 'false'})


def logout(request):
    del request.session['username']
    return render(request, 'home.html')


def register(request):
    return render(request, 'register.html')


def register_post(request):
    name = request.POST['name']
    email = request.POST['email']
    username = request.POST['un']
    pwd = request.POST['pwd']
    print('Registered user:\nName:', name, '\nEmail:', email, '\nUsername:', username)

    try:
        User.objects.create(name=name, email=email, username=username, password=pwd)
    except IntegrityError:
        return render(request, "temp.html", {"data": 'IntErr'})

    return render(request, 'temp.html', {'data': 'reg'})


def add_book(request):
    return render(request, 'add_book.html')


def add_book_post(request):
    name = request.POST['name']
    author = request.POST['author']
    copies = request.POST['copies']

    try:
        Book.objects.create(name=name, author=author, copies=copies)
    except IntegrityError:
        return render(request, "temp.html", {"data": 'abp_IntErr'})
    return render(request, "temp.html", {"data": 'abp_success'})


def view_books(request):
    books = Book.objects.all()
    for b in books:
        print(b.name)
    return render(request, "view_books.html", {"data": books})
