Feature: End to end Ecommerce Validation

  Scenario: Ecommerce product delivery
    Given I am on Ecommerce
    When I login to the application
    And I add the items in the cart and checkout
    And validate the total price
    Then select the country submit and verify it
