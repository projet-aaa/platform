Feature: Manage Sessions
  Sessions can be read by everyone authenticated.
  Sessions can be created by admins and teachers

  @createSchema
  Scenario: void

  Scenario Outline: Everyone can read a session
    Given I authenticate myself as <user>
    And I send a "GET" request to "/api/sessions"
    Then the response status code should be 200

    Examples:
      | user  |
      | admin |
      | prof  |
      | eleve |

  Scenario: Teachers can create sessions
    Given I authenticate myself as prof
    When I add "Content-Type" header equal to "application/ld+json"
    And I add "Accept" header equal to "application/ld+json"
    And I send a "POST" request to "/api/sessions" with body:
    """
    {
      "name": "XText",
      "type": "TP",
      "discipline": "/api/disciplines/8565d423-fd9f-11e6-aa56-0242ac110003"
    }
    """
    Then the response status code should be 201


  @dropSchema
  Scenario: Admins can create sessions
    Given I authenticate myself as admin
    When I add "Content-Type" header equal to "application/ld+json"
    And I add "Accept" header equal to "application/ld+json"
    And I send a "POST" request to "/api/sessions" with body:
    """
    {
      "name": "Acceleo",
      "type": "TP",
      "discipline": "/api/disciplines/8565d423-fd9f-11e6-aa56-0242ac110003"
    }
    """
    Then the response status code should be 201