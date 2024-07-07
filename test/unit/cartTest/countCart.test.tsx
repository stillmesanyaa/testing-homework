import React from "react";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { MemoryRouter } from "react-router-dom";
import { Application } from "../../../src/client/Application";
import { ApplicationState } from "../../../src/client/store";

const mockStore = configureStore<ApplicationState>();

describe("Application component", () => {
  let store: ReturnType<typeof mockStore>;
  let component: ReturnType<typeof render>;

  const info: ApplicationState = {
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
  };

  beforeEach(() => {
    store = mockStore(info);

    component = render(
      <Provider store={store}>
        <MemoryRouter>
          <Application />
        </MemoryRouter>
      </Provider>
    );
  });

  it("в шапке рядом со ссылкой на корзину должно отображаться количество не повторяющихся товаров в ней", async () => {
    const cartCount = Object.keys(info.cart).length;
    const cartLink = component.getByText((content, element) => {
      return (
        element?.tagName.toLowerCase() === "a" &&
        content.includes(`Cart (${cartCount})`)
      );
    });

    expect(cartLink).not.toBeNull();
  });
});
