# Redis Message

A short description of all Redis exchanged formats. 
A redis message is a payload sent on a channel. The only channel we use is `general`. The payload should be a json string.

**Check Redis message**

To check your redis message is well sent, do the following procedure.

```
sudo apt-get install redis-tools
redis-cli
> Monitor
```


**On session room opening**

When a room is created (POST on /api/room/open/{id_of_related_session}), we emit on `general` :

```php
    [
    'type' => 'openRoom',
    'payload' => ['user' => '{user_serialization}', 
                  'session' => '{session_serialization}']
    ]
```

**On session room closing**

When a room is closed (POST on /api/room/close/{id_of_related_session}), we emit on `general` :

```php
    [
    'type' => 'closeRoom',
    'payload' => ['user' => '{user_serialization}', 
                  'session' => '{session_serialization}']
    ]
```

**On McqAnswer CRUD operation**

On a CRUD operation on a McqAnswer (Create, Read, Update, Delete), we emit on `general` :

```php
    [
    'type' => 'createMcqAnswer' || 'readMcqAnswer' || 
              'updateMcqAnswer' || 'deleteMcqAnswer,
    'payload' => ['id' => '{mcq_answer_id}', 
                  'mcqChoice' => '{mcq_choice_id}',
                  'author' => '{author_serialization}']
    ]
```

**On Alert CRUD operation**

On a CRUD operation on an Alert (Create, Read, Update, Delete), we emit on `general` :

```php
    [
    'type' => 'createAlert' || 'readAlert' || 
              'updateAlert' || 'deletAlert,
    'payload' => ['id' => '{alert_id}', 
                  'author' => '{author_serialization}'
                  'session' => '{session_serialization',
                  'createdAt' => '{time_of_creation}',
                  'text' => '{alert_text}',
                  'alertType' => '{alert_type'}
                  ]
    ]
```

**On Feedback CRUD operation**

On a CRUD operation on a Feedback (Create, Read, Update, Delete), we emit on `general` :

```php
    [
    'type' => 'createFeedback' || 'readFeedback' || 
              'updateFeedback' || 'deleteFeedback,
    'payload' => ['id' => '{alert_id}', 
                  'author' => '{author_serialization}'
                  'session' => '{session_serialization',
                  'createdAt' => '{time_of_creation}',
                  'text' => '{alert_text}'
                  ]
    ]
```

## Object serialization

### User

An associative array (a dictionnary) with the following keys :
```
[
    'id' , 'username', 'firstname','lastname'
]
```

### Session

An associative array (a dictionnary) with the following keys :
```
[
    'id','name','type','updatedAt'
]
```

### McqAnswer

An associative array (a dictionnary) with the following keys :
```
[
    'id', 'mcqChoice', 'author'
]
```

### Alert

An associative array (a dictionnary) with the following keys :
```
[
    'id', 'author', 'session', 'createdAt', 'text', 'alertType'  
]
```

### Feedback

An associative array (a dictionnary) with the following keys :
```
[
    'id', 'author', 'session', 'createdAt', 'text' 
]
```