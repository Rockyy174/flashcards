from datetime import datetime, date
from rest_framework import generics, status, viewsets
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny

from .serializers import DeckSerializer, CardSerializer
from .models import Deck, Card


class DeckApi(viewsets.ViewSet):
    permission_classes = [IsAuthenticated]

    def list(self, request, *args, **kwargs):
        queryset = Deck.objects.filter(owner=request.user)
        serializer = DeckSerializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def get(self, request, pk, *args, **kwargs):
        deck = Deck.objects.get(id=pk)
        if deck.owner == request.user:
            serializer = DeckSerializer(deck)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            data = {
                'message': 'forbidden'
            }
            return Response(data=data, status=status.HTTP_403_FORBIDDEN)

    def post(self, request, *args, **kwargs):
        serializer = DeckSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save(owner=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response({}, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, *args, **kwargs):
        deck = Deck.objects.get(id=pk)
        if deck.owner == request.user:
            deck.delete()
            return Response({}, status=status.HTTP_200_OK)
        
        return Response({}, status=status.HTTP_400_BAD_REQUEST)

    


class FlashcardApi(viewsets.ViewSet):
    permission_classes = [IsAuthenticated]

    def list(self, request, pk, *args, **kwargs):
        queryset = Card.objects.filter(deck=pk)
        deck = Deck.objects.get(id=pk)
        if request.user == deck.owner:
            serializer = CardSerializer(queryset, many=True)

            result = []
            today = date.today()
            for x in serializer.data:
                x_date = date.fromisoformat(x['next_review'])
                if today >= x_date:
                    result.append(x)

            return Response(result)

        else:
            data = {
                'message': 'forbidden'
            }
            return Response(data=data, status=status.HTTP_403_FORBIDDEN)
    
    def post(self, request, pk, *args, **kwargs):
        serializer = CardSerializer(data=request.data)
        qs = Deck.objects.get(id=pk)
        if serializer.is_valid(raise_exception=True) and qs.owner == request.user:
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response({}, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, *args, **kwargs):
        if request.data:
            deck_id = request.data['deck']
            deck = Deck.objects.get(id=deck_id)
            if deck.owner == request.user:
                updated_card = Card(
                    id = request.data['id'], 
                    front = request.data['front'], 
                    back = request.data['back'], 
                    difficulty = request.data['difficulty'],
                    days_accumulated = request.data['days_accumulated'],
                    next_review = request.data['next_review'], 
                    deck = deck,
                )
                updated_card.save()
                
                return Response({}, status=status.HTTP_200_OK)

        return Response({}, status=status.HTTP_400_BAD_REQUEST)
    
    def edit(self, request, *args, **kwargs):
        if request.data:
            deck_id = request.data['deck']
            deck = Deck.objects.get(id=deck_id)
            card = Card.objects.filter(id=request.data['id'])
            if deck.owner == request.user:
                card.update(
                    front = request.data['front'], 
                    back = request.data['back'], 
                )
                
                return Response({}, status=status.HTTP_200_OK)

        return Response({}, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, *args, **kwargs):
        card = Card.objects.get(id=pk)
        if card.deck.owner == request.user:
            card.delete()
            return Response({}, status=status.HTTP_200_OK)
        
        return Response({}, status=status.HTTP_400_BAD_REQUEST)


# class Test(viewsets.ViewSet):
#     queryset = Card.objects.all()
#     serializer_class = CardSerializer
#     permission_classes = [AllowAny]

#     def list(self, request, pk, *args, **kwargs):
#         queryset = Card.objects.filter(deck=pk)
#         serializer = CardSerializer(queryset, many=True)

#         result = []
#         today = date.today()
#         for x in serializer.data:
#             x_date = date.fromisoformat(x['next_review'])
#             if today >= x_date:
#                 result.append(x)

#         return Response(result)
        


# class Test(generics.ListCreateAPIView):
#     queryset = Card.objects.all()
#     serializer_class = DeckSerializer
#     permission_classes = [AllowAny]

#     def list(self, request):
#         queryset = Deck.objects.all()
#         serializer = DeckSerializer(queryset, many=True)
#         return Response(serializer.data)
