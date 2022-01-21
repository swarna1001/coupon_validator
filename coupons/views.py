from django.shortcuts import render
from rest_framework import generics
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response

from .serializers import CouponListSerializer, CreateCouponSerializer

from .models import Coupon

# Create your views here.
# /create
# /list all


class CouponList(generics.ListAPIView):
    queryset = Coupon.objects.all()
    serializer_class = CouponListSerializer


class CreateCoupon(APIView):

    def post(self, request):
        serializer = CreateCouponSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()

            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


def calculate_discount(request, amount, coupon_code):

    coupon = Coupon.objects.filter(name=coupon_code)

    print(coupon)
