import { test } from "./BaseTest.spec";
import { faker } from "@faker-js/faker";

test.afterEach(async ({ homePage, page }) => {
  await homePage.headerBar.logOUt();
});

test("Register a new User", async ({ homePage, registerPage, page }) => {
  //arrange
  const fName = faker.name.firstName();
  const lName = faker.name.lastName();
  const email = fName + lName + "@gmail.test.com";

  await homePage.headerBar.proceedToRegister();

  //act
  await registerPage.register.registerNewUser(
      "M",
      fName,
      lName,
      email,
      "Password1234",
      "Password1234"
  );

  //assert
  await registerPage.registerSuccess.verifyRegistrationCompletion(email);
  await homePage.headerBar.verifyLoggedUser(email);
});

test("Basic Login Test", async ({ homePage, loginPage, page }) => {
  //act
  await homePage.headerBar.proceedToLogin();
  await loginPage.returningCustomer.logInToApplication("d.zet@gmail.test.com", "Password1234!");

  //assert
  await homePage.headerBar.verifyLoggedUser("d.zet@gmail.test.com");
});

test("Verify Product Price", async ({
  homePage,
  loginPage,
  productsPage,
  shoppingCartPage,
  page,
}) => {
  //arrange
  const theRandomNumber = Math.floor(Math.random() * 10) + 1;

  await homePage.headerBar.proceedToLogin();
  await loginPage.returningCustomer.logInToApplication("d.zet@gmail.test.com", "Password1234!");

  //act
  await homePage.headerBar.selectCategory("Apparel & Shoes");
  await productsPage.selectProduct("Men's Wrinkle Free Long Sleeve");
  await productsPage.addQuantity(theRandomNumber.toString());
  await productsPage.selectSize("Large");
  await productsPage.addToCart();
  await homePage.headerBar.proceedToShoppingCart();

  //assert
  await shoppingCartPage.verifySubTotalPrice();

  //clean
  await shoppingCartPage.removeFirstProduct();
  await shoppingCartPage.verifyShoppingCartIsEmpty();
});
