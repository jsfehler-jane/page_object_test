Feature: Schedule Demo

  Scenario: Demo Two

    Given I am logged in as an admin
    When I select a Treatment for a staff member
    And I select a free slot on the schedule
    And I add a patient to the appointment slot
    Then the patient is added to the appointment
