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
