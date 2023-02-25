from django.db import models
from django.contrib.auth.models import User

class Profile(models.Model):
    user = models.ForeignKey(User,on_delete=models.SET_NULL,null=True)
    bio = models.TextField(max_length=500, blank=True)
    address = models.CharField(max_length=30, blank=True)
    phone_number= models.CharField(max_length=30, blank=True)
    birth_date = models.DateField(null=True, blank=True)

class Category(models.Model):
    name = models.CharField(max_length=50, blank=True)

class Currency(models.Model):
    name = models.CharField(max_length=50, blank=True)
    symbol = models.CharField(max_length=2, blank=True)

class Product(models.Model):
    category = models.ForeignKey(Category,on_delete=models.SET_NULL,null=True)
    currency = models.ForeignKey(Currency,on_delete=models.SET_NULL,null=True)
    title = models.CharField(max_length=100, blank=True)
    description = models.TextField(max_length=2000, blank=True)
    image = models.ImageField(null=True,blank=True,default='/holder.jpeg')
    price = models.DecimalField(max_digits=5, decimal_places=2, blank=True, null=True)

    # CurrencyRow = models.ManyToManyField(Currency, through='Product')

    
    def __str__(self):
           return self.sName
