import React from "react";
import { findByText, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import ContactForm from "./ContactForm";

test("renders without errors", () => {
  render(<ContactForm />);
});

test("renders the contact form header", () => {
  // component renders
  render(<ContactForm />);
  const header = () => screen.getByText(/contact form/i);
  // Header is in the document
  expect(header()).toBeInTheDocument();
  // Header is truthy
  expect(header()).toBeTruthy();
  // Header has correct text content
  expect(header()).toHaveTextContent(/contact form/i);
});

test("renders ONE error message if user enters less than 5 characters into firstname.", async () => {
  // Arrange
  render(<ContactForm />);
  const errorMessageText = new RegExp(
    "firstName must have at least 5 characters",
    "i"
  );
  const firstNameInputText = new RegExp("First Name*", "i");
  // Act
  const firstNameInput = screen.getByLabelText(firstNameInputText);
  userEvent.type(firstNameInput, "Bob");
  await waitFor(() => {
    screen.getByText(errorMessageText);
  });
  // Assert
  expect(screen.getByText(errorMessageText)).toBeInTheDocument();
});

// test('renders THREE error messages if user enters no values into any fields.', async () => {

// });

// test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {

// });

// test('renders "email must be a valid email address" if an invalid email is entered', async () => {

// });

// test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {

// });

// test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {

// });

// test('renders all fields text when all fields are submitted.', async () => {

// });
