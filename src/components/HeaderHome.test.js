import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { HeaderHome } from "./HeaderHome";

jest.mock("../services/ProductsService", () => {
  return {
    GET_CATEGORIES: jest.fn(() =>
      Promise.resolve(["CategoryOne", "CategoryTwo"])
    ),
  };
});
jest.mock("../reducers/FetchReducer", () => ({
  FetchReducer: () => [
    { data: ["CategoryOne", "CategoryTwo"], loading: false },
    jest.fn(),
  ],
}));

describe("Header Home", () => {
  //
  test("it should show category links", async () => {
    render(
      <BrowserRouter>
        <HeaderHome />
      </BrowserRouter>
    );
    const categoryButtons = await screen.findAllByTestId("btn-category");
    expect(categoryButtons).toHaveLength(2);
    expect(screen.getByText(/categoryone/i)).toBeInTheDocument();
    expect(screen.getByText(/categorytwo/i)).toBeInTheDocument();
  });
  //
  test("it should navigate to category page", () => {
    render(
      <BrowserRouter>
        <HeaderHome />
      </BrowserRouter>
    );
    const categoryOneButton = screen.getByText(/categoryone/i);
    waitFor(() => {
      expect(categoryOneButton).toBeInTheDocument();
    });
    fireEvent.click(categoryOneButton);
    expect(window.location.pathname).toBe("/category/CategoryOne");
  });

  //
});
