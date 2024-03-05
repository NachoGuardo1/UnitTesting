import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { DrawerLinks } from "./DrawerLinks";

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
describe("Drawer Links", () => {
  //
  describe("Drawer Closed", () => {
    test("it should be closed", () => {
      render(
        <BrowserRouter>
          <DrawerLinks />
        </BrowserRouter>
      );

      expect(screen.queryByTestId("drawer-links")).toBeNull();
    });
    //
  });
  //
  describe("Drawer Open", () => {
    //
    test("it should open drawer", () => {
      render(
        <BrowserRouter>
          <DrawerLinks />
        </BrowserRouter>
      );
      expect(screen.getByTestId("open-drawer")).toBeInTheDocument();
      fireEvent.click(screen.getByTestId("open-drawer"));
      expect(screen.getByTestId("drawer-links")).toBeVisible();
    });
    //
    test("it should show category links", async () => {
      render(
        <BrowserRouter>
          <DrawerLinks />
        </BrowserRouter>
      );
      waitFor(() => {
        fireEvent.click(screen.getByTestId("open-drawer"));
        expect(screen.getByTestId("drawer-links")).toBeVisible();
      });

      expect(screen.getByText(/categoryone/i)).toBeInTheDocument();
      expect(screen.getByText(/categorytwo/i)).toBeInTheDocument();
    });
    //
    test.only("it should navigate to category page", () => {
      render(
        <BrowserRouter>
          <DrawerLinks />
        </BrowserRouter>
      );
      waitFor(() => {
        fireEvent.click(screen.getByTestId("open-drawer"));
        expect(screen.getByTestId("drawer-links")).toBeVisible();
        expect(screen.getByText(/categorytwo/i)).toBeInTheDocument();
      });
      fireEvent.click(screen.getByText(/categorytwo/i));
      expect(window.location.pathname).toBe("/category/CategoryTwo");
    });
  });
});
