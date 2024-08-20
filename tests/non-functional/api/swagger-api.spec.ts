import { expect, test } from '@playwright/test'
// Import dotenv
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

test.describe('Execute a group of tests', () => {
    test.describe.configure({ mode: 'serial' });

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
            "Id:",
            jsonData.id,
            "pet name:",
            jsonData.name
        )
        
        expect(response, "Response code is not within 200-299 range").toBeOK();
    });

    test(
        'validate that a pet register is returned',
        { tag: ['@swagger']},
        async({}) => {

        var id_pet= pet_object.id;

        const response = await apiContext.get(
            `/v2/pet/${id_pet}`,
        );
        var jsonData = await response.json();
        expect(jsonData.id).toBe(pet_object.id)
        
        expect(response, "Response code is not within 200-299 range").toBeOK();

    });

    test('verify that an existing pet can be updated', 
        { tag: ['@swagger']},
        async({}) => {

            pet_object.name= 'Haruka'

            const response= await apiContext.put(
                '/v2/pet',
                {
                    data: pet_object
                }
            );

            var jsonData= await response.json();
            console.log('New name of pet is: ' + jsonData.name);
            expect(response, '').toBeOK();

    });
});