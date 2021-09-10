import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import ContactForm from "./ContactForm";
import { ErrorMessage } from "react-hook-form";

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

test("renders THREE error messages if user enters no values into any fields.", async () => {
  // Arrange
  render(<ContactForm />);
  // Act
  const submitButton = screen.queryByRole("button");
  userEvent.click(submitButton);
  await waitFor(() => {
    screen.getAllByTestId("error");
  });
  // Assert
  expect(screen.getAllByTestId("error")).toHaveLength(3);
});

test("renders ONE error message if user enters a valid first name and last name but no email.", async () => {
  // Arrange
  render(<ContactForm />);
  // Act
  // grab first name field
  const firstNameInput = screen.getByPlaceholderText("Edd");
  // type into first name field
  userEvent.type(firstNameInput, "Leeroy");
  // grab last name field
  const lastNameInput = screen.getByPlaceholderText("Burke");
  // type into last name field
  userEvent.type(lastNameInput, "Jenkins!");
  // grab submit button
  const submitButton = screen.getByRole("button");
  // click submit button
  userEvent.click(submitButton);
  // Assert
  await waitFor(() => {
    screen.getAllByTestId("error");
  });
  // look for single error message
  expect(screen.getAllByTestId("error")).toHaveLength(1);
});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
  // Arrange
  render(<ContactForm />);
  // Act
  // grab first name field
  const firstNameInput = screen.getByPlaceholderText("Edd");
  // type into first name field
  userEvent.type(firstNameInput, "Leeroy");
  // grab last name field
  const lastNameInput = screen.getByPlaceholderText("Burke");
  // type into last name field
  userEvent.type(lastNameInput, "Jenkins!");
  // grab email field
  const emailInput = screen.getByPlaceholderText("bluebill1049@hotmail.com");
  // type invalid email 'leeroy.jenkins'
  userEvent.type(emailInput, "leeroy.jenkins");
  // grab submit button
  const submitButton = screen.getByRole("button");
  // click submit button
  userEvent.click(submitButton);
  // Assert
  await waitFor(() => {
    screen.getByTestId("error");
  });
  // look for an error message with the word email in it somewhere
  const errorMessage = new RegExp("email", "ig");
  expect(screen.getByTestId("error")).toBeInTheDocument();
  expect(screen.getByTestId("error")).toHaveTextContent(errorMessage);
});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
  // Arrange
  render(<ContactForm />);
  // Act
  // grab first name field
  const firstNameInput = screen.getByPlaceholderText("Edd");
  // type into first name field
  userEvent.type(firstNameInput, "Leeroy");
  // grab email field
  const emailInput = screen.getByPlaceholderText("bluebill1049@hotmail.com");
  // type invalid email 'leeroy.jenkins'
  userEvent.type(emailInput, "leeroy@jenk.ins");
  // grab submit button
  const submitButton = screen.getByRole("button");
  // click submit button
  userEvent.click(submitButton);
  // Assert
  await waitFor(() => {
    screen.getByTestId("error");
  });
  // look for an error message with the word lastname in it somewhere
  const errorMessage = new RegExp("lastName", "ig");
  expect(screen.getByTestId("error")).toBeInTheDocument();
  expect(screen.getByTestId("error")).toHaveTextContent(errorMessage);
});

test("renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.", async () => {
  // Arrange
  render(<ContactForm />);
  // Act
  // grab first name field
  const firstNameInput = screen.getByPlaceholderText("Edd");
  // type into first name field
  userEvent.type(firstNameInput, "Leeroy");
  // grab last name field
  const lastNameInput = screen.getByPlaceholderText("Burke");
  // type into last name field
  userEvent.type(lastNameInput, "Jenkins!");
  // grab email field
  const emailInput = screen.getByPlaceholderText("bluebill1049@hotmail.com");
  // type invalid email 'leeroy.jenkins'
  userEvent.type(emailInput, "leeroy@jenk.ins");
  // grab submit button
  const submitButton = screen.getByRole("button");
  // click submit button
  userEvent.click(submitButton);
  // Assert
  await waitFor(() => {
    screen.getByTestId("firstnameDisplay");
    screen.getByTestId("lastnameDisplay");
    screen.getByTestId("emailDisplay");
    screen.getByTestId("messageDisplay"); // Does not render message value when no message is entered
  });
});

test("renders all fields text when all fields are submitted.", async () => {
  // Arrange
  render(<ContactForm />);
  // Act
  // grab first name field
  const firstNameInput = screen.getByPlaceholderText("Edd");
  // type into first name field
  userEvent.type(firstNameInput, "Leeroy");
  // grab last name field
  const lastNameInput = screen.getByPlaceholderText("Burke");
  // type into last name field
  userEvent.type(lastNameInput, "Jenkins!");
  // grab email field
  const emailInput = screen.getByPlaceholderText("bluebill1049@hotmail.com");
  // type invalid email 'leeroy.jenkins'
  userEvent.type(emailInput, "leeroy@jenk.ins");
  // grab message field
  const messageInput = screen.getByLabelText(/message/i);
  // type into message field
  userEvent.type(messageInput, "test message");
  // grab submit button
  const submitButton = screen.getByRole("button");
  // click submit button
  userEvent.click(submitButton);
  // Assert
  await waitFor(() => {
    screen.getByTestId("firstnameDisplay");
    screen.getByTestId("lastnameDisplay");
    screen.getByTestId("emailDisplay");
    screen.getByTestId("messageDisplay");
  });
});
