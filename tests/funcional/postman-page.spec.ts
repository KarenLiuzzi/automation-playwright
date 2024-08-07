import { test, expect } from '@playwright/test'
import { PostmanPage } from './pages/PostmanPage'
import { MediumPage } from './pages/MediumPage'

test('Verify that the postman page has title', 
    {
        tag: ['@regression' , '@ui'],
    },
    async ({page}) => {

        await page.goto(PostmanPage.url);
        await expect(page).toHaveTitle(/Automated API Testing/);
    
    }   
);


test(
    'Verify that the learn more button redirects to medium.com', 
    { tag: ['@regression', '@ui'], },
    async ({page}) => {

        await page.goto(PostmanPage.url);
        await page.locator(PostmanPage.learnMoreBtn).click();
        const mediumPage =  await page.context().waitForEvent('page');
        await expect(mediumPage.locator(MediumPage.title)).toBeVisible();

    }
);