Feature: Manage subject
  Subjects can be read by everyone authenticated.
  Subjects can be created by admins and teachers

  @createSchema
  Scenario: void

  Scenario Outline: Everyone can read a Subject
    Given I authenticate myself as <user>
    And I send a "GET" request to "/api/subjects"
    Then the response status code should be 200

    Examples:
      | user  |
      | admin |
      | prof  |
      | eleve |

  Scenario Outline: Admins and Teachers can create subjects
    Given I authenticate myself as <user>
    When I add "Content-Type" header equal to "application/ld+json"
    And I add "Accept" header equal to "application/ld+json"
    And I send a "POST" request to "/api/subjects" with body:
    """
    {
      "resource": "test"
    }
    """
    Then the response status code should be 201

    Examples:
      | user  |
      | admin |
      | prof  |

  @dropSchema
  Scenario: void
