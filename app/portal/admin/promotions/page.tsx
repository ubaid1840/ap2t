"use client";
import AppCalendar from "@/components/app-calendar";
import { AssignCoachDialog } from "@/components/sessions/assign-coach-dialog";
import { TimePicker } from "@/components/time-picker";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/contexts/auth-context";
import axios from "@/lib/axios"
import { joinNames } from "@/lib/functions";
import {
  Archive,
  Calendar,
  DollarSign,
  Edit,
  ExternalLink,
  Eye,
  Image,
  Link,
  MapPin,
  Plus,
  RefreshCcw,
  ShoppingBag,
  Tag,
  TrendingUp,
  Users
} from "lucide-react";
import moment from "moment";
import { ReactNode, useEffect, useState } from "react";
import { GoDotFill } from "react-icons/go";
import { toast } from "sonner";
import NextLink from "next/link";




const allFilters = ["All", "Active", "Upcoming", "Archive"]

type PrmotionsType = {
  id: number;
  name: string;
  description: string;
  status: "Upcoming" | "Active" | "Completed" | "Cancelled" | string;
  session_type: string;
  coach_id: number;
  location: string;
  start_time: string;
  end_time: string;
  time: string;
  date: string;
  end_date: string | null;
  price: string;
  promotion_price: string | null;
  save: number;
  max_players: number;
  apply_promotion: boolean;
  show_storefront: boolean;
  image: string;
  created_at: string;
  coach_first_name: string;
  coach_last_name: string;
  coachName: string;
  payment_statuses: string[];
  store_front: boolean
  participants: {
    user_id: number;
  }[];
  total_participants: number;
  total_revenue: number;
  rawData: any
}

export default function Page() {
  const [filter, setFilter] = useState<
    "All" | "Active" | "Upcoming" | "Archive"
  >("Active");

  const { user } = useAuth()
  const [data, setData] = useState<PrmotionsType[] | []>([])

  useEffect(() => {
    if (user?.id)
      fetchData();
  }, [user]);

  const fetchData = async () => {
    try {
      const result = await axios.get("/admin/sessions?promotion=true");

      if (result.data) {
        const mappedSessions = result.data.map((s: any) => ({
          ...s,
          date: moment(new Date(s.date)).format("YYYY-MM-DD"),
          end_date: moment(new Date(s.end_date)).format("YYYY-MM-DD"),
          time: `${s.start_time} - ${s.end_time}`,
          coachName: joinNames([s.coach_first_name, s.coach_last_name]),
          status: s.status ? s.status.charAt(0).toUpperCase() + s.status.slice(1).toLowerCase() : 'Upcoming',
          total_participants: s?.participants?.length,
          total_revenue: calcualteRevenu(s.payment_statuses),
          save: (Number(s.price || 0) - Number(s.promotion_price || 0)),
          rawData: s
        }));
        setData(mappedSessions);
      }
    } catch (error) {
      console.error("Error fetching sessions", error);
    }
  };

  function calcualteRevenu(paymentData: any[]) {
    const totalRevuew = paymentData.reduce(
      (sum, item) => sum + Number(item.amount || 0),
      0
    );
    return totalRevuew
  }

  function calculateSessionStats(sessions: any[]) {
    return sessions.reduce(
      (acc, session) => {
        if (session.status === "Active") {
          acc.total_active += 1;
        }

        if (session.status === "Upcoming") {
          acc.total_upcoming += 1;
        }

        acc.total_participants += Number(session.total_participants || 0);
        acc.total_revenue += Number(session.total_revenue || 0);

        return acc;
      },
      {
        total_active: 0,
        total_participants: 0,
        total_revenue: 0,
        total_upcoming: 0
      }
    );
  }

  const stats = calculateSessionStats(data);

  const localData = [
    {
      Icon: <Tag />,
      title: "Active Promotions",
      description: stats.total_active,
      type: "active",
      going: "active",
    },
    {
      Icon: <Users />,
      title: "Total Sign-ups",
      description: stats.total_participants,
      type: "info",
      going: "active",
    },
    {
      Icon: <DollarSign />,
      title: "Total Revenue",
      description: `$${stats.total_revenue}`,
      type: "success",
      going: "danger",
    },
    {
      Icon: <Calendar />,
      title: "Upcoming",
      description: stats.total_upcoming,
      type: "other",
      going: "active",
    },
  ];




  return (
    <div className="flex flex-col w-full gap-4">
      <Header>
        <div className="flex flex-wrap gap-4">
          {/* <Button variant={"outline"} className="gap-2 text-sm">
            <RefreshCcw /> Sync with Square
          </Button> */}

          <AddNewPromotion />
        </div>
      </Header>



      <div className="flex justify-between gap-4 flex-wrap">
        {localData.map((item: any, index) => (
          <Card
            key={index}
            className="rounded-[10px] bg-[#252525] border-[#3A3A3A] flex-1"
          >
            <CardContent className="space-y-2">
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



      <Card className="p-0">
        <CardContent className="flex justify-between gap-4 flex-wrap items-center p-4">
          <div className="flex gap-4 flex-wrap items-center">
            <p className="text-muted-foreground">Filter by status:</p>

            <div className="flex gap-4">
              {allFilters.map((item) => (
                <Button
                  key={item}
                  variant={filter === item ? "default" : "outline"}
                  size="sm"
                  className={
                    filter === item
                      ? "font-medium"
                      : "font-normal text-muted-foreground border-muted-foreground"
                  }
                  onClick={() => setFilter(item as typeof filter)}
                >
                  {item}
                </Button>
              ))}
            </div>
          </div>

          <div className="rounded-lg border border-info-text/32 bg-info-bg p-2 flex items-center gap-2">
            <GoDotFill className="text-active-text" />
            <h1 className="text-info-text">Live Sync with Square</h1>
          </div>
        </CardContent>
      </Card>



      <div className="flex flex-wrap gap-4">
        {data.map((item, i) => (
          <Card key={i} className="w-full sm:w-[380px] p-0 overflow-hidden">
            <div className="relative">
              <img
                src={item.image}
                alt="Basketball Training"

                className="w-full object-cover"
              />


              <Badge className="absolute top-3 left-3 bg-active-text text-white font-normal">
                {item.status}
              </Badge>

              {item?.show_storefront &&

                <Badge className="absolute top-3 right-3  text-black flex gap-1 ">
                  <ShoppingBag className="h-3 w-3" /> Live on Storefront
                </Badge>
              }
            </div>
            <CardContent className="px-4 space-y-4">

              <div className="space-y-1">
                <h3 className="text-lg font-semibold text-white">
                  {item.name}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {item.description}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <DollarSign size={16} className="text-success-text" />
                <span className="text-xl font-semibold">{item.promotion_price}</span>
                <span className="text-sm line-through text-muted-foreground">{item.price}</span>
                <Badge className="bg-active-bg text-active-text rounded-md">Save ${item.save}</Badge>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1 bg-[#1A1A1A] border border-border rounded-xl p-3">

                  <div className="flex gap-2 items-center">
                    <Calendar size={12} className="text-muted-foreground" />
                    <div className="text-xs text-muted-foreground">Start Date</div>

                  </div>
                  <div className="text-sm text-white">{item.date}</div>
                </div>



                <div className="space-y-1 bg-[#1A1A1A] border border-border rounded-xl p-3">

                  <div className="flex gap-2 items-center">
                    <Calendar size={12} className="text-muted-foreground" />
                    <div className="text-xs text-muted-foreground">End Date</div>

                  </div>
                  <div className="text-sm text-white">{item.end_date}</div>
                </div>

              </div>

              <div className="grid grid-cols-2 gap-2">

                <div className="space-y-1 bg-[#1A1A1A] border border-border rounded-xl p-3">

                  <div className="flex gap-2 items-center">
                    <Users size={12} className="text-muted-foreground" />
                    <div className="text-xs text-muted-foreground">Sign-ups</div>

                  </div>
                  <div className="text-sm text-white">{item?.total_participants}</div>
                </div>



                <div className="space-y-1 bg-[#1A1A1A] border border-border rounded-xl p-3">

                  <div className="flex gap-2 items-center">
                    <TrendingUp size={12} className="text-muted-foreground" />
                    <div className="text-xs text-muted-foreground">Revenue</div>

                  </div>
                  <div className="text-sm text-white">{item.total_revenue}</div>
                </div>
              </div>


              {/* <div className="flex items-center justify-between bg-info-bg border border-info-text/32 rounded-lg px-3 h-12">
                <div className="flex items-center gap-2">
                  <ExternalLink size={16} className="text-info-text" />
                  <span className="text-info-text text-sm">Square Checkout</span>
                </div>

                <Button size="sm" variant="link" className="text-info-text">
                  View Link
                </Button>
              </div> */}

              <div className="flex items-center justify-between bg-success-bg border border-success-text/32 rounded-lg px-3 h-12 text-success-text text-sm">
                <div className="flex items-center gap-2">
                  <ShoppingBag size={16} />
                  <span >{item?.store_front ? "Visible" : "Not visible"} on Storefront</span>
                </div>
                <span>Users can signup</span>
              </div>

              <Separator />



              <div className="flex gap-2 mb-4">
                <NextLink href={`/portal/admin/promotions/${item.id}`}>
                  <Button variant="outline" >
                    <Users /> View Participants
                  </Button>
                </NextLink>
                <EditPromotion
                  sessionId={item.id}
                  sessionData={item.rawData}
                  onSuccess={async () => await fetchData()} />
                <Button variant="ghost" className="bg-warning-bg text-warning-text border border-warning-text/32"><Archive /></Button>
              </div>


            </CardContent>

          </Card>
        ))}
      </div>
    </div>
  );
}

const AddNewPromotion = () => {

  const [open, setOpen] = useState(false)

  const [addPromotion, setAddPromotion] = useState({
    promotionTitle: "",
    description: "",
    imageUrl: "",
    promotionPrice: "",
    originalPrice: "",
    startDate: "",
    endDate: "",
    sqrCheckOutUrl: "",
    showOnStoreFront: false,
  });

  const createPromotion = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const result = axios.post("/admin/promotions", {
        title: addPromotion.promotionTitle,
        description: addPromotion.description,
        image: addPromotion.imageUrl,
        original_price: addPromotion.originalPrice,
        promotion_price: addPromotion.promotionPrice,
        start_date: addPromotion.startDate,
        end_date: addPromotion.endDate,
        square_check_url: addPromotion.sqrCheckOutUrl,
        show_storefront: addPromotion.showOnStoreFront
      })
      console.log("promotion created:");
    } catch (error) {
      console.log(error)
    }



  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setAddPromotion((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleCheckboxChange = (checked: boolean) => {
    setAddPromotion((prev) => ({
      ...prev,
      showOnStoreFront: checked,
    }));
  };

  return (
    <>
      <Button onClick={() => setOpen(!open)} className="gap-2 text-sm">
        <Plus /> Add New Promotion
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>


        <DialogContent className="bg-[#252525] border border-[#3A3A3A] sm:max-w-4xl p-0">
          <DialogHeader className="border-b border-[#3A3A3A] p-4">
            <DialogTitle className="text-[#F3F4F6] font-semibold text-lg">
              Add New Promotion
            </DialogTitle>
            <p className="text-[#99A1AF]">
              Auto-syncs with Square and appears on online store
            </p>
          </DialogHeader>
          <form onSubmit={createPromotion} className="">
            <ScrollArea className="h-[70dvh] pb-2">
              <div className="space-y-4 px-4 text-sm text-muted-foreground"
              >
                <div className="flex gap-2 items-center text-md ">
                  <Tag className="text-primary" size={16} />
                  <h1 className="text-[#F3F4F6] ">
                    Promotion Details
                  </h1>
                </div>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <Label >
                    Promotion Title *
                  </Label>
                  <Input
                    name="promotionTitle"
                    placeholder="e.g., 5-Pack Basketball Training"
                    className="!bg-[#1A1A1A] !border-[#3A3A3A] !text-[#E5E7EB] !p-5"
                    required
                    value={addPromotion.promotionTitle}
                    onChange={(e) => handleChange(e)}
                  />
                </div>

                <div className="space-y-2">
                  <Label >
                    Description *
                  </Label>
                  <Textarea

                    name="description"
                    placeholder="Describe the promotion offer and what's included..."
                    className="!bg-[#1A1A1A] !border-[#3A3A3A] !text-[#E5E7EB] h-30"
                    required
                    value={addPromotion.description}
                    onChange={(e) => handleChange(e)}
                  />
                </div>

                <div className="flex gap-2 text-md items-center">
                  <Image className="text-primary" size={16} />
                  <h1 className="text-[#F3F4F6]">
                    Promotional Flyer
                  </h1>
                </div>

                <div className="space-y-2">
                  <Label >
                    Image URL *
                  </Label>
                  <Input
                    name="imageUrl"
                    placeholder="https://example.com/image.jpg"
                    className="!bg-[#1A1A1A] !border-[#3A3A3A] !text-[#E5E7EB] !p-5"
                    required
                    value={addPromotion.imageUrl}
                    onChange={(e) => handleChange(e)}
                  />
                </div>

                {/* preview */}
                <div className="bg-[#1A1A1A] border border-border rounded-[10px] p-4 space-y-2">
                  <h1 className="text-[#99A1AF]">Preview:</h1>

                  {addPromotion.imageUrl ?
                    <img
                      src={addPromotion.imageUrl}
                      className="w-full h-50 object-contain"
                    />
                    :
                    <div className="w-full h-50" />

                  }
                </div>

                <div className="flex gap-2 text-md items-center">
                  <DollarSign className="text-primary" size={16} />
                  <h1 className="text-[#F3F4F6]">Price</h1>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label >
                      Promotion Price *
                    </Label>
                    <Input
                      name="promotionPrice"
                      placeholder="200.00"
                      className="!bg-[#1A1A1A] !border-[#3A3A3A] !text-[#E5E7EB] !p-5"
                      required
                      value={addPromotion.promotionPrice}
                      onChange={(e) => {
                        if (!Number.isNaN(Number(e.target.value))) {
                          handleChange(e)
                        }
                      }}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>
                      Original Price (Optional)
                    </Label>
                    <Input
                      name="originalPrice"
                      placeholder="250.00"
                      className="!bg-[#1A1A1A] !border-[#3A3A3A] !text-[#E5E7EB] !p-5"
                      value={addPromotion.originalPrice}
                      onChange={(e) => {
                        if (!Number.isNaN(Number(e.target.value))) {
                          handleChange(e)
                        }
                      }}
                    />
                  </div>
                </div>

                <div className="flex gap-2 text-md items-center">
                  <Calendar className="text-primary" size={16} />
                  <h1 className="text-[#F3F4F6]">
                    Promotion Duration
                  </h1>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label >
                      Start Date *
                    </Label>
                    <AppCalendar className="h-11" date={addPromotion.startDate ? new Date(addPromotion.startDate) : undefined} onChange={(date) => setAddPromotion((prevState) => ({ ...prevState, startDate: date }))} />


                  </div>
                  <div className="space-y-2">
                    <Label >
                      End Date *
                    </Label>
                    <AppCalendar className="h-11" date={addPromotion.endDate ? new Date(addPromotion.endDate) : undefined} onChange={(date) => setAddPromotion((prevState) => ({ ...prevState, endDate: date }))} />
                  </div>
                </div>

                <div className="flex gap-2 text-md items-center">
                  <Link className="text-primary" size={16} />
                  <h1 className="text-[#F3F4F6]">Square Checkout</h1>
                </div>

                <div className="space-y-2">
                  <Label >
                    Square Checkout URL *
                  </Label>
                  <Input
                    name="sqrCheckOutUrl"
                    placeholder="https://square.link/u/promotion-name"
                    className="!bg-[#1A1A1A] !border-[#3A3A3A] !text-[#E5E7EB] !p-5"
                    required
                    value={addPromotion.sqrCheckOutUrl}
                    onChange={(e) => handleChange(e)}
                  />
                </div>

                <div className="flex gap-2 text-md items-center">
                  <Eye className="text-primary" size={16} />
                  <h1 className="text-[#F3F4F6]">Storefront Display</h1>
                </div>

                <div className="flex items-center gap-4 px-8 bg-[#1A1A1A] border border-[#3A3A3A] rounded-[10px] p-2">
                  <Checkbox
                    name="displayOnWebsite"
                    checked={addPromotion.showOnStoreFront}
                    onCheckedChange={handleCheckboxChange}
                  />
                  <div className="space-y-0">
                    <h1 className="text-[#D1D5DC]">
                      Show on Online Storefront
                    </h1>
                    <p className="text-sm text-[#6A7282]">
                      Display promotional card with image, title, price
                    </p>
                  </div>
                </div>
              </div>
            </ScrollArea>
            <div className="p-2 space-y-1 border-t border-[#3A3A3A]">
              <div className="flex gap-4">
                <DialogClose className="text-[13px] font-medium leading-none h-10 px-4 py-2 bg-black text-white border-border rounded-md hover:opacity-70 cursor-pointer flex flex-1 items-center justify-center">
                  Cancel
                </DialogClose>
                <Button className="flex-1 text-[13px]" size={"lg"}
                >
                  Create Promotion & Sync to Square
                </Button>
              </div>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>

  )
}

const EditPromotion = ({ sessionId, sessionData, onSuccess }: { sessionId: number, sessionData: any, onSuccess: () => Promise<void> }) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [session, setSession] = useState<any>({
    name: "",
    description: "",
    session_type: "",
    coach_id: null,
    location: "",
    date: "",
    start_time: "",
    end_time: "",
    price: 0,
    max_players: 0,
    apply_promotion: false,
    promotion_price: 0,
    image: "",
    end_date: "",
    coach_name: ""
  });

  useEffect(() => {
    if (open && sessionData) {
      setSession({
        name: sessionData.name,
        description: sessionData.description,
        session_type: sessionData.session_type,
        coach_id: sessionData.coach_id,
        location: sessionData.location,
        date: sessionData.date,
        start_time: sessionData.start_time,
        end_time: sessionData.end_time,
        price: Number(sessionData.price),
        max_players: sessionData.max_players,
        apply_promotion: sessionData.apply_promotion,
        promotion_price: Number(sessionData.promotion_price),
        image: sessionData.image,
        end_date: sessionData.end_date,
        coach_name: `${sessionData?.coach_first_name} ${sessionData?.coach_last_name}`,
        show_storefront: sessionData.show_storefront
      });
    }
  }, [open, sessionData]);

  const editSession = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!sessionId) {
      toast.error("Session ID is required");
      return;
    }
    setLoading(true);
    const { coach_name, ...finalData } = session
    try {
      await axios.put(
        `/admin/sessions`,
        { ...finalData, id: sessionId },
      );

      toast.success("Session updated successfully");
      setOpen(false);

      if (onSuccess) {
        onSuccess();
      }
    } finally {
      setLoading(false);
    }
  };



  return (
    <>

      <Button onClick={() => setOpen(!open)} variant="outline"><Edit /></Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="bg-[#252525] border border-[#3A3A3A] sm:max-w-4xl p-0 gap-0">
          <DialogHeader className="border-b border-[#3A3A3A] p-4">
            <DialogTitle className="text-[#F3F4F6] font-semibold text-lg">
              Edit Promotion
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={editSession}>
            <ScrollArea className=" py-1 space-y-4 px-2 h-[70vh]">
              <div className="space-y-2 px-2 pb-2">
                <div className="flex gap-2 text-md ">
                  <Tag className="text-primary w-4 w-4" />
                  <h1 className="text-[#F3F4F6]">Basic Information</h1>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm text-muted-foreground">
                    Session Name *
                  </Label>
                  <Input
                    name="sessionName"
                    placeholder="e.g., Advanced Skills Training"

                    required
                    value={session.name}
                    onChange={(e) =>
                      setSession((prev: any) => ({
                        ...prev,
                        name: e.target.value,
                      }))
                    }
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <div className="space-y-2">
                    <Label className="text-sm text-muted-foreground">
                      Session Type *
                    </Label>
                    <Input
                      name="sessionType"

                      required
                      value={session.session_type}
                      onChange={(e) =>
                        setSession((prev: any) => ({
                          ...prev,
                          session_type: e.target.value,
                        }))
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm text-muted-foreground">
                      Assigned Coach *
                    </Label>

                    <div className="flex gap-4">
                      {session.coach_id && (
                        <p className="mt-1 text-sm text-ghost-text">
                          Selected Coach: {session.coach_name}
                        </p>
                      )}
                      <AssignCoachDialog
                        onSelect={(coach) =>
                          setSession((prev: any) => ({
                            ...prev,
                            coach_id: coach.id,
                            coach_name: `${coach.first_name} ${coach.last_name}`,
                          }))
                        }
                      />

                    </div>



                  </div>

                </div>

                <div className="flex gap-2 text-md ">
                  <Calendar className="text-primary w-4 w-4" />
                  <h1 className="text-[#F3F4F6]">Schedule</h1>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">

                  <div className="space-y-2">
                    <Label className="text-sm text-muted-foreground">
                      Start Date *
                    </Label>
                    <AppCalendar
                      className="h-9"
                      date={session.date ? new Date(session.date) : undefined}
                      onChange={(date) =>
                        setSession((prevState: any) => ({
                          ...prevState,
                          date: date,
                        }))
                      }
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm text-muted-foreground">
                      End Date *
                    </Label>
                    <AppCalendar
                      className="h-9"
                      date={session.end_date ? new Date(session.date) : undefined}
                      onChange={(date) =>
                        setSession((prevState: any) => ({
                          ...prevState,
                          end_date: date,
                        }))
                      }
                      required
                    />
                  </div>


                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">

                  <div className="space-y-2">
                    <Label className="text-sm text-muted-foreground">
                      Start Time *
                    </Label>
                    <TimePicker
                      className="h-9"
                      value={session.start_time}
                      onChange={(time) =>
                        setSession((prev: any) => ({
                          ...prev,
                          start_time: time,
                        }))
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm text-muted-foreground">
                      End Time *
                    </Label>

                    <TimePicker
                      className="h-9"
                      value={session.end_time}
                      onChange={(time) =>
                        setSession((prev: any) => ({
                          ...prev,
                          end_time: time,
                        }))
                      }
                    />
                  </div>
                </div>

                <div className="flex gap-2 text-md ">
                  <MapPin className="text-primary w-4 w-4" />
                  <h1 className="text-[#F3F4F6]">Location & Pricing</h1>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <div className="space-y-2">
                    <Label className="text-sm text-muted-foreground">
                      Location *
                    </Label>
                    <Input
                      name="location"

                      required
                      value={session.location}
                      onChange={(e) =>
                        setSession((prev: any) => ({
                          ...prev,
                          location: e.target.value,
                        }))
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm text-muted-foreground">
                      Price (USD) *
                    </Label>
                    <Input
                      name="price"
                      placeholder="$0.00"
                      required
                      value={session.price}
                      onChange={(e) => {
                        if (!e.target.value) {
                          setSession((prev: any) => ({
                            ...prev,
                            price: e.target.value,
                          }))
                        } else {
                          if (!Number.isNaN(Number(e.target.value))) {
                            setSession((prev: any) => ({
                              ...prev,
                              price: Number(e.target.value),
                            }))

                          }
                        }

                      }}
                    />
                  </div>
                </div>

                <div className="flex gap-2 text-md ">
                  <Users className="text-primary w-4 w-4" />
                  <h1 className="text-[#F3F4F6]">Capacity & Promotions</h1>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <div className="space-y-2">
                    <Label className="text-sm text-muted-foreground">
                      Max Players *
                    </Label>
                    <Input
                      name="maxPlayer"
                      placeholder="e.g. 12"
                      required
                      value={session.max_players}
                      onChange={(e) => {
                        if (!e.target.value) {
                          setSession((prev: any) => ({
                            ...prev,
                            max_players: e.target.value,
                          }))
                        } else {
                          if (!Number.isNaN(Number(e.target.value))) {
                            setSession((prev: any) => ({
                              ...prev,
                              max_players: Number(e.target.value),
                            }))

                          }
                        }

                      }}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm text-muted-foreground">
                      Apply Promotion (Optional)
                    </Label>

                    <Select
                      value={String(session.apply_promotion)}
                      onValueChange={(value) =>
                        setSession((prev: any) => ({
                          ...prev,
                          apply_promotion: value === "true",
                        }))
                      }
                    >
                      <SelectTrigger className="w-full dark:bg-[#1A1A1A] rounded-sm">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>

                      <SelectContent className="!bg-[#1A1A1A]">
                        <SelectGroup>
                          <SelectLabel>Select</SelectLabel>
                          <SelectItem value="true">Yes</SelectItem>
                          <SelectItem value="false">No</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {session?.apply_promotion &&
                  <>
                    <div className="space-y-2">
                      <Label className="text-sm text-muted-foreground">
                        Image URL *
                      </Label>
                      <Input
                        name="imageUrl"
                        placeholder="https://example.com/image.jpg"
                        required
                        value={session?.image}
                        onChange={(e) => {
                          setSession((prev: any) => ({
                            ...prev,
                            image: e.target.value,
                          }))
                        }}
                      />
                    </div>

                    {/* preview */}
                    <div className="bg-[#1A1A1A] border border-border rounded-[10px] p-4 space-y-2">
                      <h1 className="text-[#99A1AF]">Preview:</h1>

                      {session.image ?
                        <img
                          src={session.image}
                          className="w-full h-50 object-contain"
                        />
                        :
                        <div className="w-full h-50" />

                      }
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label className="text-sm text-muted-foreground">
                          Promotion Price *
                        </Label>
                        <Input
                          name="promotionPrice"
                          placeholder="$200"

                          required
                          value={session?.promotion_price}
                          onChange={(e) => {
                            if (!e.target.value) {
                              setSession((prev: any) => ({
                                ...prev,
                                promotion_price: e.target.value,
                              }))
                            } else {
                              if (!Number.isNaN(Number(e.target.value))) {
                                setSession((prev: any) => ({
                                  ...prev,
                                  promotion_price: Number(e.target.value),
                                }))

                              }
                            }

                          }}
                        />
                      </div>
                    </div>
                  </>}


                <div className="space-y-2">
                  <Label className="text-sm text-muted-foreground">
                    Description *
                  </Label>
                  <Textarea
                    name="description"
                    placeholder="Add any additional details about this session..."
                    className="min-h-26"
                    value={session.description}
                    onChange={(e) =>
                      setSession((prev: any) => ({
                        ...prev,
                        description: e.target.value,
                      }))
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-sm text-muted-foreground">
                    Display option *
                  </Label>
                  <div className="flex gap-4 items-start justify-start bg-[#1A1A1A] rounded-sm p-2 border border-[#3A3A3A]">
                    <Checkbox checked={session.show_storefront} onCheckedChange={(val) => {
                      setSession((prev: any) => ({ ...prev, show_storefront: val }))
                    }} className="mt-1" />
                    <div>
                      <Label className="text-sm text-muted-foreground">Display on Website</Label>
                      <p className="text-muted-foreground text-sm">Show this promotion on the public promotions page</p>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollArea>
            <Separator />

            <div className="p-4 ">
              <div className="flex gap-4 flex-wrap">
                <DialogClose className="text-[13px] font-medium h-8 px-4 py-2 has-[>svg]:px-3 bg-black text-white border-border rounded-md hover:opacity-70 cursor-pointer flex flex-1 items-center justify-center">
                  Cancel
                </DialogClose>
                <Button
                  type="submit"
                  disabled={loading}
                  className="flex-1 text-[13px]"

                >
                  {loading && <Spinner className="text-black" />}
                  Save
                </Button>
              </div>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  )
}

const Header = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex w-full gap-4 justify-between flex-wrap items-center">
      <div className="space-y-1">
        <p className="text-xl">Promotions Management</p>
        <span className="text-xs text-muted-foreground flex items-center">
          <span>Create and manage promotional offers - Auto-syncs</span>
        </span>
      </div>

      {children}
    </div>
  );
};

const Promotions = [
  {
    status: "Active",
    liveOn: "Live on Storefront",
    image: "/promotions/img1.jpg",
    title: "5-Pack Basketball Training",
    description: "Get 5 basketball training sessions at a discounted",
    price: "$200",
    oldPrice: "$250",
    save: "$50",
    startDate: "12/1/2025",
    endDate: "12/31/2025",
    signUps: "24",
    revenue: "$4,800",
  },
  {
    status: "Active",
    liveOn: "Live on Storefront",
    image: "/promotions/img2.jpg",
    title: "5-Pack Basketball Training",
    description: "Get 5 basketball training sessions at a discounted",
    price: "$200",
    oldPrice: "$250",
    save: "$50",
    startDate: "12/1/2025",
    endDate: "12/31/2025",
    signUps: "24",
    revenue: "$4,800",
  },
];
