from django.urls import path, re_path
from django.urls.conf import include
from . import views

app_name = 'coupons_api'

urlpatterns = [
    path('all-coupons/', views.CouponList.as_view(), name='coupon_list'),
    path('create-coupon/', views.CreateCoupon.as_view(), name='create_coupon'),
    path('calculate-discount/<int:amount>/<str:coupon_code>/',
         views.calculate_discount, name='calculate_discount'),




]
