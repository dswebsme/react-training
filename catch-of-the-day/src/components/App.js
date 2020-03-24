import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Header from "./Header";
import Order from "./Order";
import Inventory from "./Inventory";
import sampleFishes from "../sample-fishes";
import Fish from "./Fish";
import base from "../base";

// React Router makes the `{ match }` object available to the component immediately
// @SEE: https://reacttraining.com/react-router/web/api/match
// if passing the full `{ match }` object to the component use `match.params.storeId` to get the `storeId`
// if passing `storeId` directly `storeId` is declared and available within the component
const App = ({ match: { params: { storeId } } }) => {

  // previously `state` contained `fishes` and `order` objects
  // declare state variables for `fishes` and `order` so they can be updated independently
  // @SEE: https://reactjs.org/docs/hooks-faq.html#should-i-use-one-or-many-state-variables
  const [fishes, setFishes] = useState({});

  // initialize the order state from localStorage (parsed JSON) or as an empty object
  const [order, setOrder] = useState(JSON.parse(localStorage.getItem(storeId)) || {});

  // declare functions that provide CRUD like features
  const addFish = fish => {
    // spread `fishes` and append the new `fish` as useState replaces values instead of merging them
    // @SEE: https://reactjs.org/docs/hooks-faq.html#should-i-use-one-or-many-state-variables
    setFishes({ ...fishes, [`fish${Date.now()}`]: fish });
  };

  const updateFish = (key, updatedFish) => {
    // spread `fishes` and replace the `fish` at `key` with `updatedFish`
    setFishes({ ...fishes, [key]: updateFish});
  };

  const deleteFish = key => {
    // spread `fishes` and null out the value at `key` as required by firebase
    setFishes({ ...fishes, [key]: null });
  };

  const loadSampleFishes = () => {
    // spread `fishes` and append the sampleFishes spread
    setFishes({ ...fishes, ...sampleFishes });
  };

  const addToOrder = key => {
    // spread `order` and increment the value of `key` or set it to 1
    setOrder({ ...order, [key]: order[key] + 1 || 1 });
  };

  const removeFromOrder = key => {
    // declare `orders` as a spread of `order`
    const orders = { ...order };

    // delete the value found at `key`
    delete orders[key];

    // replace the previous `order` state with the updated `orders` variable
    setOrder(orders);
  };

  // replaces componentDidMount
  useEffect(() => {
    const ref = base.syncState(`${storeId}/fishes`, {
      context: {
        setState: ({ fishes }) => setFishes({ ...fishes }),
        state: { fishes },
      },
      state: "fishes"
    })

    // the return handles unmounting (replace componentWillUnmount)
    return () => {
      base.removeBinding(ref);
    }
  }, []);

  // replaces componentDidUpdate
  useEffect(() => {
    localStorage.setItem(storeId, JSON.stringify(order));
  }, [order]);

  // remove the special `render()` method in favor of a direct return statement
  return (
    <div className="catch-of-the-day">
      <div className="menu">
        <Header tagline="Fresh Seafood Market" />
        <ul className="fishes">
          {Object.entries(fishes).map(([key, fish]) =>
            <Fish
              key={key}
              index={key}
              details={fish}
              addToOrder={() => addToOrder(key)}
            />
          )}
        </ul>
      </div>
      <Order
        fishes={fishes}
        order={order}
        removeFromOrder={removeFromOrder}
      />
      <Inventory
        addFish={addFish}
        updateFish={updateFish}
        deleteFish={deleteFish}
        loadSampleFishes={loadSampleFishes}
        fishes={fishes}
        storeId={storeId}
      />
    </div>
  );
}

// add the `propTypes` property to the component
// IMO: declaring this property outside of the component keeps the component logic clean
App.propTypes = {
  match: PropTypes.object
};

export default App;
