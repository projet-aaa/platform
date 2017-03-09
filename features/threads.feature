Feature: Manage Threads
  Threads can be read by everyone.
  Threads can be created by everyone.

  @createSchema
  Scenario: void

  Scenario Outline: Everyone can read all threads
    Given I authenticate myself as <user>
    And I send a "GET" request to "/api/threads"
    Then the response status code should be 200

    Examples:
      | user  |
      | admin |
      | prof  |
      | eleve |

  Scenario Outline: Everyone can create a threads
    Given I authenticate myself as <user>
    When I add "Content-Type" header equal to "application/ld+json"
    And I add "Accept" header equal to "application/ld+json"
    And I send a "POST" request to "/api/threads" with body:
    """
    {
      "title": "thread title",
      "text": "thread text"
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
