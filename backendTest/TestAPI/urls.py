"""
URL configuration for backendTest project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""

from django.urls import path
from . import views
from .template.login.login import UserLoginSerializer, Checktoken, SignUp, getHistoryLogin
from .template.add.addLinkAndText import addLink, addText, getListLink, removeLinkOrText
from .template.history.history import saveHistory, getHistory



urlpatterns = [
    path('login/', UserLoginSerializer.as_view()),
    path('sign-up/', SignUp.as_view()),
    path('token/', Checktoken.as_view()),
  
    path('add-link/', addLink.as_view()),
    path('add-text/', addText.as_view()),
    path('check-link/', saveHistory.as_view()),
    path('get-history/', getHistory.as_view()),
    path('get-link/', getListLink.as_view()),
    path('remove/', removeLinkOrText.as_view()),
    path('get-historyLogin/', getHistoryLogin.as_view()),
    path('', views.index, name='index'),
   

]
