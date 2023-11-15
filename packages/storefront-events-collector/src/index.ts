/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable no-console */
import { createInstance } from "@adobe/alloy";
import { configure, setConsent, setExistingAlloy } from "./alloy";
import { subscribeToEvents } from "./events";
import { configureSnowplow } from "./snowplow";

/**
 * this is the script added to an external build if a user is adding a custom name
 * see https://experienceleague.adobe.com/docs/experience-platform/edge/fundamentals/installing-the-sdk.html?lang=en
 */
const addCustomNameToAlloyNamespace = (customName: string) =>
    (function (n, o) {
        ``;
        o.forEach(function (o) {
            // @ts-ignore
            n[o] ||
                ((n.__alloyNS = n.__alloyNS || []).push(o),
                // @ts-ignore
                (n[o] = function () {
                    // eslint-disable-next-line prefer-rest-params
                    const u = arguments;
                    return new Promise(function (i, l) {
                        // @ts-ignore
                        n[o].q.push([i, l, u]);
                    });
                }),
                // @ts-ignore
                (n[o].q = []));
        });
    })(window, [customName]);

/** initialize alloy if aep context set up right */
const initializeAlloy = async (aepContext: any) => {
    try {
        const { webSdkName, datastreamId, imsOrgId } = aepContext;

        // if a client has provided a webSdkName, we assume that they have another alloy instance
        if (webSdkName) {
            // the launch script injected into the page already configures alloy
            setExistingAlloy(webSdkName);
        } else {
            if (!datastreamId || !imsOrgId) {
                return;
            }

            const name = "alloy";
            // if we don't add the name to the namespace,
            // we get a error saying window[data.instance] doesn't exist
            addCustomNameToAlloyNamespace(name);

            const instance = await configure(createInstance({ name }));

            // assign alloy back to the window
            window.alloy = instance;
        }

        // start polling every second to look for changes
        const consentInterval = setInterval(async () => {
            try {
                await setConsent();
            } catch {
                clearInterval(consentInterval);
                console.warn("Alloy consent could not be set.");
            }
        }, 1000);
    } catch (error) {
        console.warn("Alloy could not be configured.");
    }
};

const initialize = async () => {
    const context = window.adobeDataLayer.getState();
    const { commerce, aep } = context?.eventForwardingContext;
    const { datastreamId, imsOrgId } = context?.aepContext;

    const sendToSnowplow = commerce === false ? false : true;
    const sendToAEP = aep && datastreamId && imsOrgId ? true : false;

    if (sendToSnowplow) {
        configureSnowplow({
            appId: "magento-storefront-event-collector",
            collectorUrl: SNOWPLOW_COLLECTOR_URL,
            collectorPath: SNOWPLOW_COLLECTOR_PATH,
        });
    }

    if (sendToAEP) {
        await initializeAlloy(context?.aepContext);
    }

    subscribeToEvents(sendToSnowplow, sendToAEP);
};

window.adobeDataLayer.push((dl: any) => {
    dl.addEventListener("adobeDataLayer:change", initialize, { path: "eventForwardingContext" });
    dl.addEventListener("adobeDataLayer:change", initialize, { path: "aepContext" });
});

export * from "./events";
export * from "./snowplow";
