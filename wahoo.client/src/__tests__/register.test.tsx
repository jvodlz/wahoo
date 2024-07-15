import { 
    render, 
    screen, 
    cleanup, 
    fireEvent, 
} from "@testing-library/react";
import "@testing-library/jest-dom";
import { userEvent } from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";

import Register from "../pages/Register.tsx";

afterEach(() => {
    cleanup();
});

const renderSetup = () => {
    render(
        <MemoryRouter>
            <Register />
        </MemoryRouter>
    );
}

describe("<Register>", () => {

    it("should show register form", () => {
        renderSetup();
        const form = screen.getByTestId("register-form");
        expect(form).toBeInTheDocument();
    });

    it("should take user registration inputs", () => {
        renderSetup();
        const emailInput = screen.getByLabelText(/email/i);
        const passwordInput = screen.getByLabelText(/^Password \*$/);
        const confirmPasswordInput = screen.getByLabelText(/^Confirm Password \*$/);

        fireEvent.change(emailInput, { target: { value: "pedro@raccoon.com"}});
        fireEvent.change(passwordInput, { target: { value: "wahooTest1"}});
        fireEvent.change(confirmPasswordInput, { target: { value: "wahooTest1"}});

        expect(emailInput).toHaveValue("pedro@raccoon.com");
        expect(passwordInput).toHaveValue("wahooTest1");
        expect(confirmPasswordInput).toHaveValue("wahooTest1");
    });

    it("should not have notification visible", () => {
        renderSetup();
        const toast = screen.getByTestId("toast");
        expect(toast).not.toBeVisible();
    });

    describe("with valid inputs", () => {
        
        it("should show notification after registration submit", async () => {
            renderSetup();
            const submitBtn = screen.getByRole("button");
            await userEvent.click(submitBtn);
            const mockToggleToast = jest.fn();
            const mockHandleSubmit = jest.fn().mockImplementation(() => mockToggleToast);
            const toast = screen.getByTestId("toast");
            
            mockHandleSubmit("registration and toast logic");
            expect(mockToggleToast).toHaveBeenCalled;
            expect(toast).toBeInTheDocument();

        });
    });


})

