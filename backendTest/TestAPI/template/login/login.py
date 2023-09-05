from rest_framework import serializers
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate, login
from ...models import MyUser, HistoryLogin
from django.contrib.auth import login
from django.contrib.auth.models import User
from django.http import HttpResponse
from rest_framework.views import APIView
import requests
from datetime import datetime
from rest_framework.response import Response
from rest_framework.authentication import TokenAuthentication

class UserLoginSerializer(APIView,serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

    def get(self, request):
        username = request.GET.get('userName')
        password = request.GET.get('pass')
        # user = MyUser.objects.create_user(username=username, password=password, sex='nu',email='a@gmail.com')
        # # a = self.validate( username, password)
        # user.save()
        if not username or not password :
           aa={
               "mess" : 'Vui lòng cung cấp đầy đủ thông tin đăng ký',
               'status': False,
           }
           return Response(data=aa)
        user = authenticate(username=username, password=password)
        if user is not None:
            HistoryLogin.objects.create(user=user, timeLogin=datetime.now())
            token, _ = Token.objects.get_or_create(user=user)
            a= {
                'name': user.username,
                'email' :user.email,
                'request': request.user.is_authenticated,
                'token' : token.key,
                'status': True
            }
            return Response(data=a)
        else:
            a = {
                'status': False,
                'mess' : "Đăng nhập thất bại"
            }
            return Response(data=a)
        


class Checktoken(APIView):
    def get(self, request):
        token= request.GET.get('token')
        
        if token:
            user = Token.objects.get(key=token)
            user1 = user.user.username
            print("user", user1)
            if user:
                aa = {
                    'id': user.user_id,
                    'name': user.user.username,
                    'email': user.user.email,
                    'pass': user.user.password,
                    'status': 1,
                }
                return Response(data=aa)
            else:
                aa = {
                    'mess': 'Token không hợp lệ',
                    'status': False,
                }
                return Response(data=aa)
        else:
            aa = {
                'mess': 'Token không co',
                'status': False,
            }
            return Response(data=aa)
        # f4c82f789c98124277b41e0684f19a1cfd262f0c


class SignUp(APIView):
    def get(self, request):
        username = request.query_params.get('username')
        password = request.query_params.get('password')
        email = request.query_params.get('email')
        print(username)
        if not username or not password or not email:
           aa={
               "mess" : 'Vui lòng cung cấp đầy đủ thông tin đăng ký',
               'status': False,
           }
           return Response(data=aa)
        if MyUser.objects.filter(username=username).exists():
            aa={
               "mess" : 'Tên người dùng đã tồn tại',
               'status': False,
            }
            return Response(data=aa)
        if MyUser.objects.filter(email=email).exists():
            aa={
               "mess" : 'email đã được sử dụng',
               'status': False,
            }
            return Response(data=aa)
        user = MyUser.objects.create_user(username=username, password=password, email=email)
        login(request, user)
        # // test
        user = authenticate(username=username, password=password)
        if user is not None:
            token, _ = Token.objects.get_or_create(user=user)
            a= {
                'name': user.username,
                'email' :user.email,
                'request': request.user.is_authenticated,
                'token' : token.key,
                'status': True
            }
            return Response(data=a)
        else:
            a = {
                'status': False,
                'mess' : "đăng kí thất bại"
            }
            return Response(data=a)
    
class getHistoryLogin(APIView):
    def get(self, request):
        authorization_header = request.META.get('HTTP_AUTHORIZATION', '')
        if authorization_header:
            auth_type, token = authorization_header.split(' ')
        # token = "d9db21de387c08c24ee3e402d294a208b0c0c947"
        if token:
            try:
                user = Token.objects.get(key=token).user
            except Token.DoesNotExist:
                a = {
                    'status':False, 
                    'mess': "Token not found"
                }
                return Response(data=a)

            listLogin = HistoryLogin.objects.filter(user=user)
            
            arrLogin = [{'time': time.timeLogin.strftime("%H:%M %Y-%m-%d")} for time in listLogin]
            a = {
                'status':True, 
                'time': arrLogin,
                'name': user.username
            }
            return Response(data=a)
        else:
            a = {
                'status':False, 
                'mess': "Invalid token"
            }
            return Response(data=a) 