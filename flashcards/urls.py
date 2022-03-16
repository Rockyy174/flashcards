from django.urls import path
from .api import *

urlpatterns = [
    path('deck-detail/<int:pk>/', DeckApi.as_view({'get':'get'}), name="deck-detail"),
    path('decks/', DeckApi.as_view({'get':'list'}), name="decks"),
    path('add-deck/', DeckApi.as_view({'post': 'post'}), name="add-deck"),
    path('delete-deck/<int:pk>/', DeckApi.as_view({'delete': 'delete'}), name='decks-delete'),

    path('flashcards/<int:pk>/', FlashcardApi.as_view({'get': 'list'}), name="cards-list"),
    path('add-flashcard/<int:pk>/', FlashcardApi.as_view({'post': 'post'}), name="add-card"),
    path('update-flashcard/', FlashcardApi.as_view({'put': 'put'}), name="update-card"),
    path('edit-flashcard/', FlashcardApi.as_view({'put': 'edit'}), name="edit-card"),
    path('delete-flashcard/<int:pk>/', FlashcardApi.as_view({'delete': 'delete'}), name="delete-card"),
    
    # path('test/', Test.as_view(), name="test"),
    # path('test/<int:pk>/', Test.as_view({'get': 'list'}), name="test"),
]
