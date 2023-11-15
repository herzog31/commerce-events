import { AEP } from "@adobe/magento-storefront-events-sdk/dist/types/types/schemas";

import { AEPContext } from "../types/contexts";

const createContext = (aep?: AEP): AEPContext => {
    const aepCtx = aep ?? window.adobeDataLayer.getState("aepContext");

    if (!aepCtx) {
        return {};
    }

    const context: AEPContext = {
        imsOrgId: aepCtx.imsOrgId,
        datastreamId: aepCtx.datastreamId,
        edgeDomain: aepCtx.edgeDomain,
        webSdkName: aepCtx.webSdkName,
    };

    return context;
};

export default createContext;
