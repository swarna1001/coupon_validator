from django.shortcuts import render
from rest_framework import generics
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response
from datetime import date

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


def date_comparison(current, end):
    if (current > end):
        return False


class CalculateDiscount(APIView):

    def post(self, request):

        amount = request.GET.get('amount')
        coupon_code = request.GET.get('coupon_code', None)
        coupon = Coupon.objects.get(name=coupon_code)
        coupon_end_date = coupon.get_end_date()
        current_date = date.today()
        coupon_type = coupon.get_coupon_type()

        print(coupon)
        print(coupon_type)

        if (current_date > coupon_end_date):
            return Response({
                "valid": False,
            })

        else:

            if coupon_type == 1:
                discount_amount = coupon.get_discount_amount()
                if(amount >= discount_amount):
                    return Response(
                        {
                            "valid": True,
                            "amount_to_be_deducted": discount_amount,
                        }
                    )
                else:
                    return Response({
                        "valid": False,
                    })

            elif coupon_type == 2:
                discount_percentage = coupon.get_discount_percentage()

            return Response({
                "valid": True,
                "amount_to_be_deducted": amount,
            })


"""def calculate_discount(request):

    data = json.loads(request.body)
    amount = data.get('amount')
    coupon_code = data.get('coupon_code')

    coupon = Coupon.objects.filter(name=coupon_code)

    print(coupon)"""
