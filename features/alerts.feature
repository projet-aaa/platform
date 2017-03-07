Feature: Manage alerts
  Alerts can be created by everyone authenticated.
  Alerts can be read by their author, or profs

  @createSchema
  Scenario: A student can only read its Alert
    Given I authenticate myself as smaurel
    When I send a "GET" request to "/api/alerts/ump999p0-fda0-11e6-aa56-0242ac110003"
    Then the response status code should be 200

  Scenario Outline: Everyone can create an alert
    Given I authenticate myself as <user>
    When I add "Content-Type" header equal to "application/ld+json"
    And I add "Accept" header equal to "application/ld+json"
    And I send a "POST" request to "/api/alerts" with body:
    """
    {
      "alertType": "tooSlow",
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

  Scenario: Profs can read all the Alerts
    Given I authenticate myself as prof
    When I send a "GET" request to "/api/alerts"
    Then the response status code should be 200

  @dropSchema
  Scenario: void

