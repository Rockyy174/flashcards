from rest_framework import serializers
from .models import Deck, Card


class DeckSerializer(serializers.ModelSerializer):
    to_be_reviewed = serializers.IntegerField(read_only=True)

    class Meta:
        model = Deck
        fields = ['id', 'name', 'count', 'to_be_reviewed', 'is_public']
    
    # Example of validation
    # def validate_name(self, value):
    #     if len(value) > 100:
    #         raise serializers.ValidationError("The name is too long")
    #     return value
    
    # def validate_description(self, value):
    #     pass


class CardSerializer(serializers.ModelSerializer):
    class Meta:
        model = Card
        fields = '__all__'