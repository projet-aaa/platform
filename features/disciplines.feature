Feature: Manage disciplines
  Disciplines can only be created/modified by admins.
  Disciplines can be read by everyone autheticated.
  When a discipline is created (by the api or the admin panel) a folder with its name is created in var/git.
  When a discipline is deleted (by the api or the admin panel), the associated folder is deleted.

  @createSchema
  Scenario: A discipline can be created by an admin
    Given I authenticate myself as admin
    When I add "Content-Type" header equal to "application/json"
    When I send a POST request to "/api/disciplines" with body:
      """
      {"name": "Technologie Objet"}
      """
    Then the response status code should be 201
    And the git-folder associated with discipline "Technologie Objet" should exist


  Scenario: Discipline data should be validated. name is unique among Discipline
    Given I authenticate myself as admin
    When I add "content-type" header equal to "application/ld+json; charset=utf-8"
    When I send a "POST" request to "/api/disciplines" with body:
    """
    {"name": "Technologie Objet"}
    """
    And print last response headers
    And print the corresponding curl command
    Then the response status code should be 400
    And the response should be in JSON-LD
    And the JSON node "violations" should have 1 element
    And the JSON response should have the following nodes:
      | node                        | value                                 | type   |
      | @context                    | /api/contexts/ConstraintViolationList |        |
      | @type                       | ConstraintViolationList               |        |
      | hydra:title                 |                                       |        |
      | hydra:description           |                                       | array  |
      | violations                  |                                       | array  |
      | violations[0]               |                                       | object |
      | violations[0]->propertyPath | name                                  |        |
      | violations[0]->message      | This value is already used.           |        |

  Scenario: A discipline can't be created by a prof

  @dropSchema
  Scenario: A discipline can't be created by a student