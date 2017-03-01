Feature: Manage TextAnswer
  TextAnswer can be read by admins or their authors.
  TextAnswers can be created by admins and teachers

  @createSchema
  Scenario: Admin can read TextAnswers
    Given I authenticate myself as admin
    And I send a "GET" request to "/api/text_answers"
    Then the response status code should be 200

  Scenario: Everyone can create a TextAnswer
    Given I authenticate myself as eleve
    When I add "Content-Type" header equal to "application/ld+json"
    And I add "Accept" header equal to "application/ld+json"
    And I send a "POST" request to "/api/text_answers" with body:
    """
    {
      "question": "/api/questions/tyu987f7-fda0-11e6-aa56-0242ac110003"
    }
    """
    Then the response status code should be 201

  Scenario Outline: Everyone can create a TextAnswer
    Given I authenticate myself as <user>
    When I add "Content-Type" header equal to "application/ld+json"
    And I add "Accept" header equal to "application/ld+json"
    And I send a "POST" request to "/api/text_answers" with body:
    """
    {
      "question": "/api/questions/tyu987f7-fda0-11e6-aa56-0242ac110003"
    }
    """
    Then the response status code should be 201

    Examples:
      | user  |
      | admin |
      | prof  |
      | eleve |

  @dropSchema
  Scenario: void
