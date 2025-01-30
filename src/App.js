1>
      <ProductList addToCart={addToCart} />
      <Button variant="contained" onClick={() => placeOrder(tableNumber)}>
        Place Order for Table {tableNumber}
      </Button>
    </div>
  );
};

export default App;


