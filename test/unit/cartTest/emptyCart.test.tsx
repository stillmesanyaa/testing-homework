import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { MemoryRouter } from "react-router-dom";
import { Cart } from "../../../src/client/pages/Cart";
import { ApplicationState } from "../../../src/client/store";

const mockStore = configureStore<ApplicationState>();

describe("Cart component", () => {
  let store: ReturnType<typeof mockStore>;
  let component: ReturnType<typeof render>;

  beforeEach(() => {
    store = mockStore({
      products: [],
      details: {},
      cart: {},
      latestOrderId: undefined,
    });

    component = render(
      <Provider store={store}>
        <MemoryRouter>
          <Cart />
        </MemoryRouter>
      </Provider>
    );
  });

  it("если корзина пустая, должна отображаться ссылка на каталог товаров", async () => {
    const emptyCartMessage = component.queryByText(/cart is empty/i);
    expect(emptyCartMessage).not.toBeNull();

    const catalogLink = component.queryByText(/catalog/i);
    expect(catalogLink).not.toBeNull();
  });
});
