from django.shortcuts import render


def index(request):
    return render(request, 'build/index.html')


def create_coupon(request):
    return render(request, 'build/index.html')


def display_coupons(request):
    return render(request, 'build/index.html')
