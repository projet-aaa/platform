#Integration & Imports

# Integration

Jetpack can understand Gitlab hook sent on /api/gitlab entrypoint

### How to proceed

 - Create a git repository on gitlab and initialize it with at least one commit (you can't test hooks without it).

 - Copy its http link to the gitUrl Discipline field.

 - Go to __Integrations__ Menu of your repository and setup a new hook sending push events to 
`http://your_jetpack_url.fr/api/gitlab`.
 - Disable SSl verification if Jetpack has no valid SSL certificate.

 - Save the hook, and test it. It should return a 200 HTTP status code.
 
 - Add a file containing valid YAML to your repository.
 
 - Add its name in a Test (currently you can create a test from the admin panel)

 - Push your file to the distant repository. The questions and related McqChoice (if any) should be created.
 
 Currently there are no logging system that enables admins or teacher to track issue during the import process.
 
#Imports

Jetpack accepts YAML formatted files to describes tests. 
YAML is a lightweight, human readable description language.
It is based on indentation (**with spaces, not tabs**) to describe a tree.

Here is an example of a well-formed Test description :

```yaml
test:
  title: Questions sur les couleurs et les chevaux
  live: false
  session: REPLACE_WITH_SESSION_ID
  questions:
     - {text: Quel est la couleur du cheval blanc d'Henri 4 ?,
        explication: la réponse est contenue dans la question,
        typeAnswer: text
      }
     - {text: Quel est la couleur du cheval blanc d'Henri 4 ?, explication: la réponse est contenue dans la question,
        typeAnswer: unique,
        mcqChoices: [{text: Blanc, correct: oui},  {text: Noir, correct: non}]
      }
     - {text: Quel est la couleur du cheval blanc d'Henri 4 ?,
        explication: la réponse est contenue dans la question,
              typeAnswer: multiple,
              mcqChoices: [{text: Blanc, correct: oui},  {text: Noir, correct: non},  {text: Plus blanc que blanc, correct: oui}]
          }
```

You can find a copy of that example [here](./test_import.yml)
