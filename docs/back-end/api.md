# API

API groups all the URL available under `/api` base url.

## Authentication

API is protected using a JWT Auth system. It relies on the [LexikJWTAuthenticationBundle](https://github.com/lexik/LexikJWTAuthenticationBundle) to work.

Keys for signing tokens are located in `var/jwt`.

You can authenticate on the API using URL or HTTP-Header.

**URL** 

Simply add `?bearer=your_token` at the end of your url.

Example : `http://localhost/app_dev.php/api?bearer=your_token`

**HTTP Header**

Add Authorization header to your HTTP Request. We recommend using that method, notabely because it makes logs easier to read.

Example : `curl -X GET --header 'Accept: application/ld+json' --header 'Authorization: Bearer your_token' 'http://localhost/app_dev.php/api/alerts'`


## Filters

The API has some special filters on several entities :

**Alert**

An alert can be filtered on its alertType and its session. Both filter expect exact value.

**Discipline**

Discipline can be filtered on their part (reminder : a part is the name given to a group). 
It will returns all the disciplines exactly matching the provided part.

Example : `GET http://localhost/app_dev.php/api/disciplines?part=3IN&part[]=2IN` returns all the disciplines visibles by 3IN and 2IN

Discipline can be filtered on their name. It will returns all the disciplines exactly matching the provided name.
(reminder : a name is unique among disciplines.)


**Feedback**

A feedback can be filtered on its session. It expects an exact value.

**MCQ Answer**

A Mcq answer can be filtered on the session it belongs to (exact value expected). This is not a direct filter. It uses the association through question and test.

Example : `GET http://localhost/app_dev.php/api/mcq_answers?question.test.session=2b3308f3-fd27-11e6-a4f6-0242ac110003
`

**Question**

Question can be filtered on their test to get all the questions of a test.

**Session**

Session can be filtered on their discipline. It will returns all the sessions belonging to the provided discipline id.

Exemple : `http://localhost/app_dev.php/api/sessions?discipline=ee488ac2-f99c-11e6-b3b5-0242ac110003` returns all the session of the given discipline.

Session can be filtered on their name. It will returns all the sessions exactly matching the provided name.
(reminder : a name is unique among sessions)

**Text Answer**

A Text answer can be filtered on the session it belongs to (exact value expected). This is not a direct filter. It uses the association through question and test.

Example : `http://localhost/app_dev.php/api/text_answers?question.test.session=2b3308f3-fd27-11e6-a4f6-0242ac110003`

## Special Entrypoints

The APi follows REST standard. However we have added several special entrypoints for specific purpose.

**Get the tree of a Test**

GET `/api/tests/{id}/tree` and you will get a Test and its Questions and its McqChoices nested

Example 

```json
{
    "@context": "/app_dev.php/api/contexts/Test",
    "@id": "/app_dev.php/api/tests/5a382c10-fb35-11e6-a402-0242ac110004",
    "@type": "Test",
    "id": "5a382c10-fb35-11e6-a402-0242ac110004",
    "title": "Intro Objets",
    "gitPath": null,
    "live": true,
    "questions": [
        {
            "@id": "/app_dev.php/api/questions/5a383404-fb35-11e6-a402-0242ac110004",
            "@type": "Question",
            "id": "5a383404-fb35-11e6-a402-0242ac110004",
            "text": "Can objects of abstract classes be instantiated ?",
            "explication": "Abstract class can't be instantiated",
            "typeAnswer": "unique",
            "mcqChoices": [
                {
                    "@id": "/app_dev.php/api/mcq_choices/5a383b73-fb35-11e6-a402-0242ac110004",
                    "@type": "McqChoice",
                    "id": "5a383b73-fb35-11e6-a402-0242ac110004",
                    "text": "True",
                    "correct": false
                },
                {
                    "@id": "/app_dev.php/api/mcq_choices/5a38428f-fb35-11e6-a402-0242ac110004",
                    "@type": "McqChoice",
                    "id": "5a38428f-fb35-11e6-a402-0242ac110004",
                    "text": "False",
                    "correct": true
                },
                {
                    "@id": "/app_dev.php/api/mcq_choices/5a38b314-fb35-11e6-a402-0242ac110004",
                    "@type": "McqChoice",
                    "id": "5a38b314-fb35-11e6-a402-0242ac110004",
                    "text": "Polymorphism",
                    "correct": false
                }
            ]
        }
    ],
    "session": "/app_dev.php/api/sessions/5a382436-fb35-11e6-a402-0242ac110004"
}
```


**Get the tree of a Thread**

GET `/api/thread/{id}/tree` and you will get a Thread, its Thread messages and their authors.

Example :

```json
{
   "@context":"\/api\/contexts\/Thread",
   "@id":"\/api\/threads\/373499b5-027c-11e7-8a6d-0242ac110002",
   "@type":"Thread",
   "id":"373499b5-027c-11e7-8a6d-0242ac110002",
   "title":"Une classe peut-elle hériter de plusieurs classes?",
   "text":"Une classe peut-elle hériter de plusieurs classes?",
   "threadMessages":[
      {
         "@id":"\/api\/thread_messages\/33860352-0285-11e7-8a6d-0242ac110002",
         "@type":"ThreadMessage",
         "id":"33860352-0285-11e7-8a6d-0242ac110002",
         "text":"\u003Cp\u003ENon, ce n\u0027est pas possible, je cite : \u003C\/p\u003E\n\u003Cblockquote\u003E\n\u003Cp\u003EUne classe ne peut hériter que d\u0027une seule autre classe\u003C\/p\u003E\n\u003C\/blockquote\u003E",
         "createdAt":"2017-03-06T15:54:37+00:00",
         "author":{
            "@id":"\/api\/users\/71",
            "@type":"User",
            "id":71,
            "firstname":"Simon",
            "lastname":"Maurel",
            "username":"smaurel",
            "part":"1IN",
            "roles":[
               "ROLE_ADMIN",
               "ROLE_USER"
            ]
         },
         "plusVoters":[

         ],
         "downVoters":[

         ]
      },
      {
         "@id":"\/api\/thread_messages\/6e7a5130-0339-11e7-8a6d-0242ac110002",
         "@type":"ThreadMessage",
         "id":"6e7a5130-0339-11e7-8a6d-0242ac110002",
         "text":"\u003Ch2\u003EComments are writtent as markdown\u003C\/h2\u003E\n\u003Cblockquote\u003E\n\u003Cp\u003EThis is a quote\u003C\/p\u003E\n\u003C\/blockquote\u003E",
         "createdAt":"2017-03-07T13:24:45+00:00",
         "author":{
            "@id":"\/api\/users\/71",
            "@type":"User",
            "id":71,
            "firstname":"Simon",
            "lastname":"Maurel",
            "username":"smaurel",
            "part":"1IN",
            "roles":[
               "ROLE_ADMIN",
               "ROLE_USER"
            ]
         },
         "plusVoters":[

         ],
         "downVoters":[

         ]
      }
   ],
   "session":"\/api\/sessions\/4c8b7d76-0279-11e7-8a6d-0242ac110002",
   "author":{
      "@id":"\/api\/users\/66",
      "@type":"User",
      "id":66,
      "firstname":"Antoine",
      "lastname":"Beyet",
      "username":"abeyet",
      "part":"1IN",
      "roles":[
         "ROLE_ADMIN",
         "ROLE_USER"
      ]
   },
   "createdAt":"2017-03-06T14:50:00+00:00"
}
```
**Get the timeline**

GET `/api/sessions/{id}/timeline` returns some HTML to display eventsoff a session. Access granted only to Profs and admins.

**Send a Gitlab hook**

GET `/api/gitlab`. More at [/docs/back-end/integration-imports.md](Integration and imports).

**Open and close a Room**

Access granted only to prof. POST `/api/room/open|close/{id}` with id the id of the session to open a room in.
