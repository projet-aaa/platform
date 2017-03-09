Feature: Manage McqAnswer
  A McqAnswer is a link between a choice and a question
  McqAnswer can be read by profs or their authors.
  McqAnswer can be created by anyone connected.
  McqAnswer can be updated by admin and its author
  McqAnswer can be deleted by admin and its author

  @createSchema
  Scenario: Prof can read TextAnswers
    Given I authenticate myself as prof
    And I send a "GET" request to "/api/mcq_answers"
    Then the response status code should be 200

  Scenario: McqAnswer data should be validated. McqChoice is required
    Given I authenticate myself as eleve
    When I add "Content-Type" header equal to "application/ld+json"
    And I add "Accept" header equal to "application/ld+json"
    When I send a "POST" request to "/api/mcq_answers" with body:
    """
    {"question": "/api/questions/6f30e1fc-fda3-11e6-aa56-0242ac110003"}
    """
    Then the response status code should be 400
    And the response should be in JSON
    And the header "Content-Type" should be equal to "application/ld+json; charset=utf-8"
    And the JSON node "violations" should have 3 element


  Scenario: mcqAnswer data should be validated. Question is required
    Given I authenticate myself as eleve
    When I add "Content-Type" header equal to "application/ld+json"
    And I add "Accept" header equal to "application/ld+json"
    When I send a "POST" request to "/api/mcq_answers" with body:
    """
    {"mcqChoice": "/api/mcq_choices/zkk1bc0a-fda0-11e6-aa56-0242ac110003"}
    """
    Then the response status code should be 400
    And the response should be in JSON
    And the header "Content-Type" should be equal to "application/ld+json; charset=utf-8"
    And the JSON node "violations" should have 2 element


  Scenario: mcqAnswer data should be validated. Question and mcqchoice should be consistent
    Given I authenticate myself as eleve
    When I add "Content-Type" header equal to "application/ld+json"
    And I add "Accept" header equal to "application/ld+json"
    When I send a "POST" request to "/api/mcq_answers" with body:
    """
    {
      "mcqChoice": "/api/mcq_choices/kht856d2-fda0-11e6-aa56-0242ac110003",
      "question": "/api/questions/tex222d2-fda0-11e6-aa56-0242ac110003"
    }
    """
    Then the response status code should be 400
    And the response should be in JSON
    And the header "Content-Type" should be equal to "application/ld+json; charset=utf-8"
    And the JSON node "violations" should have 1 element


  Scenario Outline: Everyone can create a McqAnswer
    Given I authenticate myself as <user>
    When I add "Content-Type" header equal to "application/ld+json"
    And I add "Accept" header equal to "application/ld+json"
    And I send a "POST" request to "/api/mcq_answers" with body:
    """
    {
      "mcqChoice": "/api/mcq_choices/kht856d2-fda0-11e6-aa56-0242ac110003",
      "question": "/api/questions/aqw456d2-fda0-11e6-aa56-0242ac110003"
    }
    """
    Then the response status code should be 201

    Examples:
      | user  |
      | admin |
      | prof  |
      | eleve |

  Scenario: mcqAnswer data should be validated. Couple Author/Question is unique
    Given I authenticate myself as eleve
    When I add "Content-Type" header equal to "application/ld+json"
    And I add "Accept" header equal to "application/ld+json"
    When I send a "POST" request to "/api/mcq_answers" with body:
     """
    {
      "mcqChoice": "/api/mcq_choices/kht856d2-fda0-11e6-aa56-0242ac110003",
      "question": "/api/questions/aqw456d2-fda0-11e6-aa56-0242ac110003"
    }
    """
    Then the response status code should be 400
    And the response should be in JSON
    And the header "Content-Type" should be equal to "application/ld+json; charset=utf-8"
    And the JSON node "violations" should have 1 element

  Scenario: A user can update one of its mcqAnswer
    Given I authenticate myself as eleve
    When I add "Content-Type" header equal to "application/ld+json"
    And I add "Accept" header equal to "application/ld+json"
    When I send a "PUT" request to "/api/mcq_answers/azi1jo8a-fda0-19e6-aa56-0242ac110003" with body:
      """
    {
      "mcqChoice": "/api/mcq_choices/cdc1bc0a-fda0-11e6-aa56-0242ac110003"
    }
    """
    Then the response status code should be 200

  @dropSchema
  Scenario: A user can delete one of its McqAnswer
    Given I authenticate myself as eleve
    When I add "Content-Type" header equal to "application/ld+json"
    And I add "Accept" header equal to "application/ld+json"
    When I send a "DELETE" request to "/api/mcq_answers/azi1jo8a-fda0-19e6-aa56-0242ac110003"
    Then the response status code should be 204
