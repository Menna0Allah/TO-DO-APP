from django.db import models

class Note(models.Model):
    text = models.TextField()
    done = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.text[:50]
