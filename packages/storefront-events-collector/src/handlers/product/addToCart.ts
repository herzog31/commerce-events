import { Event } from "@adobe/magento-storefront-events-sdk/dist/types/types/events";
import { SelfDescribingJson, trackStructEvent } from "@snowplow/browser-tracker";
import { createProductFromCartItem } from "../../utils/product";
import { createProductCtx, createShoppingCartCtx } from "../../contexts";

const handler = (event: Event, context: any): void => {
    // Context is only available in ACDL2,
    // With MSE, use event.eventInfo
    // With ACDL1 only, fallback to getState
    const { changedProductsContext, pageContext, productContext, shoppingCartContext } =
        context || event.eventInfo || window.adobeDataLayer.getState();

    const cartItems = changedProductsContext?.items || shoppingCartContext?.items || [];
    cartItems?.forEach((item: any) => {
        let productCtx;
        if (item.product.sku === productContext.sku) {
            productCtx = createProductCtx(productContext);
        } else {
            productCtx = createProductFromCartItem(item);
        }
        const shoppingCartCtx = createShoppingCartCtx(shoppingCartContext);

        const eventContext: Array<SelfDescribingJson> = [productCtx];

        if (shoppingCartCtx) {
            eventContext.push(shoppingCartCtx);
        }

        trackStructEvent({
            category: "product",
            action: "add-to-cart",
            property: pageContext?.pageType,
            context: eventContext,
        });
    });
};

export default handler;
