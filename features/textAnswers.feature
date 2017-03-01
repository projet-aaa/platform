Feature: Manage TextAnswer
  TextAnswer can be read by admins or their authors.
  TextAnswers can be created by admins and teachers
  TextAnswers can be updated by admin and its author
  TextAnswers can be deleted by admin and its author

  @createSchema
  Scenario: Admin can read TextAnswers
    Given I authenticate myself as admin
    And I send a "GET" request to "/api/text_answers"
    Then the response status code should be 200

  Scenario: textAnswer data should be validated. Text is required
    Given I authenticate myself as eleve
    When I add "Content-Type" header equal to "application/ld+json"
    And I add "Accept" header equal to "application/ld+json"
    When I send a "POST" request to "/api/text_answers" with body:
    """
    {"question": "/api/questions/tex222d2-fda0-11e6-aa56-0242ac110003"}
    """
    Then the response status code should be 400
    And the response should be in JSON
    And the header "Content-Type" should be equal to "application/ld+json; charset=utf-8"
    And the JSON node "violations" should have 1 element
    And the JSON response should have the following nodes:
      | node                        | value                                 | type   |
      | @context                    | /api/contexts/ConstraintViolationList |        |
      | @type                       | ConstraintViolationList               |        |
      | hydra:title                 |                                       |        |
      | hydra:description           | text: This value should not be blank. |        |
      | violations                  |                                       | array  |
      | violations[0]               |                                       | object |
      | violations[0]->propertyPath | text                                  |        |
      | violations[0]->message      | This value should not be blank.       |        |


  Scenario: textAnswer data should be validated. Question is required
    Given I authenticate myself as eleve
    When I add "Content-Type" header equal to "application/ld+json"
    And I add "Accept" header equal to "application/ld+json"
    When I send a "POST" request to "/api/text_answers" with body:
    """
    {"text": "hello"}
    """
    Then the response status code should be 400
    And the response should be in JSON
    And the header "Content-Type" should be equal to "application/ld+json; charset=utf-8"
    And the JSON node "violations" should have 3 element
    And the JSON response should have the following nodes:
      | node                        | value                                 | type   |
      | @context                    | /api/contexts/ConstraintViolationList |        |
      | @type                       | ConstraintViolationList               |        |
      | hydra:title                 |                                       |        |
      | hydra:description           |                                       |        |
      | violations                  |                                       | array  |
      | violations[0]               |                                       | object |
      | violations[0]->propertyPath |                                       |        |
      | violations[0]->message      | Question for TextAnswer is undefined  |        |
      | violations[1]               |                                       | object |
      | violations[1]->propertyPath | question                              |        |
      | violations[1]->message      | This value should not be null.        |        |
      | violations[2]               |                                       | object |
      | violations[2]->propertyPath | questionConsistent                    |        |
      | violations[2]->message      | The owning question is not of type text |        |

  Scenario Outline: Everyone can create a TextAnswer
    Given I authenticate myself as <user>
    When I add "Content-Type" header equal to "application/ld+json"
    And I add "Accept" header equal to "application/ld+json"
    And I send a "POST" request to "/api/text_answers" with body:
    """
    {
      "text": "hello",
      "question": "/api/questions/tex222d2-fda0-11e6-aa56-0242ac110003"
    }
    """
    Then the response status code should be 201

    Examples:
      | user  |
      | admin |
      | prof  |
      | eleve |

  Scenario: textAnswer data should be validated. Couple Author/Question is unique
    Given I authenticate myself as eleve
    When I add "Content-Type" header equal to "application/ld+json"
    And I add "Accept" header equal to "application/ld+json"
    When I send a "POST" request to "/api/text_answers" with body:
     """
    {
      "text": "hello",
      "question": "/api/questions/tex222d2-fda0-11e6-aa56-0242ac110003"
    }
    """
    Then the response status code should be 400
    And the response should be in JSON
    And the header "Content-Type" should be equal to "application/ld+json; charset=utf-8"
    And the JSON node "violations" should have 1 element
    And the JSON response should have the following nodes:
      | node                        | value                                 | type   |
      | @context                    | /api/contexts/ConstraintViolationList |        |
      | @type                       | ConstraintViolationList               |        |
      | hydra:title                 |                                       |        |
      | hydra:description           |                                       |        |
      | violations                  |                                       | array  |
      | violations[0]               |                                       | object |
      | violations[0]->propertyPath |                                       |        |
      | violations[0]->message      | This author already has an answer for that question       |        |

  Scenario: A user can update one of its textAnswer
    Given I authenticate myself as eleve
    When I add "Content-Type" header equal to "application/ld+json"
    And I add "Accept" header equal to "application/ld+json"
    When I send a "PUT" request to "/api/text_answers/tyt988t8-fda0-11e6-aa56-0242ac110003" with body:
      """
    {
      "text": "goodbye"
    }
    """
    And print last response
    Then the response status code should be 200

  @dropSchema
  Scenario: A user can delete on of its textAnswer
    Given I authenticate myself as eleve
    When I add "Content-Type" header equal to "application/ld+json"
    And I add "Accept" header equal to "application/ld+json"
    When I send a "DELETE" request to "/api/text_answers/tyt988t8-fda0-11e6-aa56-0242ac110003"
    Then the response status code should be 204
