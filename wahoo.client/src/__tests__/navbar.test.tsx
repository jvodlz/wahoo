import { 
    render, 
    screen, 
    cleanup,
    // waitFor, 
} from "@testing-library/react";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";
// import axios from "axios";

import Navbar from "../components/Navbar.tsx";

global.ResizeObserver = jest.fn().mockImplementation(() => ({
    observe: jest.fn(),
    unobserve: jest.fn(),
    disconnect: jest.fn(),
}))

// jest.mock("axios");
// const mockedAxios: jest.Mocked<typeof axios> = axios as any;

afterEach(() => {
    cleanup();
});

const renderSetup = () => {
    render(
        <MemoryRouter>
            <Navbar />
        </MemoryRouter>
    );
}

describe("<Navbar>", () => {
    it("should show navbar component", () => {
        renderSetup();
        const navbar = screen.getByTestId("navbar-component");
        expect(navbar).toBeInTheDocument();
    });

    /** TODO */
    // it('fetches and displays user email correctly', async () => {
    //     // Mock Axios response
    //     const mockResponse = {
    //         status: 200,
    //         data: {
    //             email: "pedro@raccoon.com",
    //         },
    //     };
    //     mockedAxios.get.mockResolvedValueOnce(mockResponse);

    //     // Render the component
    //     const { findByText } = render(<Navbar />);

    //     await waitFor(() => {

    //         const userEmailElement = findByText('pedro@raccoon.com');
    
    //         expect(userEmailElement).toBeInTheDocument();
    //     })
    // });

})