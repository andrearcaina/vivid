from django.shortcuts import render
from django.http import JsonResponse

def index(request):
    if request.method == 'GET':
        return JsonResponse({"message": "Hello, world!"}, status=200)