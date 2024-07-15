import { 
    render, 
    screen, 
    cleanup, 
} from "@testing-library/react";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";

import Wahoo from "../pages/Wahoo.tsx";

global.ResizeObserver = jest.fn().mockImplementation(() => ({
    observe: jest.fn(),
    unobserve: jest.fn(),
    disconnect: jest.fn(),
}))

afterEach(() => {
    cleanup();
});


const renderSetup = () => {
    render(
        <MemoryRouter>
            <Wahoo />
        </MemoryRouter>
    );
}

describe("<Wahoo>", () => {
    it("should show wahoo video", () => {
        renderSetup();
        const iframeElement = screen.getByTestId("wahoo-video");
        expect(iframeElement).toBeInTheDocument();
    });

})