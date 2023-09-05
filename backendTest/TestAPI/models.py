from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils import timezone


class MyUser(AbstractUser):
    user_id = models.AutoField(primary_key=True)
    password = models.CharField(max_length=255)
    sex = models.CharField(max_length=255)


class History(models.Model):
    link = models.CharField(max_length=255)
    user = models.ForeignKey(MyUser, on_delete=models.CASCADE)
    is_18 = models.BooleanField(default=False)
    time = models.DateTimeField(default=timezone.now)
    # count = models.IntegerField()
    # count_all = models.IntegerField()

# class CountLink (models.Model):
#     user = models.ForeignKey(MyUser, on_delete=models.CASCADE)
#     count = models.IntegerField()# dem so link ma ngay hom nay truy cap

class AddLink(models.Model):
    user = models.ForeignKey(MyUser, on_delete=models.CASCADE)
    link = models.CharField(max_length=255)
  

class AddText(models.Model):
    user = models.ForeignKey(MyUser, on_delete=models.CASCADE)
    text = models.TextField()

class HistoryLogin(models.Model):
    user = models.ForeignKey(MyUser, on_delete=models.CASCADE)
    timeLogin = models.DateTimeField(default=timezone.now)

# class LinkBlock(models.Model):
#     user = models.ForeignKey(MyUser, on_delete=models.CASCADE)
#     link = models.CharField(max_length=255)
#     time = models.DateTimeField(default=timezone.now)
