//-----------------------------------------------------------------------
// <copyright company="Microsoft Corporation">
//        Copyright (c) Microsoft Corporation.  All rights reserved.
//        Licensed under the MIT license. See LICENSE file in the project root for full license information.
// </copyright>
//-----------------------------------------------------------------------

import { RayfinClient } from "@microsoft/rayfin-client";

let _client: RayfinClient | undefined;

/**
 * Returns the pre-configured RayfinClient singleton.
 */
export function getRayfinClient(): RayfinClient | null {
    if (_client) return _client;

    const apiUrl = import.meta.env.VITE_RAYFIN_API_URL;
    const publishableKey = import.meta.env.VITE_RAYFIN_PUBLISHABLE_KEY;

    if (!apiUrl || !publishableKey) {
        /* 独立运行（GitHub Pages / preview）无 Rayfin env 时返回 null，
           由 bootstrapAuth 容错放行，不阻断 App 渲染公开报表。 */
        return null;
    }

    _client = new RayfinClient({
        baseUrl: apiUrl,
        publishableKey,
        authStorage: true,
        useProxy: false,
    });

    return _client;
}