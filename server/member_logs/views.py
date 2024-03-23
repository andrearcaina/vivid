from django.shortcuts import render
from django.http import JsonResponse

def index(request):
    if request.method == 'GET':
        return JsonResponse({"message": "Hello, world!"}, status=200)
    
def member(request, member_id):
    if request.method == 'GET':
        return JsonResponse({"message": f"Hello, member {member_id}!"}, status=200)
