from rest_framework import serializers
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate, login
from ...models import MyUser, AddLink, AddText
from django.contrib.auth import login
from django.contrib.auth.models import User
from django.http import HttpResponse
from rest_framework.views import APIView
import requests
from django.core.exceptions import ObjectDoesNotExist
from rest_framework.response import Response
from rest_framework.authentication import TokenAuthentication

from django.views.decorators.csrf import csrf_exempt

class Checktoken(APIView):
    def get(self, request):
        token= "d9db21de387c08c24ee3e402d294a208b0c0c947"
        
        if token:
            user = Token.objects.get(key=token)
            user1 = user.user.username
            print("user", user1)
            if user:
                aa = {
                    'id': user.user_id,
                    'name': user.user.username,
                    'email': user.user.email,
                    'pass': user.user.password
                }
                return Response(data=aa)
            else:
                return Response(data='Token không hợp lệ')
        else:
            return Response(data='Token không được cung cấp')
        # f4c82f789c98124277b41e0684f19a1cfd262f0c


class addLink(APIView):
   
    def get(self, request):
        link = request.query_params.get('link')
        if not self.check_link_existence(link):

            print("Liên kết không tồn tại.")
            return Response(data={'status':0, 'mess':'Link khong ton tai'})
        # authorization_header = request.META.get('HTTP_AUTHORIZATION', '')
        # auth_type, token = authorization_header.split(' ')
        # aa = {
        #     'status': 0,
        #     'link': token
        # }
        # return Response(data=aa)
        a= {
            'link': link,
            'kq': self.check_link_existence(link)
        }
        return Response(data=a)
        token="e37a85e1e9844a2945283282bb08974402ad3b8c"
        # if authorization_header:
        #     auth_type, token = authorization_header.split(' ')
            # if auth_type.lower() == 'Bearer':
            #     print('Token:', token)
            #     return Response(data={'status': 0, 'token': token})

        try:
            infor = Token.objects.get(key=token)
            # Xử lý đối tượng infor khi nó tồn tại
            user = infor.user
            if AddLink.objects.filter(user=user, link=link):
                return Response(data={'status': 0, 'mess': "link da ton tai"})      
            else :
                add_link = AddLink.objects.create(user=user, link=link)
                return Response(data={'status':1, 'mess':"them thanh cong"})
            # ...
        except ObjectDoesNotExist:
          return Response(data={'status':0, 'mess':'loi token'})
      
    def check_link_existence(self,link):
        try:
            response = requests.head(link)
            if response.status_code == 200:
                return True
            else:
                return False
        except requests.RequestException:
            # Xử lý nếu có lỗi xảy ra trong quá trình gửi yêu cầu.
            return False
       
       
        # // test
class addText(APIView):
    def get(self, request):
        text = request.query_params.get('text')
        # token="e37a85e1e9844a2945283282bb08974402ad3b8c"
        authorization_header = request.META.get('HTTP_AUTHORIZATION', '')
        if authorization_header:
            auth_type, token = authorization_header.split(' ')
        try:

            infor = Token.objects.get(key=token)

            user = infor.user
            if AddText.objects.filter(user=user, text=text):
                a={
                    'mess': 'text da ton tai',
                    'status': 0
                }
                return Response(data=a)    
            else :
                add = AddText.objects.create(user=user, text=text)
                a = {
                    'mess': 'them thanh cong',
                    'status': 1
                }
                return Response(data=a)
        except ObjectDoesNotExist:
            return Response(data={'status':0, 'mess':'loi token'})


class getListLink(APIView):
    def get(self, request):

        # token= request.GET.get('token')
        authorization_header = request.META.get('HTTP_AUTHORIZATION', '')
        if authorization_header:
            auth_type, token = authorization_header.split(' ')
        # token = "d9db21de387c08c24ee3e402d294a208b0c0c947"
        if token:
            try:
                user = Token.objects.get(key=token).user
            except Token.DoesNotExist:
                return Response(data="Token not found")

            listLink = AddLink.objects.filter(user=user)
            
            arrLink = [{'dataLink': link.link} for link in listLink]
            ListText = AddText.objects.filter(user=user)
            arrText = [{'text': text.text} for text in ListText]
            a = {
                'list': arrLink,
                'text': arrText
            }
            return Response(data=a)
        else:
            return Response(data="Invalid token") 

class removeLinkOrText(APIView):
    def get(self, request):
        link = request.query_params.get('link')
        text = request.query_params.get('text')
        # token = "d9db21de387c08c24ee3e402d294a208b0c0c947"
        authorization_header = request.META.get('HTTP_AUTHORIZATION', '')
        
        if authorization_header:
            auth_type, token = authorization_header.split(' ')
             
        if token:
            try:
                user = Token.objects.get(key=token).user
            except Token.DoesNotExist:
                return Response(data="Token not found")
            if link :
                try:
                    link_to_delete = AddLink.objects.get(user=user, link=link)
                    link_to_delete.delete()
                except AddLink.DoesNotExist:
                    a = {
                        'status': False,
                        'mess': 'loi'
                    }
                    return Response(data=a)
            if text :
                try:
                    text_to_delete = AddText.objects.get(user=user, text=text)
                    text_to_delete.delete()
                except AddText.DoesNotExist:
                    a = {
                        'status': False,
                        'mess': 'loi'
                    }
                    return Response(data=a)
            
            a = {
               'status': True,
               'mess': 'done'
            }
            return Response(data=a)
        else:
            return Response(data="Invalid token")

