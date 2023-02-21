import { test } from "./BaseTest.spec";
import { faker } from "@faker-js/faker";

test.afterEach(async ({ homePage, page }) => {
  await homePage.headerBar.logOUt();
});

test("Successful register a new user with valid credentials", async ({ homePage, registerPage, page }) => {

  let userData: { fName: string, lName: string, email: string, password: string } = {
    fName: '',
    lName: '',
    email: '',
    password: ''
  };

  await test.step("Input a new user data", async () => {
    userData.fName = faker.name.firstName();
    userData.lName = faker.name.lastName();
    userData.email = userData.fName + userData.lName + "@gmail.test.com";
    userData.password = faker.random.alphaNumeric(10)

    await homePage.headerBar.proceedToRegister();
    await registerPage.register.registerNewUser(
        "M",
        userData.fName,
        userData.lName,
        userData.email,
        userData.password,
        userData.password
    );
  });

  await test.step("Verify successful register of a new user", async () => {
    await registerPage.registerSuccess.verifyRegistrationCompletion(userData.email);
    await homePage.headerBar.verifyLoggedUser(userData.email);
  });
});

test("Successful user login with valid credentials", async ({ homePage, loginPage, page }) => {

  await test.step("Navigate to login screen", async () => {
    await homePage.headerBar.proceedToLogin();
  });

  await test.step("Input user valid credentials", async () => {
    await loginPage.returningCustomer.logInToApplication("d.zet@gmail.test.com", "Password1234!");
  });

  await test.step("Verify successful login of a user", async () => {
    await homePage.headerBar.verifyLoggedUser("d.zet@gmail.test.com");
  });
});

test("Verify price of added items to a cart", async ({
  homePage,
  loginPage,
  productsPage,
  shoppingCartPage,
  page,
}) => {
  const theRandomNumber = Math.floor(Math.random() * 10) + 1;

  await test.step("Login user with valid credentials", async () => {
    await homePage.headerBar.proceedToLogin();
    await loginPage.returningCustomer.logInToApplication("d.zet@gmail.test.com", "Password1234!");
  });

  await test.step("Add item to a shopping cart", async () => {
    await productsPage.selectProduct("Men's Wrinkle Free Long Sleeve");
    await productsPage.addQuantity(theRandomNumber.toString());
    await productsPage.selectSize("Large");
    await productsPage.addToCart();
  });

  await test.step("Proceed to a shopping cart", async () => {
    await homePage.headerBar.proceedToShoppingCart();
  });

  await test.step("Verify total price of added item", async () => {
    await shoppingCartPage.verifySubTotalPrice();

  });

  await test.step("Delete items form a cart", async () => {
    await shoppingCartPage.removeFirstProduct();
    await shoppingCartPage.verifyShoppingCartIsEmpty();
  });
});
