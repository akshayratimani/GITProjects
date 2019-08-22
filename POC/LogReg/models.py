from django.db import models


class User(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    username = models.CharField(max_length=100, unique=True)
    password = models.CharField(max_length=100, unique=True)


class Book(models.Model):
    name = models.CharField(max_length=100, unique=True)
    author = models.CharField(max_length=100)
    copies = models.IntegerField()
