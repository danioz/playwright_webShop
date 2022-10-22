import { test } from "./BaseTest.spec";
import { faker } from "@faker-js/faker";

test.afterEach(async ({ homePage, page }) => {
  await homePage.logOUt();
});

test("Register a new User", async ({ homePage, registerPage, page }) => {
  await homePage.proceedToRegister();

  let fName = faker.name.firstName();
  let lName = faker.name.lastName();
  let email = fName + lName + "@gmail.test.com";

  await registerPage.registerNewUser(
    "M",
    fName,
    lName,
    email,
    "Password1234",
    "Password1234"
  );
  await registerPage.verifyRegistrationCompletion(email);
});

test("Basic Login Test", async ({ homePage, loginPage, page }) => {
  await homePage.proceedToLogin();
  await loginPage.logInToApplication("d.zet@gmail.test.com", "Password1234!");
  await homePage.verifyLoggedUser("d.zet@gmail.test.com");
});

test("Verify Product Price", async ({
  homePage,
  loginPage,
  productsPage,
  shoppingCartPage,
  page,
}) => {
  await homePage.proceedToLogin();
  await loginPage.logInToApplication("d.zet@gmail.test.com", "Password1234!");
  await homePage.selectCategory("Apparel & Shoes");
  var theRandomNumber = Math.floor(Math.random() * 10) + 1;
  await productsPage.selectProduct("Men's Wrinkle Free Long Sleeve");
  await productsPage.addQuantity(theRandomNumber.toString());
  await productsPage.selectSize("Large");
  await productsPage.addToCart();
  await homePage.proceedToShoppingCart();
  await shoppingCartPage.verifySubTotalPrice();
  await shoppingCartPage.removeFirstProduct();
  await shoppingCartPage.verifyShoppingCartIsEmpty();
});
