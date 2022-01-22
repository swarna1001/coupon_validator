from rest_framework import generics
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response
from datetime import date
from django.shortcuts import get_object_or_404
from .serializers import CouponListSerializer, CreateCouponSerializer
from .models import Coupon


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


class CalculateDiscount(APIView):

    def post(self, request):

        amount = int(request.GET.get('amount'))
        coupon_code = request.GET.get('coupon_code')
        coupon = get_object_or_404(Coupon, name=coupon_code)
        coupon_end_date = coupon.get_end_date()
        current_date = date.today()
        coupon_type = int(coupon.get_coupon_type())
        minimum_cart_value = coupon.get_minimum_cart_amount()

        # check for coupon validity
        if (current_date > coupon_end_date):
            return Response({
                "valid": "Coupon is Not Valid!",
                "amount_to_be_deducted": "Expired Coupon!"
            })

        else:

            # check if entered amount satisfies the minimum cart value
            if(amount < minimum_cart_value):
                return Response({
                    "valid": "Coupon is Not Valid!",
                    "amount_to_be_deducted": "Cart amount is not sufficient!"
                })

            else:
                if coupon_type == 1:
                    discount_amount = coupon.get_discount_amount()
                    if(amount >= discount_amount):
                        return Response(
                            {
                                "valid": "Coupon is Valid!",
                                "amount_to_be_deducted": "You saved " + str(discount_amount),
                            }
                        )
                    else:
                        return Response({
                            "valid": "Coupon is not Valid!",
                            "amount_to_be_deducted": "Discount value exceeds the cart amount for the coupon!"
                        })

                elif coupon_type == 2:
                    discount_percentage = coupon.get_discount_percentage()
                    maximum_available_discount = coupon.get_maximum_discount_amount()
                    discount = (discount_percentage/100) * amount

                    if discount > maximum_available_discount:
                        discount = maximum_available_discount

                    return Response({
                        "valid": "Coupon is Valid!",
                        "amount_to_be_deducted": "You saved " + str(discount),
                    })

                else:
                    return Response({
                        "valid": "Coupon is not valid!",
                        "amount_to_be_deducted": "Something went wrong!",
                    })
