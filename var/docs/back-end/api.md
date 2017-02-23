# API





## Filters

The API has some special filters on several entities :

**Discipline**

Discipline can be filtered on their part (reminder : a part is the name given to a group). 
It will returns all the disciplines exactly matching the provided part.

Example : `GET http://localhost/app_dev.php/api/disciplines?part=3IN&part[]=2IN` returns all the disciplines visibles by 3IN and 2IN

Discipline can be filtered on their name. It will returns all the disciplines exactly matching the provided name.
(reminder : a name is unique among disciplines.)

**Session**

Session can be filtered on their discipline. It will returns all the sessions belonging to the provided discipline id.

Exemple : `http://localhost/app_dev.php/api/sessions?discipline=ee488ac2-f99c-11e6-b3b5-0242ac110003` returns all the session of the given discipline.

Session can be filtered on their name. It will returns all the sessions exactly matching the provided name.
(reminder : a name is unique among sessions)

**Question**

Question can be filtered on their test to get all the questions of a test.