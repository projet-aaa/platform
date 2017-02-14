# features/books.feature
Feature: API Login
  As a user I am able to login on the API and retrieve a token


  # the "@createSchema" annotation provided by API Platform creates a temporary SQLite database for testing the API
  @createSchema
  Scenario: Authenticate to the API with valid credentials gives back a JWT Token.
    When I send a "POST" request to "/api/login_check" with parameters:
      | key      | value |
      | _username | admin |
      | _password | admin |
    Then the response status code should be 200
    And the response should be in JSON
    And the JSON node "token" should exist

  Scenario Outline: Access to the API with JWT token should be accepted.
    Given I authenticate myself as <user>
    When I send a "GET" request to "/api/disciplines"
    Then the response status code should be 200

    Examples:
      | user  |
      | admin |
      | prof  |
      | eleve |

    # The "@dropSchema" annotation must be added on the last scenario of the feature file to drop the temporary SQLite database
    @dropSchema
    Scenario: void
      A null scenario only to be decorated by dropSchema annotation