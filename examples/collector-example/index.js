import {
    mockAccount,
    mockDataServicesExtension,
    mockExperiencePlatformConnectorExtenion,
    mockExtension,
    mockOrder,
    mockPage,
    mockProduct,
    mockRecommendations,
    mockRecommendationsExtension,
    mockSearchExtension,
    mockSearchInput,
    mockSearchResults,
    mockShopper,
    mockShoppingCart,
    mockStorefront,
} from "../../packages/storefront-events-collector/tests/utils/mocks";

window.adobeDataLayer.push(
    {
        accountContext: mockAccount,
    },
    {
        magentoExtensionContext: mockExtension,
    },
    {
        dataServicesExtensionContext: mockDataServicesExtension,
    },
    {
        experiencePlatformConnectorExtensionContext: mockExperiencePlatformConnectorExtenion,
    },
    {
        recommendationsExtensionContext: mockRecommendationsExtension,
    },
    {
        searchExtensionContext: mockSearchExtension,
    },
    {
        orderContext: mockOrder,
    },
    {
        pageContext: mockPage,
    },
    {
        productContext: mockProduct,
    },
    {
        recommendationsContext: mockRecommendations,
    },
    {
        searchInputContext: mockSearchInput,
    },
    {
        searchResultsContext: mockSearchResults,
    },
    {
        shopperContext: mockShopper,
    },
    {
        shoppingCartContext: mockShoppingCart,
    },
    {
        storefrontInstanceContext: mockStorefront,
    },
);

/* beacon/experience platform specific code below*/
console.debug("try to push to it");
window.adobeDataLayer.push(
    {
        aepContext: {
            imsOrgId: "DEDB2A52641B1D460A495F8E@AdobeOrg",
            datastreamId: "869fcdfe-abda-4bd5-b948-d9c1595c42e9", // ani commerce
        },
    },
    {
        eventForwardingContext: {
            commerce: true,
            aep: true,
        },
    },
);
/* end beacon */
