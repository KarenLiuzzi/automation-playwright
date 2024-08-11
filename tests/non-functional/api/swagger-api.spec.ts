import { expect, test } from '@playwright/test'

// Importa dotenv
require('dotenv').config();
let apiContext;
let pet_object = {
    id: 0,
    category: {
      id: 0,
      name: "string"
    },
    name: "doggie",
    photoUrls: [
      "string"
    ],
    tags: [
      {
        id: 0,
        name: "string"
      }
    ],
    status: "available"
};

test.beforeAll(async ({ playwright }) => {

    apiContext = await playwright.request.newContext({
        baseURL: process.env.BASE_URL_SWAGGER,
        extraHTTPHeaders: {
            'Accept': 'application/json',
            //'Authorization': process.env.API_KEY_SWAGGER!,
        },
    });
});

test.afterAll(async ({}) => {
    //dispone all responses.
    await apiContext.dispose();
})

test(
    'check that a new pet has been created', 
    { tag: ['@swagger'] },
    async({}) => {

    pet_object.id   = 1;
    pet_object.name = "TinTin"

    const response  = await apiContext.post(
        "/v2/pet",
        { 
            data: pet_object 
        }
    );        
    var jsonData = await response.json();

    expect(jsonData.status).toBe("available");

    console.log(
        "Id del perro:",
        jsonData.id,
        "nombre del perro:",
        jsonData.name
    )
    
    expect(response, "Response code is not within 200-299 range").toBeOK();
});