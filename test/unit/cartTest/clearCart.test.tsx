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
      products: [
        { id: 1, name: "Product A", price: 10 },
        { id: 2, name: "Product B", price: 15 },
      ],

      details: {
        1: {
          id: 1,
          name: "Product A",
          price: 10,
          description: "Description A",
          material: "Material A",
          color: "Color A",
        },
        2: {
          id: 2,
          name: "Product B",
          price: 15,
          description: "Description B",
          material: "Material B",
          color: "Color B",
        },
      },

      cart: {
        1: { name: "Product A", price: 10, count: 1 },
        2: { name: "Product B", price: 15, count: 2 },
      },

      latestOrderId: 12345,
    });

    component = render(
      <Provider store={store}>
        <MemoryRouter>
          <Cart />
        </MemoryRouter>
      </Provider>
    );
  });

  it("в корзине должна быть кнопка очистить корзину", async () => {
    const clearButton = component.getByText(/clear shopping cart/i);
    expect(clearButton).not.toBeNull();
  });
});
