"use client";
import CardStatus from "@/components/card-status";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { DialogTrigger } from "@radix-ui/react-dialog";
import {
  Archive,
  Calendar,
  DollarSign,
  Dot,
  Eye,
  Image,
  Link,
  NotebookPen,
  Plus,
  Recycle,
  ShoppingBag,
  Tag,
  TrendingUp,
  Users,
} from "lucide-react";
import { useState } from "react";
import { GoDotFill } from "react-icons/go";


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
  const [filter, setFilter] = useState<
    "All" | "Active" | "Upcoming" | "Archive"
  >("Active");

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

  const [editPromotion, setEditPromotion] = useState({
    promotionTitle: "",
    description: "",
    imageUrl: "",
    promotionPrice: "",
    orignalPrice: "",
    startDate: "",
    endDate: "",
    sqrCheckOutUrl: "",
    displayOnWebsite: false,
  });

  const createPromotion = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log(addPromotion);
  };

  const changePromotion = () => {
    console.log(editPromotion);
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
    <div className="flex flex-col gap-4 w-full">
      <div className="flex justify-between">
        <div className="text-xl font-semibold text-[#F3F4F6]">
          <h1>Promotions Management</h1>
          <p className="text-sm text-[#99A1AF]">
            Create and manage promotional offers - Auto-syncs{" "}
          </p>
        </div>

        <div className="flex items-center gap-4">
          <Button variant={"outline"} className="gap-2 text-sm">
            <Recycle /> Sync with Square
          </Button>

          <Dialog>
            <DialogTrigger>
              <Button className="gap-2 text-sm">
                <Plus /> Add New Promotion
              </Button>
            </DialogTrigger>

            <DialogContent className="bg-[#252525] border border-[#3A3A3A] sm:max-w-4xl p-0">
              <DialogHeader className="border-b border-[#3A3A3A] p-4">
                <h1 className="text-[#F3F4F6] font-semibold text-lg">
                  Add New Promotion
                </h1>
                <p className="text-[#99A1AF]">
                  Auto-syncs with Square and appears on online store
                </p>
              </DialogHeader>
              <form onSubmit={createPromotion} className="">
                <ScrollArea className="h-[70dvh] py-1 space-y-4 px-2">
                  <div className="space-y-2 px-2">
                  <div className="flex gap-2 text-md ">
                    <Tag className="text-primary" />
                    <h1 className="text-[#F3F4F6]">Promotion Details</h1>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm text-[#99A1AF]">
                      Promotion Title *
                    </Label>
                    <Input
                      name="promotionTitle"
                      placeholder="e.g., 5-Pack Basketball Training"
                      className="!bg-[#1A1A1A] !border-[#3A3A3A] !text-[#E5E7EB] !p-5"
                      required
                      value={addPromotion.promotionTitle}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm text-[#99A1AF]">
                      Description *
                    </Label>
                    <Textarea
                      name="description"
                      placeholder="Describe the promotion offer and what's included..."
                      className="!bg-[#1A1A1A] !border-[#3A3A3A] !text-[#E5E7EB] !p-5"
                      required
                      value={addPromotion.description}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="flex gap-2 text-md ">
                    <Image className="text-primary" />
                    <h1 className="text-[#F3F4F6]">Promotional Flyer</h1>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm text-[#99A1AF]">
                      Image URL *
                    </Label>
                    <Input
                      name="imageUrl"
                      placeholder="https://example.com/image.jpg"
                      className="!bg-[#1A1A1A] !border-[#3A3A3A] !text-[#E5E7EB] !p-5"
                      required
                      value={addPromotion.imageUrl}
                      onChange={handleChange}
                    />
                    <p className="text-[#6A7282] text-sm">
                      Enter the URL of your promotional flyer image. Rec
                    </p>
                  </div>

                  <div className="flex gap-2 text-md ">
                    <DollarSign className="text-primary" />
                    <h1 className="text-[#F3F4F6]">Price</h1>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-sm text-[#99A1AF]">
                        Promotion Price *
                      </Label>
                      <Input
                        name="promotionPrice"
                        placeholder="200.00"
                        className="!bg-[#1A1A1A] !border-[#3A3A3A] !text-[#E5E7EB] !p-5"
                        required
                        value={addPromotion.promotionPrice}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm text-[#99A1AF]">
                        Original Price (Optional)
                      </Label>
                      <Input
                        name="orignalPrice"
                        placeholder="250.00"
                        className="!bg-[#1A1A1A] !border-[#3A3A3A] !text-[#E5E7EB] !p-5"
                        required
                        value={addPromotion.originalPrice}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="flex gap-2 text-md ">
                    <Calendar className="text-primary" />
                    <h1 className="text-[#F3F4F6]">Promotion Duration</h1>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-sm text-[#99A1AF]">
                        Start Date *
                      </Label>
                      <Input
                        name="startDate"
                        placeholder=""
                        className="!bg-[#1A1A1A] !border-[#3A3A3A] !text-[#E5E7EB] !p-5"
                        required
                        value={addPromotion.startDate}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm text-[#99A1AF]">
                        End Date *
                      </Label>
                      <Input
                        name="endDate"
                        placeholder=""
                        className="!bg-[#1A1A1A] !border-[#3A3A3A] !text-[#E5E7EB] !p-5"
                        required
                        value={addPromotion.endDate}
                        onChange={(e) => handleChange(e)}
                      />
                    </div>
                  </div>

                  <div className="bg-info-bg text-info-text border border-[#2B7FFF33] p-2 rounded-[10px] space-y-2">
                    <h1>
                      ✓ When end date passes, promotion automatically moves to
                      Archived Promotions
                    </h1>
                    <h1>✓ Removed from online storefront automatically</h1>
                  </div>

                  <div className="flex gap-2 text-md ">
                    <Link className="text-primary" />
                    <h1 className="text-[#F3F4F6]">Square Checkout</h1>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm text-[#99A1AF]">
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
                    <p className="text-[#6A7282] text-sm">
                      Create a Square payment link for this promotion. User will
                      be directed to here to purchase.
                    </p>
                  </div>

                  <div className="flex gap-2 text-md ">
                    <Eye className="text-primary" />
                    <h1 className="text-[#F3F4F6]">Storefront Display</h1>
                  </div>

                  <div className="flex items-center gap-4 px-8 bg-[#1A1A1A] border border-[#3A3A3A] rounded-[10px] p-2">
                    <Checkbox
                      name="showOnStoreFront"
                      checked={addPromotion.showOnStoreFront}
                      onCheckedChange={handleCheckboxChange}
                    />
                    <div className="space-y-1">
                      <h1 className="text-[#D1D5DC]">
                        Show on Online Storefront
                      </h1>
                      <p className="text-sm text-[#6A7282]">
                        Display promotional card with image, title, price
                      </p>
                    </div>
                  </div>

                  <div className="bg-success-bg  border border-[#D3FB2033] p-2 px-6 rounded-[10px] space-y-2">
                    <h1 className="text-success-text">
                      ✓ When end date passes, promotion automatically moves to
                      Archived Promotions
                    </h1>
                    <p className="text-[#99A1AF] text-sm">
                      Card will display: Flyer Image • Title • Description •
                      Price • Validity Dates • Sign Up Button (links to Square
                      checkout)
                    </p>
                  </div>
                  </div>
                </ScrollArea>
                <div className="p-2 space-y-1 border-t border-[#3A3A3A]">
                  <div className="flex gap-4">
                    <DialogClose className="flex-1">
                      <Button className="bg-[#1A1A1A] border border-[#3A3A3A] w-full text-[#D1D5DC] text-md font-semibold py-5">
                        Cancel
                      </Button>
                    </DialogClose>
                     <Button
                  type="submit"
                  className="flex-1 text-md font-semibold py-5"
                >
                  Create Promotion & Sync to Square
                </Button>
                  </div>
                  <p className="text-sm text-[#6A7282] text-center">
                    Promotion will automatically sync with Square and appear on
                    storefront
                  </p>
                </div>
               
              </form>
            </DialogContent>
          </Dialog>
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
            <Button className={`text-sm ${filter==="All"?"":"bg-[#1A1A1A] text-[#99A1AF]"}`} onClick={()=>setFilter("All")}>All</Button>
            <Button className={`text-sm ${filter==="Active"?"":"bg-[#1A1A1A] text-[#99A1AF]"}`} onClick={()=>setFilter("Active")}>Active</Button>
            <Button className={`text-sm ${filter==="Upcoming"?"":"bg-[#1A1A1A] text-[#99A1AF]"}`} onClick={()=>setFilter("Upcoming")}>Upcoming</Button>
            <Button className={`text-sm ${filter==="Archive"?"":"bg-[#1A1A1A] text-[#99A1AF]"}`} onClick={()=>setFilter("Archive")}>Archive</Button>
          </div>
        </div>

        <div className="rounded-[10px] bg-info-bg p-2 flex items-center gap-2">
          <GoDotFill className="text-active-text" />
          <h1 className="text-info-text">Live Sync with Square</h1>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {Promotions.map((promotion, i) => {
          return (
            <Card className="p-0 bg-[#252525]" key={i}>
              <div className="h-48 relative bg-[#1A1A1A]">
                <img src={promotion.image} alt="" />
                <Badge className="bg-[#00C950] text-white absolute top-2 left-2 px-4">
                  {promotion.status}
                </Badge>
                <Badge className="flex gap-1 bg-primary text-black absolute top-2 right-2 px-4">
                  <ShoppingBag />
                  {promotion.liveOn}
                </Badge>
              </div>
              <div className="space-y-4 p-4">
                <h1 className="text-[#F3F4F6] font-semibold">
                  {promotion.title}
                </h1>
                <p className="text-sm text-[#99A1AF]">
                  {promotion.description}
                </p>
                <div className="flex gap-2 items-center">
                  <DollarSign className="text-primary" />
                  <h1>{promotion.price}</h1>
                  <h1 className="text-[#6A7282]">{promotion.oldPrice}</h1>
                  <CardStatus value={`Save ${promotion.save}`} type="active" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-2xl border border-border space-y-2 p-4 bg-[#1A1A1A]">
                    <div className="flex gap-2">
                      <Calendar />
                      <p className="text-sm text-[#99A1AF]">Start Date</p>
                    </div>
                    <h1 className="text-[#E5E7EB]">{promotion.startDate}</h1>
                  </div>

                  <div className="rounded-2xl border border-border space-y-2 p-4 bg-[#1A1A1A]">
                    <div className="flex gap-2">
                      <Calendar />
                      <p className="text-sm text-[#99A1AF]">End Date</p>
                    </div>
                    <h1 className="text-[#E5E7EB]">{promotion.endDate}</h1>
                  </div>

                  <div className="rounded-2xl border border-border space-y-2 p-4 bg-[#1A1A1A]">
                    <div className="flex gap-2">
                      <Users />
                      <p className="text-sm text-[#99A1AF]">Sign-ups</p>
                    </div>
                    <h1 className="text-[#E5E7EB]">{promotion.signUps}</h1>
                  </div>

                  <div className="rounded-2xl border border-border space-y-2 p-4 bg-[#1A1A1A]">
                    <div className="flex gap-2">
                      <TrendingUp />
                      <p className="text-sm text-[#99A1AF]">Revenue</p>
                    </div>
                    <h1 className="text-[#E5E7EB]">{promotion.revenue}</h1>
                  </div>
                </div>
                <div className="bg-info-bg text-info-text flex justify-between rounded-2xl p-4">
                  <div className="flex gap-2">
                    <Link /> <h1>Square Checkout</h1>
                  </div>
                  <div>
                    <Button variant={"link"}>View link</Button>
                  </div>
                </div>

                <div className="bg-[#D3FB2033] text-primary flex justify-between rounded-2xl p-4">
                  <div className="flex gap-2">
                    <ShoppingBag /> <h1>Visible on Storefront</h1>
                  </div>
                  <div>
                    <Button variant={"link"}>Users can sign up</Button>
                  </div>
                </div>
                <Separator />
                <div className="flex gap-2">
                  <Button className="bg-[#1A1A1A] border border-[#3A3A3A]  gap-2 rounded-[10px] text-[#D1D5DC] text-md py-6 px-6 flex-3">
                    <Users /> Users can sign up
                  </Button>

                  <Dialog>
                    <DialogTrigger>
                      <Button className="rounded-[10px] bg-[#1A1A1A] border border-[#3A3A3A] text-[#D1D5DC] py-6 px-6 text-md">
                        <NotebookPen />
                      </Button>
                    </DialogTrigger>

                    <DialogContent className="bg-[#252525] border border-[#3A3A3A] sm:max-w-4xl p-0">
                      <DialogHeader className="border-b border-[#3A3A3A] p-4">
                        <h1 className="text-[#F3F4F6] font-semibold text-lg">
                          Edit Promotion
                        </h1>
                        <p className="text-[#99A1AF]">
                          Update promotion details
                        </p>
                      </DialogHeader>
                      <form onSubmit={changePromotion} className="">
                      <ScrollArea className="h-[70dvh] py-1">
                        <div className="space-y-4 px-4"
                        >
                          <div className="flex gap-2 text-md ">
                            <Tag className="text-primary" />
                            <h1 className="text-[#F3F4F6]">
                              Promotion Details
                            </h1>
                          </div>
                          <div className="space-y-2">
                            <Label className="text-sm text-[#99A1AF]">
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
                            <Label className="text-sm text-[#99A1AF]">
                              Description *
                            </Label>
                            <Textarea
                              name="description"
                              placeholder="Describe the promotion offer and what's included..."
                              className="!bg-[#1A1A1A] !border-[#3A3A3A] !text-[#E5E7EB] !p-5"
                              required
                              value={editPromotion.description}
                              onChange={(e) => handleEditChange(e)}
                            />
                          </div>

                          <div className="flex gap-2 text-md ">
                            <Image className="text-primary" />
                            <h1 className="text-[#F3F4F6]">
                              Promotional Flyer
                            </h1>
                          </div>

                          <div className="space-y-2">
                            <Label className="text-sm text-[#99A1AF]">
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
                            <iframe
                              src=""
                              title=""
                              className="w-full bg-[#2A2A2A]"
                            ></iframe>
                          </div>

                          <div className="flex gap-2 text-md ">
                            <DollarSign className="text-primary" />
                            <h1 className="text-[#F3F4F6]">Price</h1>
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label className="text-sm text-[#99A1AF]">
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
                              <Label className="text-sm text-[#99A1AF]">
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

                          <div className="flex gap-2 text-md ">
                            <Calendar className="text-primary" />
                            <h1 className="text-[#F3F4F6]">
                              Promotion Duration
                            </h1>
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label className="text-sm text-[#99A1AF]">
                                Start Date *
                              </Label>
                              <Input
                                name="startDate"
                                placeholder=""
                                className="!bg-[#1A1A1A] !border-[#3A3A3A] !text-[#E5E7EB] !p-5"
                                required
                                value={editPromotion.startDate}
                                onChange={(e) => handleEditChange(e)}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label className="text-sm text-[#99A1AF]">
                                End Date *
                              </Label>
                              <Input
                                name="endDate"
                                placeholder=""
                                className="!bg-[#1A1A1A] !border-[#3A3A3A] !text-[#E5E7EB] !p-5"
                                required
                                value={editPromotion.endDate}
                                onChange={(e) => handleEditChange(e)}
                              />
                            </div>
                          </div>

                          <div className="flex gap-2 text-md ">
                            <Link className="text-primary" />
                            <h1 className="text-[#F3F4F6]">Square Checkout</h1>
                          </div>

                          <div className="space-y-2">
                            <Label className="text-sm text-[#99A1AF]">
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

                          <div className="flex gap-2 text-md ">
                            <Eye className="text-primary" />
                            <h1 className="text-[#F3F4F6]">Display Options</h1>
                          </div>

                          <div className="flex items-center gap-4 px-8 bg-[#1A1A1A] border border-[#3A3A3A] rounded-[10px] p-2">
                            <Checkbox
                              name="displayOnWebsite"
                              checked={editPromotion.displayOnWebsite}
                              onCheckedChange={handleEditCheckboxChange}
                            />
                            <div className="space-y-1">
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
                          <DialogClose className="flex-1">
                            <Button className="bg-[#1A1A1A] border border-[#3A3A3A] w-full text-[#D1D5DC] text-md font-semibold py-5">
                              Cencel
                            </Button>
                          </DialogClose>
                          <Button className="flex-1 text-md font-semibold py-5"
                          >
                            Create Promotion & Sync to Square
                          </Button>
                        </div>
                      </div>
                      </form>
                    </DialogContent>
                  </Dialog>

                  <Button className="bg-[#FF690033] border border-[#FF69004D] rounded-[10px] py-6 px-6 text-md text-[#FF8904]">
                    <Archive />
                  </Button>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

const Promotions = [
  {
    status: "Active",
    liveOn: "Live on Storefront",
    image: "/public/promotionCardHero.png",
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
    image: "",
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
