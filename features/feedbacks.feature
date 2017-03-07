Feature: Manage feedbacks
  Feedbacks can be created by everyone authenticated.
  Feedbacks can be read by their author, or admins

  @createSchema
  Scenario: A student can only read its Feedbacks
    Given I authenticate myself as smaurel
    When I send a "GET" request to "/api/feedbacks/rat415p0-fda0-11e6-aa56-0242ac110003"
    Then the response status code should be 200

  Scenario Outline: Everyone can create a Feedback
    Given I authenticate myself as <user>
    When I add "Content-Type" header equal to "application/ld+json"
    And I add "Accept" header equal to "application/ld+json"
    And I send a "POST" request to "/api/feedbacks" with body:
    """
    {
      "session": "/api/sessions/cdc1a93a-fda0-11e6-aa56-0242ac110003",
      "text": "sample"
    }
    """
    Then the response status code should be 201
    And the response should be in JSON
    And the header "Content-Type" should be equal to "application/ld+json; charset=utf-8"

    Examples:
      | user  |
      | admin |
      | prof  |
      | eleve |

  Scenario: Admins can read all the Feedbacks
    Given I authenticate myself as admin
    When I send a "GET" request to "/api/feedbacks"
    Then the response status code should be 200

  @dropSchema
  Scenario: void

