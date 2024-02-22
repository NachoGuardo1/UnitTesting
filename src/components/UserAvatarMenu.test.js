import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { UserAvatarMenu } from "./UserAvatarMenu";
import { authContext } from "../contexts/AuthContext";
import { BrowserRouter } from "react-router-dom";

describe("UserAvatarMenu", () => {
  //
  describe("Avatar Item", () => {
    test("it should show avatar not logged item", () => {
      const authContextData = {
        userData: {},
        userLogged: false,
      };
      render(
        <BrowserRouter>
          <authContext.Provider value={authContextData}>
            <UserAvatarMenu />
          </authContext.Provider>
        </BrowserRouter>
      );
      expect(screen.getByTestId("avatar-not-logged")).toBeInTheDocument();
    });
    //
    test("it should show avatar logged item", () => {
      const authContextData = {
        userData: { nombre: "ignacio", apellido: "guardo", rol: "USER" },
        userLogged: true,
      };
      render(
        <BrowserRouter>
          <authContext.Provider value={authContextData}>
            <UserAvatarMenu />
          </authContext.Provider>
        </BrowserRouter>
      );
      expect(screen.getByTestId("avatar-logged")).toBeInTheDocument();
    });
    //
  });
  //
  describe("Menu item", () => {
    //
    describe("User Logged Menu", () => {
      const authContextData = {
        userData: { nombre: "ignacio", apellido: "guardo", rol: "USER" },
        userLogged: true,
        onLogout: jest.fn(),
      };
      const open = Boolean;

      test("it should open menu with onclick", () => {
        render(
          <BrowserRouter>
            <authContext.Provider value={authContextData}>
              <UserAvatarMenu open={open} />
            </authContext.Provider>
          </BrowserRouter>
        );
        fireEvent.click(screen.getByTestId("btn-user"));
        expect(screen.getByTestId("menu-user")).toBeInTheDocument();
      });
      //
      test("it should have logout button", () => {
        render(
          <BrowserRouter>
            <authContext.Provider value={authContextData}>
              <UserAvatarMenu open={open} />
            </authContext.Provider>
          </BrowserRouter>
        );
        fireEvent.click(screen.getByTestId("btn-user"));
        expect(screen.getByTestId("logout-btn")).toBeInTheDocument();
        expect(screen.getByText(/ignacio guardo/i)).toBeInTheDocument();
      });
      //
      test("it should call onLogout function", () => {
        render(
          <BrowserRouter>
            <authContext.Provider value={authContextData}>
              <UserAvatarMenu open={open} />
            </authContext.Provider>
          </BrowserRouter>
        );
        fireEvent.click(screen.getByTestId("btn-user"));
        expect(screen.getByTestId("menu-user")).toBeInTheDocument();
        fireEvent.click(screen.getByTestId("logout-btn"));
        expect(authContextData.onLogout).toHaveBeenCalled();
      });
      //
    });
    //
    describe("User not logged Menu", () => {
      const authContextData = {
        userData: {},
        userLogged: false,
      };
      const open = Boolean;
      //
      test("it should show login button", () => {
        render(
          <BrowserRouter>
            <authContext.Provider value={authContextData}>
              <UserAvatarMenu open={open} />
            </authContext.Provider>
          </BrowserRouter>
        );
        fireEvent.click(screen.getByTestId("btn-user"));
        expect(screen.getByTestId("login-btn")).toBeInTheDocument();
      });
      //
      test("it should navigate to login page", async () => {
        render(
          <BrowserRouter>
            <authContext.Provider value={authContextData}>
              <UserAvatarMenu open={open} />
            </authContext.Provider>
          </BrowserRouter>
        );

        fireEvent.click(screen.getByTestId("btn-user"));
        await waitFor(() => {
          expect(screen.getByTestId("login-btn")).toBeInTheDocument();
        });

        fireEvent.click(screen.getByTestId("login-btn"));
        expect(window.location.pathname).toBe("/login");
      });
      //
    });
    //
  });
});
