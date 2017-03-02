Feature: Manage Tests
  Tests can be read by everyone authenticated.
  Tests can be created by admins and teachers

  @createSchema
  Scenario: void

  Scenario Outline: Everyone can read a Tests
    Given I authenticate myself as <user>
    And I send a "GET" request to "/api/tests"
    Then the response status code should be 200

    Examples:
      | user  |
      | admin |
      | prof  |
      | eleve |

  Scenario Outline: Admins and Teachers can create tests
    Given I authenticate myself as <user>
    When I add "Content-Type" header equal to "application/ld+json"
    And I add "Accept" header equal to "application/ld+json"
    And I send a "POST" request to "/api/tests" with body:
    """
    {
      "title": "Test title",
      "live": true
    }
    """
    Then the response status code should be 201

    Examples:
      | user  |
      | admin |
      | prof  |

  @dropSchema
  Scenario: void
