"use client";
import AppCalendar from "@/components/app-calendar";
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
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import axios from "@/lib/axios"
import {
  Archive,
  Calendar,
  DollarSign,
  Edit,
  ExternalLink,
  Eye,
  Image,
  Link,
  Plus,
  RefreshCcw,
  ShoppingBag,
  Tag,
  TrendingUp,
  Users
} from "lucide-react";
import { ReactNode, useState } from "react";
import { GoDotFill } from "react-icons/go";


const localData = [
  {
    Icon: <Tag />,
    title: "Active Promotions",
    description: "2",
    type: "active",
    going: "active",
  },
  {
    Icon: <Users />,
    title: "Total Sign-ups",
    description: "99",
    type: "info",
    going: "active",
  },
  {
    Icon: <DollarSign />,
    title: "Total Revenue",
    description: "$23,000",
    type: "success",
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

const allFilters = ["All", "Active", "Upcoming", "Archive"]

export default function Page() {
  const [filter, setFilter] = useState<
    "All" | "Active" | "Upcoming" | "Archive"
  >("Active");





  return (
    <div className="flex flex-col w-full gap-4">
      <Header>
        <div className="flex flex-wrap gap-4">
          <Button variant={"outline"} className="gap-2 text-sm">
            <RefreshCcw /> Sync with Square
          </Button>

          <AddNewPromotion />
        </div>
      </Header>



      <div className="flex justify-between gap-4 flex-wrap">
        {localData.map((item, index) => (
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
        {Promotions.map((item, i) => (
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


              <Badge className="absolute top-3 right-3  text-black flex gap-1 ">
                <ShoppingBag className="h-3 w-3" /> {item.liveOn}
              </Badge>
            </div>
            <CardContent className="px-4 space-y-4">

              <div className="space-y-1">
                <h3 className="text-lg font-semibold text-white">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {item.description}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <DollarSign size={16} className="text-success-text" />
                <span className="text-xl font-semibold">{item.price}</span>
                <span className="text-sm line-through text-muted-foreground">{item.oldPrice}</span>
                <Badge className="bg-active-bg text-active-text rounded-md">Save {item.save}</Badge>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1 bg-[#1A1A1A] border border-border rounded-xl p-3">

                  <div className="flex gap-2 items-center">
                    <Calendar size={12} className="text-muted-foreground" />
                    <div className="text-xs text-muted-foreground">Start Date</div>

                  </div>
                  <div className="text-sm text-white">{item.startDate}</div>
                </div>



                <div className="space-y-1 bg-[#1A1A1A] border border-border rounded-xl p-3">

                  <div className="flex gap-2 items-center">
                    <Calendar size={12} className="text-muted-foreground" />
                    <div className="text-xs text-muted-foreground">End Date</div>

                  </div>
                  <div className="text-sm text-white">{item.endDate}</div>
                </div>

              </div>

              <div className="grid grid-cols-2 gap-2">

                <div className="space-y-1 bg-[#1A1A1A] border border-border rounded-xl p-3">

                  <div className="flex gap-2 items-center">
                    <Users size={12} className="text-muted-foreground" />
                    <div className="text-xs text-muted-foreground">Sign-ups</div>

                  </div>
                  <div className="text-sm text-white">{item.signUps}</div>
                </div>



                <div className="space-y-1 bg-[#1A1A1A] border border-border rounded-xl p-3">

                  <div className="flex gap-2 items-center">
                    <TrendingUp size={12} className="text-muted-foreground" />
                    <div className="text-xs text-muted-foreground">Revenue</div>

                  </div>
                  <div className="text-sm text-white">{item.revenue}</div>
                </div>
              </div>


              <div className="flex items-center justify-between bg-info-bg border border-info-text/32 rounded-lg px-3 h-12">
                <div className="flex items-center gap-2">
                  <ExternalLink size={16} className="text-info-text" />
                  <span className="text-info-text text-sm">Square Checkout</span>
                </div>

                <Button size="sm" variant="link" className="text-info-text">
                  View Link
                </Button>
              </div>

              <div className="flex items-center justify-between bg-success-bg border border-success-text/32 rounded-lg px-3 h-12 text-success-text text-sm">
                <div className="flex items-center gap-2">
                  <ShoppingBag size={16} />
                  <span >Visible on Storefront</span>
                </div>
                <span>Users can signup</span>
              </div>

              <Separator />



              <div className="flex gap-2 mb-4">
                <Button className="flex-1" variant="outline" >
                  <Users /> View Participants
                </Button>
                <EditPromotion />
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
      const result=axios.post("/admin/promotions",{
        title:addPromotion.promotionTitle,
        description:addPromotion.description,
        image:addPromotion.imageUrl,
        original_price:addPromotion.originalPrice,
        promotion_price:addPromotion.promotionPrice,
        start_date:addPromotion.startDate,
        end_date:addPromotion.endDate,
        square_check_url:addPromotion.sqrCheckOutUrl,
        show_storefront:addPromotion.showOnStoreFront
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
                       onChange={(e) =>{
                        if(!Number.isNaN(Number(e.target.value))){
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
                      onChange={(e) =>{
                        if(!Number.isNaN(Number(e.target.value))){
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

const EditPromotion = () => {


  const [open, setOpen] = useState(false)
  const [editPromotion, setEditPromotion] = useState({
    promotionTitle: "",
    description: "",
    imageUrl: "",
    promotionPrice: "",
    orignalPrice: "",
    startDate: null,
    endDate: null,
    sqrCheckOutUrl: "",
    displayOnWebsite: false,
  });



  const changePromotion = () => {
    console.log(editPromotion);
  };


  const handleEditChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setEditPromotion((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEditCheckboxChange = (checked: boolean) => {
    setEditPromotion((prev) => ({
      ...prev,
      displayOnWebsite: checked,
    }));
  };

  return (
    <>

      <Button onClick={() => setOpen(!open)} variant="outline"><Edit /></Button>

      <Dialog open={open} onOpenChange={setOpen}>


        <DialogContent className="bg-[#252525] border border-[#3A3A3A] sm:max-w-4xl p-0">
          <DialogHeader className="border-b border-[#3A3A3A] p-4">
            <DialogTitle className="text-[#F3F4F6] font-semibold text-lg">
              Edit Promotion
            </DialogTitle>
            <p className="text-[#99A1AF]">
              Update promotion details
            </p>
          </DialogHeader>
          <form onSubmit={changePromotion} className="">
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
                    value={editPromotion.promotionTitle}
                    onChange={(e) => handleEditChange(e)}
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
                    value={editPromotion.description}
                    onChange={(e) => handleEditChange(e)}
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
                    value={editPromotion.imageUrl}
                    onChange={(e) => handleEditChange(e)}
                  />
                </div>

                {/* preview */}
                <div className="bg-[#1A1A1A] border border-border rounded-[10px] p-4 space-y-2">
                  <h1 className="text-[#99A1AF]">Preview:</h1>

                  {editPromotion.imageUrl ?
                    <img
                      src={editPromotion.imageUrl}
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
                      value={editPromotion.promotionPrice}
                      onChange={(e) => handleEditChange(e)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>
                      Original Price (Optional)
                    </Label>
                    <Input
                      name="orignalPrice"
                      placeholder="250.00"
                      className="!bg-[#1A1A1A] !border-[#3A3A3A] !text-[#E5E7EB] !p-5"
                      required
                      value={editPromotion.orignalPrice}
                      onChange={(e) => handleEditChange(e)}
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
                    <AppCalendar className="h-11" date={editPromotion.startDate ? new Date(editPromotion.startDate) : undefined} onChange={(date) => setEditPromotion((prevState) => ({ ...prevState, startDate: date }))} />


                  </div>
                  <div className="space-y-2">
                    <Label >
                      End Date *
                    </Label>
                    <AppCalendar className="h-11" date={editPromotion.endDate ? new Date(editPromotion.endDate) : undefined} onChange={(date) => setEditPromotion((prevState) => ({ ...prevState, endDate: date }))} />
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
                    value={editPromotion.sqrCheckOutUrl}
                    onChange={(e) => handleEditChange(e)}
                  />
                </div>

                <div className="flex gap-2 text-md items-center">
                  <Eye className="text-primary" size={16} />
                  <h1 className="text-[#F3F4F6]">Display Options</h1>
                </div>

                <div className="flex items-center gap-4 px-8 bg-[#1A1A1A] border border-[#3A3A3A] rounded-[10px] p-2">
                  <Checkbox
                    name="displayOnWebsite"
                    checked={editPromotion.displayOnWebsite}
                    onCheckedChange={handleEditCheckboxChange}
                  />
                  <div className="space-y-0">
                    <h1 className="text-[#D1D5DC]">
                      Display on Website
                    </h1>
                    <p className="text-sm text-[#6A7282]">
                      Show this promotion on the public promotions
                      page
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
                  Save Changes
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
