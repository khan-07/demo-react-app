from django.shortcuts import render
from django.http import HttpResponse
import json
import hashlib
from rest_framework.permissions import IsAuthenticated
# from demo.models import User
from demo.models import Note
from demo.models import Location
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.authtoken.models import Token
from django.contrib.auth.models import User
from django.core import serializers


# Create your views here.
class TokenView(APIView):


    def post(self, request):
        body = json.loads(request.body)
        password = hashlib.md5(body['password'].encode('utf-8')).digest()
        print('Token issued')
        sampleuser = User.objects.filter(username=body['username'], password=password)

        if (len(sampleuser) > 0):
            token, created = Token.objects.get_or_create(user=sampleuser[0])
            print(token.key)

            content = {'message': 'success', 'token': token.key}
            return Response(content)
        else:
            print('Invalid password or username')
            content = {'message': 'failed', 'token': ''}
            return Response(content)


class NoteView (APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request):


        json_body = json.loads(request.body)
        # check if note is empty
        if json_body['note'] != '':
            samplenote = Note(note=json_body['note'], userid=request.user.id)
            samplenote.save()

            content = {'message': 'success'}

            return Response(content)
        else:
            content = {'message': 'failed'}
            return Response(content)

    def get(self, request):
        data = serializers.serialize("json", Note.objects.filter(userid=request.user.id))
        print(data)
        content = {'message': 'success', 'data': data}
        return Response(content)


class LocationView (APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request):

        json_body = json.loads(request.body)
        print('Location Received with these coordinates', json_body['lat'],json_body['lng'],json_body['alt'])

        if json_body['lat'] != '' and json_body['lng'] != '' and json_body['alt'] != '':
            samplelocation = Location(lat=json_body['lat'], long=json_body['lng'], alt=json_body['alt'],
                                      userid=request.user.id)
            samplelocation.save()
            content = {'message': 'success'}

            return Response(content)
        else:
            content = {'message': 'failed'}
            return Response(content)

    # def get(self, request):
    #     content = {'message': 'failed'}
    #     return Response(content)

