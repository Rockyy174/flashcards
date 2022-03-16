# Flashcards
#### Video Demo:  <URL HERE>
#### Live website: https://cards.mightylanguages.com/
---
## What is Flashcards?

Flashcards is a website designed to help people study, especially when they need to memorize something. Anyone can create an account on the website and start adding flashcards. The user can also create multiple decks of flashcards, so different subjects are kept separated. 

The website uses a spaced repetition system, which means that flashcards are shown to the user with intervals. The size of the interval depends on how easy or difficult a flashcard is for the user.

## Main technologies used in the project

- Django
- Django REST Framework
- JSON Web Tokens (PyJWT)
- React
- React Router
- MySQL
---
## Back end
The back end of the website was built with Django, Django REST Framework, JSON Web Tokens and MySQL. The main directories of the back end are: "website", "flashcards" and "user".

### Website
The main files of the Django project are located in "website". The files that were changed during the development of the project were "settings.py" and "urls.py". 

Important configurations, such as allowed origins, tokens' lifetime, database settings, etc., are found in "settings.py".

The base url endpoints for the Django admin, flashcards and user are found in "urls.py".

### Flashcards
Everything related to the flashcards and decks that the user has is handled by "flashcards". The main files are "models.py", "api.py", "serializers.py" and "urls.py". 

The classes "Card" and "Deck" inside "models.py" have the data structures for the decks and flashcards. Each class is responsible for a table in the database. 

The file "api.py" is responsible for the create, retrieve, update and delete operations on decks and flashcards.

The file "serializers.py" has two serializers, which are responsible for serializing the deck and flashcard objects into JSON data and vice versa.

And "urls.py" is responsible for all the API endpoints used for operations on the decks and flashcards.

### User
Everything related to registering new users and authentication is handled by "users". The main files are "api.py", "serializers.py" and "urls.py". 

The file "api.py" is responsible for creating new users when they sign up and for blacklisting users' tokens when they log out of the website. Note that this project uses the default user model provided by Django.

The file "serializers.py" is responsible for serializing user objects into JSON data and vice versa.

And the file "urls.py" has the endpoints responsible for signing new users up, logging users in, logging users out and refreshing users' tokens. Note that the actions of logging users in and refreshing users' tokens are not handled by "user/api.py" because the package PyJWT already handles them.

---
## Front end
The front end of the website was built using React and React Router and is located in the directory "front-end". Most of the files are inside "src".

One of the main files is "App.js". This file displays the navbar, controls the routes to all the pages of the website, controls most of the forms and checks if the user is already authenticated when the website is first loaded. If the user is already authenticated, "App.js" calls the "refreshToken" function, which makes sure that the user's tokens are always refreshed while the user is using the website.

The website has four pages. Two of these pages, "DecksPage" and "ReviewPage", are available only when the user is logged in. These two pages are wrapped by the "PrivateRoute" component, whose only purpose is to redirect the user to "LoginPage" if they are not authenticated.

The pages "LoginPage" and "SignupPage" are not wrapped by the "PrivateRoute" component, which means they can always be accessed by the user.

### LoginPage
"LoginPage" renders a form with an input for the username, an input for the password and a submit button. When the user enters their information and submits the form, a function checks if none of the fields are blank. If they aren't, a function called "login" sends the data to the back end.

If the information is correct, the back end responds with a status of 200 and two tokens, which are stored in the local storage, and the user is redirected to "DecksPage".

If the information that the user entered is not correct or if any of the fields is blank, the user is warned that the information is not correct.

### SingupPage
"SignupPage" renders a form with four fields and a submit button. The fields are for the username, email, password and password confirmation. 

When the user submits the form, a function checks if certain conditions are met. 
1. It checks if none of the fields are blank
2. It checks if the email has an email format
3. It checks if the passwords are the same

If everything is correct, this function calls the "signup" function, which sends the data to the back end. Before creating the new user, the back end checks if this username and email haven't already been taken by another user. If any of them has already been taken, the back end responds with a status of 400 and a message saying that the username or the email has already been taken.

If both the username and email are available, the back end successfully creates a user and responds with a status of 200. After that, the "login" function is automatically called with the username and password that the user just entered in the form and the user is logged in and redirected to "DecksPage".

### DecksPage
When "DecksPage" is mounted, a function called "loadDecks" tries to get a list with all the decks that the logged-in user has.

If the user doesn't have any deck of flashcards yet, "DecksPage" renders a component that simply shows a message saying that the user doesn't have any deck yet and a button, which the user can use to make a new deck. If the user already has decks of flashcards, the "DeckList" component is rendered instead.

"DeckList" displays a list of all the decks the user has. Clicking on any of the decks redirects the user to "ReviewPage". 

A component called "AddButton" is also rendered. This component is a big blue icon in the bottom right corner of the screen, which enables users to add both decks and flashcards. However, if the user hasn't created any deck yet, they cannot add flashcards. In order to add flashcards, users must have at least one deck.

### ReviewPage
When the user is on "ReviewPage", it means that a single deck has been selected. When this page is mounted, a function called "loadFlashcards" loads all the flashcards of the deck that should be reviewed on that day.

On the top of the page, the "ReviewHeader" component is rendered. This component displays an arrow that redirects the user back to "DecksPage" and some information about the selected deck.

Below the header, the front of the current flashcard and an empty space are rendered. The empty space is replaced by the back of the current flashcard when the user clicks on the "show answer" button.

When the user clicks on "show answer", four new buttons are rendered on the page. These buttons call the "updateCard" function. This function updates three fields of the flashcard: "difficulty", "days_accumulated" and "next_review". 

"next_review" is the date when the flashcard should be shown to the user for a new review. The other two fields are used in the algorithm that calculates the "next_review" date.

On this page, the user can also use two icons in the top right corner of the screen to update and delete the flashcard. 

If the user clicks on the delete icon, the "DeleteFlashcard" component is rendered, which asks the user to confirm the action. If the user confirms it, the "deleteCard" function is called, which sends a request to the back end to delete the flashcard.

If the user clicks on the update icon, the "UpdateFlashcard" component is rendered, which is a form that allows the user to enter new values for the front and back of the flashcard. When the user submits the form, another function that is also called "updateCard" sends the information to the back end, which updates the flashcard.

---
## How the website works for the user
The website has four pages. If the user isn't logged in, they have access only to the login and signup pages. After logging into the website, users can start adding decks and flashcards they wish to memorize.  

### Signup page
In order to sign up for the website, the user will have to enter their username, email, password and password confirmation. The username and email must be unique. If the username or email has already been used, the registration will not work and the user will receive a warning. 

After the user signs up, they are automatically redirected to the homepage. 

### Login page
If the user already has an account, they can log into the website by entering their username and password on the login page. If the user enters the wrong credentials, the login will fail and they will receive a warning. 

### Homepage
The homepage is where the user can create, delete and access decks of flashcards as well as add new flashcards to a deck. 

The decks of flashcards are displayed in a list with their names, the number of flashcards that need to be reviewed and an icon to delete the deck. Clicking on any of the decks redirects the user to the review page.

To create a deck, the user can click on the "plus button" on the navbar and choose "Add Deck" or click on the "plus button" in the bottom right corner of the page and choose "Deck". The only information a deck requires is a name, which does not need to be unique.

To add a flashcard, the user can click on the "plus button" on the navbar and choose "Add Flashcard" or click on the "plus button" in the bottom right corner of the page and choose "Flashcard". A flashcard requires a text for the front, a text for the back and a deck. The front is the information that iss first shown to the user on the review page and the back is the information the user wants to memorize. Note that in order to add a flashcard, the user must have at least one deck. 

### Review page
The review page is the most complex page of the website. At the top of the page, the user can see a header with the name of the current deck, the number of flashcards to be reviewed, the total number of flashcards in the deck and an arrow that takes the user back to the homepage. 

Right below the header, in the middle of the page, is the front of the current flashcard. Below the front of the flashcard is empty space and the "show answer" button. 

When the user clicks on "show answer", the empty space is replaced by the back of the current flashcard, and the "show answer" button is replaced by four new buttons. These buttons read "very hard", "hard", "normal" and "easy". Above the main text inside these buttons, a period of time is displayed, which varies depending on the flashcard and the button itself. 

At this point, the user needs to decide whether the flashcard was difficult or easy and choose the appropriate button. The period of time on each button indicates how much time it will take for that flashcard to be shown to the user again. For example, if the "hard" button reads "2 days" and the user chooses this flashcard, it means that this flashcard will be shown to the user again in two days. 

Note that the "very hard" button always has the text "end of the deck" instead of a period of time, because it always sends the flashcard to the end of the list of flashcards that still need to be reviewed.

When the user chooses any of these buttons, the next flashcard replaces the previous one. Again, only the front of the flashcard and the "show answer" button are displayed on the page. 

Besides that, on this page, the user can also delete or edit a flashcard. That is possible by clicking on the icons in the top right corner of the page. These icons delete or update the flashcard that is currently being reviewed.

---
## Future improvements

In the future, Flashcards may receive some improvements. The first ones in the list are:

1. Verify that the user owns an email before signing them up
2. Allow users to change their passwords
3. Allow users to edit the name of a deck
4. Allow users to see a list with all the flashcards that belong to a specific deck
5. Allow users to make their decks public and have a page where users can find other people's decks
6. Enhance the spaced repetition algorithm