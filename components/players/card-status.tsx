import { CircleCheckBig, CircleX, Info, TrendingDown, TrendingUp } from "lucide-react"

interface CardStatusProps {
  value: number;
}

const CardStatus = ({ value }: CardStatusProps) => {
  // Determine colors based on value type
  let bgColor = "#FB2C3633";
  let txtColor = "#FF6467";
  let Icon = Info; // Default icon

  
    // Number logic
    if (value > 90) {
      bgColor = "#16A34A52";
      txtColor = "#22C55E";
      Icon = TrendingUp
    } else if (value >= 80 && value <= 90) {
      bgColor = "#EA580C52";
      txtColor = "#F97316";
    } else {
      bgColor = "#DC262652";
      txtColor = "#EF4444";
      Icon = TrendingDown
    }
  

  return (
    <div
      className="w-25 py-1 justify-center rounded-full flex items-center gap-2"
      style={{ backgroundColor: bgColor }}
    >
      <Icon size={14} className="text-current" style={{ color: txtColor }} />
      <div style={{ color: txtColor }} className="text-xs">
        {value}
      </div>
    </div>
  );
};

export default CardStatus