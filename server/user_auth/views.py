from django.shortcuts import render
from django.http import JsonResponse

# Create your views here.
def login(request):
    if request.method == 'POST':
        # print out the username and password given
        username = request.POST.get('email')
        password = request.POST.get('password')

        return JsonResponse({'message': 'Login view', 'username': username, 'password': password})
    else:
        return JsonResponse({'message': 'Login view'})

def logout(request):
    return JsonResponse({'message': 'Logout view'})

def register(request):
    return JsonResponse({'message': 'Register view'})
