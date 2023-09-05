from rest_framework import serializers
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate, login
from ...models import History
from django.contrib.auth import login
from django.contrib.auth.models import User
from django.http import HttpResponse
from rest_framework.views import APIView
import requests
from django.core.exceptions import ObjectDoesNotExist
from rest_framework.response import Response
from rest_framework.authentication import TokenAuthentication
from datetime import datetime
import os
import re
import numpy as np
from keras.applications import ResNet50
from keras.layers import Dense, GlobalAveragePooling2D
from keras.models import Model
from bs4 import BeautifulSoup
import cv2
import json


class saveHistory(APIView): # ham nay de check xem co 18+ hay khong, neu co thi se luu vao them truong is_18 = true
   # neu ko co token thi ko luu, chi tra ve thoi
    folderPath = ''
    def get(self, request):
        link = request.query_params.get('link')
        #doan nay la check link xem co 18+ hay ko
        ch = link.split("//")[1].split(".")[0]
        saveHistory.folderPath= f'./check_img/{ch}'
      
        if os.path.exists(saveHistory.folderPath):
            if os.path.isdir(saveHistory.folderPath):
                print("Thư mục tồn tại.")
            else:
                print("Đường dẫn không phải là một thư mục.")
                os.mkdir(saveHistory.folderPath)
        else:
            os.mkdir(saveHistory.folderPath)
            print("Thư mục không tồn tại.")
        

        
        check = self.saveImage(link)
        response_data = {
            "data": 'a',
            "check": check
        }

    # Chuyển đổi đối tượng thành chuỗi JSON
        response_json = json.dumps(response_data)

        return Response(data=response_json)

        authorization_header = request.META.get('HTTP_AUTHORIZATION', '')
        if authorization_header:
            auth_type, token = authorization_header.split(' ')
           
        # token="e37a85e1e9844a2945283282bb08974402ad3b8c"
        try:
            infor = Token.objects.get(key=token)
            # Xử lý đối tượng infor khi nó tồn tại
            user = infor.user
    
            add_link = History.objects.create(user=user, link=link, time=datetime.now())
            aa = {'status':1, 'mess':"them thanh cong","check":"no-block" }
            return Response(data=aa)
            # ...
        except ObjectDoesNotExist:
          aa= {'status':0, 'mess':'loi token', "check":"no-block"}
          return Response(data={'status':0, 'mess':'loi token',"check":"no-block"})
    
    def saveImage( self,url):
        response = requests.get(url)
        html = response.text
        arr_image = []
        # Phân tích HTML bằng BeautifulSoup
        soup = BeautifulSoup(html, 'html.parser')
        images = soup.find_all('img')
        elements_with_style = soup.find_all(attrs={'style': True})

        # Lấy giá trị 'background-image' từ các phần tử

        for element in elements_with_style:
            style = element['style']
            background_image = re.findall(r'background-image:\s*url\((.*?)\)', style)
        
            if background_image:
                if background_image[0] and background_image[0].startswith('https://') :
                    # print(background_image[0])
                    arr_image.append(background_image[0])
                else :
                    background_image = "".join([url, background_image[0]])
                    # print(background_image)
                    arr_image.append(background_image)
        for img in images:
            img_str = str(img)
            start = 0
            # print(img_str)
            start = img_str.find("http")
            if start != -1 :
                end = img_str.find('"', start)
                new_str = img_str[start:end]
                # print(new_str)
                arr_image.append(new_str)
        i = 0
        a = []
        countImage = 0
        listImageBlock = []
        # load modal
        model = ResNet50(weights='imagenet', include_top=False, input_shape=(224, 224, 3))
        x = model.output
        x = GlobalAveragePooling2D()(x)
        x = Dense(256, activation='relu')(x)
        predictions = Dense(1, activation='sigmoid')(x)
        model = Model(inputs=model.input, outputs=predictions)
        model.load_weights('./data_tranning/flower_model_500.h5')
        for save_img in arr_image:
            if countImage > 3 :
                return 'block'
            i = i + 1
        
            response = requests.get(save_img)
            filename = f'image{i}.jpg' # Lấy tên file từ URL
            filepath = os.path.join(saveHistory.folderPath, filename)

            # Lưu trữ ảnh vào thư mục "img"
            with open(filepath, 'wb') as f:
                f.write(response.content)
                test_image_path = f'{filepath}'
                # check = self.check_image(url, model)
                # if check != 1: 
                #     return i
                
                test_image = cv2.imread(test_image_path)
                if test_image is None:
                    continue
                # day la none
                test_image = cv2.resize(test_image, (224, 224))
                test_image = np.expand_dims(test_image, axis=0)
                test_image = test_image / 255.0
                result = model.predict(test_image)
                
                if result[0][0] > 0.5 :
                    countImage = countImage + 1
                    print(result[0][0])
                    a.append(test_image_path)
                    listImageBlock.append(save_img)
        if countImage == 0:
            return 'done'
            
        return listImageBlock

    def check_image(self,url, model) :
        test_image_path = url
        test_image = cv2.imread(test_image_path)
        if test_image is None:
            return 1 
        # day la none
        test_image = cv2.resize(test_image, (224, 224))
        test_image = np.expand_dims(test_image, axis=0)
        test_image = test_image / 255.0
        result = model.predict(test_image)

        if result[0][0] > 0.5 :
            return result[0][0]
        return 1


class getHistory(APIView):
    def get(self, request):
        # authorization_header = request.META.get('HTTP_AUTHORIZATION', '')
        # if authorization_header:
        #     auth_type, token = authorization_header.split(' ')
        token="d9db21de387c08c24ee3e402d294a208b0c0c947"
        infor = Token.objects.get(key=token)
        user = infor.user
        histories = History.objects.filter(user=user).order_by('-time')
        # serialized_histories = HistorySerializer(histories, many=True)
        serialized_histories = []
        for history in histories:
            serialized_histories.append({
                'link': history.link,
                'time': history.time.strftime("%H:%M %Y-%m-%d"),
                'block': history.is_18,
               
            })

        # print('his', histories.link)

        return Response(data=serialized_histories)
    
    
class ThongKe(APIView): 
    def get(self, request):
        