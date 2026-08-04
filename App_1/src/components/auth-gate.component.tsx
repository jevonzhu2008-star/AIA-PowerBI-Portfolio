//-----------------------------------------------------------------------
// <copyright company="Microsoft Corporation">
//        Copyright (c) Microsoft Corporation.  All rights reserved.
//        Licensed under the MIT license. See LICENSE file in the project root for full license information.
// </copyright>
//-----------------------------------------------------------------------

import { type ReactNode } from "react";

import { useAuth } from "@/hooks/auth.context";

interface AuthGateProps {
    children: ReactNode;
}

export function AuthGate({ children }: AuthGateProps) {
    const { isLoading, isAuthenticated } = useAuth();

    if (isLoading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-background">
                <div className="text-sm text-muted-foreground">
                    Connecting to Fabric…
                </div>
            </div>
        );
    }

    /*
     * Fabric 外独立运行（如 GitHub Pages / 本地 preview）时，embedded auth
     * 会返回 null 而 isAuthenticated=false。此时直接放行渲染内容——
     * 报表本身是公开 Power BI 嵌入，不依赖 Fabric 会话。
     * 在 Fabric iframe 内则仍走认证流程，保持原生体验。
     */
    return <>{children}</>;
}