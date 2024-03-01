import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { HeaderHome } from "./HeaderHome";

describe("Header Home", () => {
  //
  test.only("it should show category links", () => {
    jest.mock("../services/ProductsService", () => {
      return {
        GET_CATEGORIES: jest.fn(() => Promise.resolve([])),
      };
    });
    render(
      <BrowserRouter>
        <HeaderHome />
      </BrowserRouter>
    );
  });
  //
});
