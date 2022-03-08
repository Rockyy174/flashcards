from django.db import models
from django.contrib.auth.models import User
from datetime import date
from django.dispatch import receiver
from django.db.models.signals import post_save, post_delete


class Card(models.Model):
    deck = models.ForeignKey('Deck', on_delete=models.CASCADE)
    front = models.CharField(max_length=220)
    back = models.CharField(max_length=220)
    difficulty = models.FloatField(default=1.0)
    days_accumulated = models.IntegerField(default=0)
    next_review = models.DateField(default=date.today())
    last_updated = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['last_updated']

    def __str__(self):
        return f"{self.deck.name} | {self.back} | {self.id}"


class Deck(models.Model):
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=120)
    count = models.IntegerField(default=0)
    is_public = models.BooleanField(default=False)

    def __str__(self):
        return self.name

    @property
    def to_be_reviewed(self):
        total = 0
        qs = Card.objects.filter(deck=self.id)
        
        today = date.today()
        for x in qs:
            if today >= x.next_review:
                total += 1

        return total


# Card signals
@receiver(post_save, sender=Card)
def ru_category_post_save(sender, instance, created, *args, **kwargs):
    obj = Deck.objects.get(id=instance.deck.id)
    if created:
        obj.count += 1
        obj.save()


@receiver(post_delete, sender=Card)
def ru_category_delete(sender, instance, *args, **kwargs):
    obj = Deck.objects.get(id=instance.deck.id)
    obj.count -= 1
    obj.save()