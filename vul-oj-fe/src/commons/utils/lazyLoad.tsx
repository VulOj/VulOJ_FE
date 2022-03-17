import { Spin } from "antd"
import { ReactNode, Suspense } from "react"

// 正在加载页面
export function Loading() {

    return (
        <div
            style={{
                width: '100%',
                paddingTop: '200px'
            }}
        >
            <Spin
                size="large"
                style={{
                    width: '100%',
                    textAlign: 'center'
                }}
            />
        </div>
    )
}

export const lazyLoad = (children: ReactNode) => {
    return (
        <Suspense fallback={<Loading />}>
            {children}
        </Suspense>
    )
}