Feature: Manage Users
  Users can be read by admins and themselves.
  Users can be created by admins.

  @createSchema
  Scenario: Admins can read all user
    Given I authenticate myself as admin
    And I send a "GET" request to "/api/users"
    Then the response status code should be 200

  Scenario: Any user can read its own account
    Given I authenticate myself as eleve
    And I send a "GET" request to "/api/users/3"
    Then the response status code should be 200

    @dropSchema
  Scenario: Admins can create a user
    Given I authenticate myself as admin
    When I add "Content-Type" header equal to "application/ld+json"
    And I add "Accept" header equal to "application/ld+json"
    And I send a "POST" request to "/api/users" with body:
    """
    {
    "username": "quickscop3r",
    "plainPassword": "quickscop3r",
    "firstname":"quick",
    "lastname": "scop3r"
    }
    """
    Then the response status code should be 201