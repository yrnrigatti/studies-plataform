import * as React from "react";

export interface CardProps {
    children: React.ReactNode;
    title?: string;
}

export function Card({ children, title }: CardProps): JSX.Element {
    return (
        <div className="border rounded-lg p-4 shadow-sm">
            {title ? <h3 className="text-lg font-semibold mb-2">{title}</h3> : null}
            <div>{children}</div>
        </div>
    );
}
