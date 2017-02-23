#Integration & Imports

# Integration

Jetpack can understand Gitlab hook on /api/gitlab entrypoint

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
