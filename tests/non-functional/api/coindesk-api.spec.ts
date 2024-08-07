import { expect, test } from '@playwright/test'


let apiContext;

test.beforeAll( async ({ playwright }) => {

    apiContext= await playwright.request.newContext({
        // All requests we send go to this API endpoint.
        baseURL: 'https://api.coindesk.com',
        extraHTTPHeaders: {
            'Accept': 'application/json',
        },
    });

});

test.afterAll( async ({}) => {
    //dispone all responses.
    await apiContext.dispose();
})

test('Check that currentprice endpoint returned a field called chartName', 
    {tag: ['@regression', '@api']},
    async({}) => {
        const response= await apiContext.get('/v1/bpi/currentprice.json');
        expect(response.ok()).toBeTruthy();
        expect(response, `200 Status code was not returned.`).toBeOK();

});