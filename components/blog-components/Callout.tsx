import { AlertTriangle, Info, XCircle } from "lucide-react";
import React from "react";

interface CalloutProps {
	heading?: React.ReactNode;
	type?: "info" | "warn" | "error";
	className?: string;
	children?: React.ReactNode;
}

export const CustomCallout = React.forwardRef<HTMLDivElement, CalloutProps>(
	({ type = "info", heading, children, className }, ref) => {
		const icons = {
			info: <Info className="w-4 h-4" />,
			warn: <AlertTriangle className="w-4 h-4" />,
			error: <XCircle className="w-4 h-4" />,
		};

		const typeStyles = {
			info: "bg-blue-50/70 border-blue-200",
			warn: "bg-yellow-50/70 border-yellow-200",
			error: "bg-red-50/70 border-red-200",
		}[type];

		return (
			<div
				ref={ref}
				className={`p-3 my-4 border-l-4 rounded-lg ${typeStyles} ${className || ""}`}
			>
				<div className="flex items-start gap-2">
					<div className="shrink-0 mt-0.5">{icons[type]}</div>
					<div className="flex-1">
						{heading && <div className="font-semibold mb-1">{heading}</div>}
						<div className="text-gray-700 text-sm">{children}</div>
					</div>
				</div>
			</div>
		);
	},
);

CustomCallout.displayName = "CustomCallout";
