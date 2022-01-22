from rest_framework import serializers

from .models import Coupon


class CouponListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Coupon
        fields = ('name', 'end_date', 'coupon_type',
                  'discount_percentage', 'discount_amount', 'minimum_cart_amount')


class CreateCouponSerializer(serializers.ModelSerializer):
    class Meta:
        model = Coupon
        fields = ('name', 'end_date', 'coupon_type',
                  'discount_percentage', 'discount_amount', 'maximum_percentage_discount_amount',)
