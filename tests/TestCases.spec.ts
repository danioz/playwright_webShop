import { test } from "./BaseTest.spec";
import { faker } from "@faker-js/faker";

const login = "d.zet@gmail.test.com";
const password = "Password1234!";

test.afterEach(async ({ homePage }) => {
  await homePage.headerBar.logOut();
});

interface IUserData {
  firstName: string;
  lastName: string;
  emailAddress: string;
  password: string;
}

test("Successful register a new user with valid credentials", async ({
  homePage,
  registerPage,
}) => {
  //region Arrange
  let userData: IUserData = {
    firstName: "",
    lastName: "",
    emailAddress: "",
    password: "",
  };
  await test.step("Prepare a new user data", async () => {
    userData.firstName = faker.name.firstName();
    userData.lastName = faker.name.lastName();
    userData.emailAddress =
      userData.firstName + userData.lastName + "@gmail.test.com";
    userData.password = faker.random.alphaNumeric(10);
  });
  //endregion

  //region Act
  await test.step("Input a new user data", async () => {
    await homePage.headerBar.proceedToRegister();
    await registerPage.register.registerNewUser(
      "M",
      userData.firstName,
      userData.lastName,
      userData.emailAddress,
      userData.password,
      userData.password
    );
  });
  //endregion

  //region Assert
  await test.step("Verify successful register of a new user", async () => {
    await registerPage.registerSuccess.verifyRegistrationCompletion(
      userData.emailAddress
    );
    await homePage.headerBar.verifyLoggedUser(userData.emailAddress);
  });
  //endregion
});

test("Successful user login with valid credentials", async ({
  homePage,
  loginPage,
}) => {
  //region Act
  await test.step("Navigate to login screen", async () => {
    await homePage.headerBar.proceedToLogin();
  });
  await test.step("Input user valid credentials", async () => {
    await loginPage.returningCustomer.logInToApplication(login, password);
  });
  //endregion

  //region Assert
  await test.step("Verify successful login of a user", async () => {
    await homePage.headerBar.verifyLoggedUser(login);
  });
  //endregion
});

test.only("Verify price of added items to a cart", async ({
  homePage,
  loginPage,
  productsPage,
  shoppingCartPage,
}) => {
  //region Arrange
  const category = "Apparel & Shoes";
  const productName = "Men's Wrinkle Free Long Sleeve";
  const sizeName = "Large";
  const theRandomNumber = Math.floor(Math.random() * 10) + 1;

  await test.step("Login user with valid credentials", async () => {
    await homePage.headerBar.proceedToLogin();
    await loginPage.returningCustomer.logInToApplication(login, password);
  });
  //endregion

  //region Act
  await test.step("Add item to a shopping cart", async () => {
    await homePage.headerBar.selectCategory(category);
    await productsPage.selectProduct(productName);
    await productsPage.addQuantity(theRandomNumber.toString());
    await productsPage.selectSize(sizeName);
    await productsPage.addToCart();
  });

  await test.step("Proceed to a shopping cart", async () => {
    await homePage.headerBar.proceedToShoppingCart();
  });
  //endregion

  //region Assert
  await test.step("Verify total price of added item", async () => {
    await shoppingCartPage.verifySubTotalPrice();
  });
  //endregion

  //region Cleaning
  await test.step("Delete items form a cart", async () => {
    await shoppingCartPage.removeFirstProduct();
    await shoppingCartPage.verifyShoppingCartIsEmpty();
  });
  //endregion
});
