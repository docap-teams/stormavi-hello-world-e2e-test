Feature: hello-app

  Scenario: Call hello application without a parameter
    Given I open the hello application
    Then the title is "Home"
    And Hello and Welcome is presented

  Scenario: Call hello application with parameter Roy
    Given I open the hello application with parameter "Roy"
    Then the title is "Home"
    And Hello and Welcome "Roy" is presented