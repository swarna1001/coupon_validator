from django.urls import path
from . import views

app_name = 'coupons_api'

urlpatterns = [
    path('all-coupons/', views.CouponList.as_view(), name='coupon_list'),
    path('create-coupon/', views.CreateCoupon.as_view(), name='create_coupon'),
    path('calculate-discount/', views.CalculateDiscount.as_view(),
         name='calculate_discount'),
]
