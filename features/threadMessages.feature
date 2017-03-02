Feature: Manage ThreadMessages
  ThreadMessages can be read by everyone.
  ThreadMessages can be created by everyone.

  @createSchema
  Scenario: void

  Scenario Outline: Everyone can read all ThreadMessage
    Given I authenticate myself as <user>
    And I send a "GET" request to "/api/thread_messages"
    Then the response status code should be 200

    Examples:
      | user  |
      | admin |
      | prof  |
      | eleve |

  Scenario Outline: Everyone can create a ThreadMessage
    Given I authenticate myself as <user>
    When I add "Content-Type" header equal to "application/ld+json"
    And I add "Accept" header equal to "application/ld+json"
    And I send a "POST" request to "/api/thread_messages" with body:
    """
    {
      "text": "ThreadMessage text",
      "plusVoters": [],
      "downVoters": []
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
