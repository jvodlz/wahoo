import { 
    render, 
    screen, 
    cleanup, 
    fireEvent, 
} from "@testing-library/react";
import "@testing-library/jest-dom";
import { userEvent } from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";

import Login from "../pages/Login.tsx";

afterEach(() => {
    cleanup();
});

const renderSetup = () => {
    render(
        <MemoryRouter>
            <Login />
        </MemoryRouter>
    );
}

describe("<Login>", () => {
    it("should show login form", () => {
        renderSetup();
        const form = screen.getByTestId("login-form");
        expect(form).toBeInTheDocument();
    });

    it("should take user login inputs", () => {
        renderSetup();
        const emailInput = screen.getByLabelText(/email/i);
        const passwordInput = screen.getByLabelText(/password/i);

        fireEvent.change(emailInput, { target: { value: "pedro@raccoon.com"}});
        fireEvent.change(passwordInput, { target: { value: "wahooTest1"}});

        expect(emailInput).toHaveValue("pedro@raccoon.com");
        expect(passwordInput).toHaveValue("wahooTest1");
    });

    it("should not have notification visible", () => {
        renderSetup();
        const toast = screen.getByTestId("toast");
        expect(toast).not.toBeVisible();
    });

    describe("with valid inputs", () => {
        
        it("should have notification after registration submit", async () => {
            renderSetup();
            const submitBtn = screen.getByRole("button");
            await userEvent.click(submitBtn);
            const toast = screen.getByTestId("toast");

            expect(toast).toBeInTheDocument();

        });
    });


})

