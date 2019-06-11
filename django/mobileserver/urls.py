"""mobileserver URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.2/topics/http/urls/
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
from django.contrib import admin
from django.urls import path
from rest_framework.authtoken import views as authview
from django.conf.urls import url
from demo import views

urlpatterns = [
    path('admin/', admin.site.urls),
    # path('json/', views.HelloView.as_view(), name='hello'),
    path('token/', views.TokenView.as_view(), name='tok'),
    # url(r'^api-token-auth/', authview.obtain_auth_token),
    path('note/', views.NoteView.as_view(), name='hello'),
    path('location/', views.LocationView.as_view(), name='location')


]

# token 3259fcf0bb57d9ad881c8c3012b5c3e0e17152a0