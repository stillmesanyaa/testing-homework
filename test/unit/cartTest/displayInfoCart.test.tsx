import React from "react";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { MemoryRouter } from "react-router-dom";
import { Cart } from "../../../src/client/pages/Cart";
import { ApplicationState } from "../../../src/client/store";

const mockStore = configureStore<ApplicationState>();

describe("Cart component", () => {
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
          <Cart />
        </MemoryRouter>
      </Provider>
    );
  });

  it("для каждого товара должны отображаться название, цена, количество и стоимость", async () => {
    Object.entries(info.cart).forEach(([key, value]) => {
      const element = component.getByTestId(key);
      expect(element.querySelector(".Cart-Index")?.textContent).toBe(
        `${value.count}`
      );
      expect(element.querySelector(".Cart-Name")?.textContent).toBe(
        `${value.name}`
      );
      expect(element.querySelector(".Cart-Price")?.textContent).toBe(
        `$${value.price}`
      );
      console.log(element.outerHTML);
    });
  });
  it("должна отображаться общая сумма заказа", async () => {
    let total = 0;
    Object.entries(info.cart).forEach(([key, value]) => {
      total += value.price * value.count;
    });
    const orderTotalElement =
      component.container.querySelector(".Cart-OrderPrice");
    expect(orderTotalElement?.textContent).toBe(`$${total}`);
  });
});
