from django.shortcuts import render
from django.http import HttpResponse


def home(request):
    return render(request, 'home.html', {'name': 'akshay'})


def login(request):
    return render(request, 'login.html')


def login_Post(request):
    val1 = request.POST['un']
    val2 = request.POST['pwd']
    if val1 == 'Virat18' and val2 == 'kohli':
        return render(request, 'temp.html', {'data': 'true'})

    return render(request, 'temp.html', {'data': 'false'})


def register(request):
    return render(request, 'register.html')


def register_post(request):
    name = request.POST['name']
    email = request.POST['email']
    username = request.POST['un']
    pwd = request.POST['pwd']
    print('Registered user:\nName:', name, '\nEmail:', email, '\nUsername:', username)
    return render(request, 'temp.html', {'data': 'reg'})
