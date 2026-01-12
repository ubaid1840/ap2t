import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Calendar,
  DollarSign,
  Dot,
  Plus,
  Recycle,
  Tag,
  Users,
} from "lucide-react";

const localData = [
  {
    Icon: <Tag />,
    title: "Active Promotions",
    description: "2",
    type: "success",
    going: "active",
  },
  {
    Icon: <Users />,
    title: "Total Sign-ups",
    description: "99",
    type: "active",
    going: "active",
  },
  {
    Icon: <DollarSign />,
    title: "Total Revenue",
    description: "$23,000",
    type: "warning",
    going: "danger",
  },
  {
    Icon: <Calendar />,
    title: "Upcoming",
    description: "1",
    type: "other",
    going: "active",
  },
];

export default function Page() {
  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="flex justify-between">
        <div className="text-xl font-semibold text-[#F3F4F6]">
          <h1>Promotions Management</h1>
          <p className="text-sm text-[#99A1AF]">
            Create and manage promotional offers - Auto-syncs{" "}
          </p>
        </div>

        <div className="flex gap-4">
          <Button variant={"outline"} className="gap-2">
            <Recycle /> Sync with Square
          </Button>
          <Button className="gap-2">
            <Plus /> Add New Promotion
          </Button>
        </div>
      </div>

      <div className="flex justify-between gap-4 flex-wrap">
        {localData.map((item, index) => (
          <Card
            key={index}
            className="rounded-[10px] bg-[#252525] border-[#3A3A3A] flex-1"
          >
            <CardContent className="space-y-4">
              <div className="flex gap-4 items-center">
                <div
                  className={`rounded-[8px] flex w-10 h-10 items-center justify-center bg-${item.type}-bg text-${item.type}-text`}
                >
                  {item.Icon}
                </div>
                <p className="text-[#B0B0B0]">{item.title}</p>
              </div>
              <div className="flex flex-col gap-1">
                <h1 className="font-semibold text-2xl">{item.description}</h1>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex p-6 justify-between  bg-[#252525] rounded-2xl border border-border">
        <div className="flex gap-4 items-center">
          <p>Filter by status:</p>

          <div className="flex gap-4">
            <Button>All</Button>
            <Button>Active</Button>
            <Button>Upcoming</Button>
            <Button>Archived</Button>
          </div>
        </div>

        <div className="rounded-[10px] bg-info-bg p-2 flex gap-2">
          <Dot className="text-active-text" />
          <h1 className="text-info-text">Live Sync with Square</h1>
        </div>
      </div>

      <div className="grid grid-cols-3">
        {
            Promotions.map((promotion)=>{
                return(
                     <Card>
            <div className="h-48 relative">
                <img src={promotion.image} alt="" />
                <Badge className="bg-active-text text-white absolute top-2 left-2">{promotion.status}</Badge>
                
            </div>

        </Card>)
            })
        }
       
      </div>
    </div>
  );
}

const Promotions=[
    {
        status:"Active",
        liveOn:"Live on Storefront",
        image:"",
        title:"5-Pack Basketball Training",
        description:"Get 5 basketball training sessions at a discounted",
        price:"$200",
        oldPrice:"$250",
        save:"$50",
        startDate:"12/1/2025",
        endDate:"12/31/2025",
        signUps:"24",
        revenue:"$4,800",
    },
        {
        status:"Active",
        liveOn:"Live on Storefront",
        image:"",
        title:"5-Pack Basketball Training",
        description:"Get 5 basketball training sessions at a discounted",
        price:"$200",
        oldPrice:"$250",
        save:"$50",
        startDate:"12/1/2025",
        endDate:"12/31/2025",
        signUps:"24",
        revenue:"$4,800",
    }
]
