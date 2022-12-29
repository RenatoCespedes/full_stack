from rest_framework import serializers
from .models import Payment_users,Service,Expired_payments

class PaymentSerializer(serializers.ModelSerializer):
    url=serializers.HyperlinkedIdentityField(
        view_name= 'pay-detail',
        lookup_field='pk'
    )
    service=serializers.SerializerMethodField('get_service')
    # url=serializers.URLField()
    class Meta:
        model = Payment_users   
        fields = ('url','id','user_id','service_id','service','Amount','Payment_date','Expiration_date')
        # '__all__'
    def get_service(self,obj):
        return {'id':obj.service_id.id,'name':obj.service_id.name,'logo':str(obj.service_id.logo)}    
        # read_only_fields = '__all__',


class ServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model= Service
        fields= '__all__'
        # exclude=['url']
        # read_only_fields = '__all__',


class ExpiredSerializer(serializers.ModelSerializer):
    extra_data=serializers.SerializerMethodField('get_payment')
    class Meta:
        model= Expired_payments
        fields= '__all__'
        # read_only_fields = '__all__',
    def get_payment(self,obj):
        return {'id':obj.Payment_user_id.id,'servicio':obj.Payment_user_id.service_id.name,'logo':str(obj.Payment_user_id.service_id.logo),'date':obj.Payment_user_id.Payment_date,'monto':obj.Payment_user_id.Amount,'penalty':obj.Penalty_fee_amount}