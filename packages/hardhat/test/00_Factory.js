const CommerceFactory = artifacts.require("CommerceFactory");
const CommerceContract = artifacts.require("CommerceContract");

contract("CommerceFactory", accounts => {
  let factoryInstance;

  before(async () => {
    factoryInstance = await CommerceFactory.deployed();
  });

  it("should create a new CommerceContract", async () => {
    const title = "Test Product";
    const description = "Test Description";
    const photoURL = "http://example.com/photo.jpg";
    const originsLocation = "Test Location";
    const shippingMethod = "Test Shipping";
    const upcharges = "None";
    const sellerName = "Test Seller";
    const quantity = 10;
    const validityTime = 1000000;
    const productPrice = web3.utils.toWei("0.1", "ether");

    await factoryInstance.createCommerceContract(
      title,
      description,
      photoURL,
      originsLocation,
      shippingMethod,
      upcharges,
      sellerName,
      quantity,
      validityTime,
      productPrice,
      { from: accounts[0] },
    );

    const commerceContracts = await factoryInstance.getCommerceContracts();
    assert.equal(commerceContracts.length, 1, "Commerce contract was not created");

    const contractAddress = commerceContracts[0];
    const commerceContract = await CommerceContract.at(contractAddress);

    const product = await commerceContract.product();
    assert.equal(product.title, title, "Product title mismatch");
    assert.equal(product.description, description, "Product description mismatch");
    assert.equal(product.photoURL, photoURL, "Product photoURL mismatch");
    assert.equal(product.originsLocation, originsLocation, "Product originsLocation mismatch");
    assert.equal(product.shippingMethod, shippingMethod, "Product shippingMethod mismatch");
    assert.equal(product.upcharges, upcharges, "Product upcharges mismatch");
    assert.equal(product.sellerName, sellerName, "Product sellerName mismatch");
    assert.equal(product.quantity.toNumber(), quantity, "Product quantity mismatch");
    assert.equal(product.validityTime.toNumber(), validityTime, "Product validityTime mismatch");
  });
});
