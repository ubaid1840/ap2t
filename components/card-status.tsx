import { ReactNode } from "react";

const typeClasses = {
  success: "bg-success-bg text-success-text border-success-text/32",
  warning: "bg-warning-bg text-warning-text border-warning-text/32",
  danger: "bg-danger-bg text-danger-text border-danger-text/32",
  info: "bg-info-bg text-info-text border-info-text/32",
  active: "bg-active-bg text-active-text border-active-text/32",
  other: "bg-other-bg text-other-text border-other-text/32",
  ghost: "bg-ghost-bg text-ghost-text border-ghost-text/32",
  alternative: "bg-alternative-bg text-alternative-text border-alternative-text/32",
}

interface CardStatusProps {
    value: number | string;
    type?: keyof typeof typeClasses
    icon?: null | ReactNode
    className ?: string
}

const CardStatus = ({ value, type = "success", icon = null, className="" }: CardStatusProps) => {
  
   

    return (
        <div
            className={`px-2 py-1 justify-center rounded-full flex items-center gap-2 ${typeClasses[type]} ${className}`}
        >
            {icon && icon}
            <p className="text-xs leading-none">
                {value}
            </p>
        </div>
    );
};

export default CardStatus