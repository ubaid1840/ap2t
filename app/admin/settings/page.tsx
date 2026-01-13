"use client";
import CardStatus from "@/components/card-status";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useIsMobile } from "@/hooks/use-mobile";
import { GearIcon } from "@radix-ui/react-icons";
import {
  Bell,
  Calendar,
  Check,
  CreditCard,
  DollarSign,
  FileWarningIcon,
  Info,
  MessageCircle,
  MessageSquare,
  Phone,
  Shield,
  Trash,
  User,
  Users
} from "lucide-react";
import { ReactNode, useState } from "react";
import { FaBell, FaCreditCard, FaLock, FaUser } from "react-icons/fa";
import { FaFloppyDisk } from "react-icons/fa6";
import { GoDotFill } from "react-icons/go";
import { RiShieldKeyholeLine } from "react-icons/ri";
export default function Page() {
  const [profileInfo, setProfileInfo] = useState({
    adminUser: "",
    email: "",
    phoneNo: "",
    role: "",
    password: "",
    blanck: "",
  });

  const [squareIntigration, setSquareIntigration] = useState({
    merchantId: "",
    LocationId: "",
    apiKey: "",
    webHookUrl: "",
    testModes: false,
    autoSyncCatalog: false,
  });

  const [securityInfo, setSecurityInfo] = useState({
    twoFactorAuth: false,
    loginAlert: false,
    oldPass: "",
    newPass: "",
    confirmNewPass: ""
  })

  const [notificationInfo, setNoficationInfo] = useState({
    newBooking: false,
    paymentReceived: false,
    sessionCencellation: false,
    promotionPerchase: false,
    emailNotification: false,
    smsNotification: false,
    pushNotification: false
  })

  const isMobile = useIsMobile()
  return (
    <div className="flex flex-col w-full gap-4">
      <Header>
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
          <Button className="rounded-full">
            <FaFloppyDisk /> Save Changes
          </Button>
        </div>
      </Header>
      <Card className="bg-[#282828] p-0 overflow-hidden">
        <Tabs defaultValue="Profile info" className="gap-0">
          <ScrollArea className={`overflow-x-auto ${isMobile && "max-w-[calc(100vw-64px)]"}`}>
            <TabsList className="bg-transparent relative flex p-0 ">
              <TabsTrigger
                value="Profile info"
                className="dark:data-[state=active]:bg-[#CBFD0026] dark:data-[state=active]:text-primary dark:data-[state=active]:border-b-primary rounded-none rounded-tl-xl h-9 px-4 text-[12px] leading-tight tracking-tight"
              >
                <div className="flex gap-2 items-center py-2">
                  <FaUser />
                  Profile Info
                </div>
              </TabsTrigger>
              <TabsTrigger
                value="Notification Preference"
                className="dark:data-[state=active]:bg-[#CBFD0026] dark:data-[state=active]:text-primary dark:data-[state=active]:border-b-primary rounded-none h-9 px-4 text-[12px] leading-tight tracking-tight"
              >
                <div className="flex gap-2 items-center py-2">
                  <FaBell />
                  Notification Preference
                </div>
              </TabsTrigger>
              <TabsTrigger
                value="Role Permission"
                className="dark:data-[state=active]:bg-[#CBFD0026] dark:data-[state=active]:text-primary dark:data-[state=active]:border-b-primary rounded-none h-9 px-4 text-[12px] leading-tight tracking-tight"
              >
                <div className="flex gap-2 items-center py-2">
                  <RiShieldKeyholeLine />
                  Role Permission
                </div>
              </TabsTrigger>
              <TabsTrigger
                value="Square Integration"
                className="dark:data-[state=active]:bg-[#CBFD0026] dark:data-[state=active]:text-primary dark:data-[state=active]:border-b-primary rounded-none h-9 px-4 text-[12px] leading-tight tracking-tight"
              >
                <div className="flex gap-2 items-center py-2">
                  <FaCreditCard />
                  Square Integration
                </div>
              </TabsTrigger>
              <TabsTrigger
                value="Security"
                className="dark:data-[state=active]:bg-[#CBFD0026] dark:data-[state=active]:text-primary dark:data-[state=active]:border-b-primary rounded-none h-9 px-4 text-[12px] leading-tight tracking-tight"
              >
                <div className="flex gap-2 items-center py-2">
                  <FaLock />
                  Security
                </div>
              </TabsTrigger>
            </TabsList>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
          <Separator />
          <CardContent className="p-4">
            <TabsContent value="Profile info" className="space-y-4">

              <div className="space-y-1">
                <h1 className="text-[18px] font normal">Profile Information</h1>
                <p className="text-xs text-muted-foreground">
                  Manage your personal details and keep your contact
                </p>
              </div>

              <div className="flex items-center gap-8">
                <div className="relative w-24 h-24">
                  <img
                    className="w-full h-full rounded-full object-cover"
                    src="/settings/profilepic.png"
                    alt=""
                  />

                  <div className="absolute bottom-0 right-0 bg-primary p-2 rounded-full">
                    <User size={14} className="text-black text-sm" />
                  </div>
                </div>
                <div className="space-y-1">
                  <h1 className="text-md font-semibold">Admin User</h1>
                  <p className="text-sm text-muted-foreground">Super Admin</p>
                  <div className="flex gap-2">
                    <Button variant={"link"} className="p-0 font-normal">
                      Delete
                    </Button>
                    <Button variant={"link"} className="p-0 font-normal">
                      Update
                    </Button>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-1">
                  <Label className="text-xs font-normal tracking-wide text-[#D1D1D1]">Full Name</Label>
                  <div
                    className={`flex items-center gap-2 py-2 rounded-[12px] border border-[#3A3A3A] px-3 shadow-sm  bg-[#18181B]`}
                  >
                    <FaUser className="h-4 w-4 text-gray-400" />
                    <Input
                      value={profileInfo.adminUser}
                      onChange={(e) =>
                        setProfileInfo((prev) => ({
                          ...prev,
                          adminUser: e.target.value,
                        }))
                      }
                      placeholder="Admin User"
                      className={`border-none bg-transparent p-0 text-xl placeholder:text-gray-400 focus-visible:ring-0 focus-visible:ring-offset-0 dark:bg-transparent `}
                    />
                  </div>
                </div>
                <div className="space-y-1">
                  <Label className="text-xs font-normal tracking-wide text-[#D1D1D1]">E-mail</Label>

                  <div
                    className={`flex items-center gap-2 py-2 rounded-[12px] border border-[#3A3A3A] px-3 shadow-sm  bg-[#18181B]`}
                  >
                    <MessageSquare className="h-5 w-5 text-gray-400" />
                    <Input
                      value={profileInfo.email}
                      onChange={(e) =>
                        setProfileInfo((prev) => ({
                          ...prev,
                          email: e.target.value,
                        }))
                      }
                      placeholder="admin@ap2t.com"
                      className={`border-none bg-transparent p-0 text-xl placeholder:text-gray-400 focus-visible:ring-0 focus-visible:ring-offset-0 dark:bg-transparent `}
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <Label className="text-xs font-normal tracking-wide text-[#D1D1D1]">Phone No.</Label>
                  <div
                    className={`flex items-center gap-2 py-2 rounded-[12px] border border-[#3A3A3A] px-3 shadow-sm  bg-[#18181B]`}
                  >
                    <Phone className="h-5 w-5 text-gray-400" />
                    <Input
                      value={profileInfo.phoneNo}
                      onChange={(e) =>
                        setProfileInfo((prev) => ({
                          ...prev,
                          phoneNo: e.target.value,
                        }))
                      }
                      placeholder="+91 3948392"
                      className={`border-none bg-transparent p-0 text-xl placeholder:text-gray-400 focus-visible:ring-0 focus-visible:ring-offset-0 dark:bg-transparent `}
                    />
                  </div>
                </div>
                <div className="space-y-1">
                  <Label className="text-xs font-normal tracking-wide text-[#D1D1D1]">Role</Label>
                  <div
                    className={`flex items-center gap-2 py-2 rounded-[12px] border border-[#3A3A3A] px-3 shadow-sm  bg-[#18181B]`}
                  >
                    <User className="h-5 w-5 text-gray-400" />
                    <Input
                      value={profileInfo.role}
                      onChange={(e) =>
                        setProfileInfo((prev) => ({
                          ...prev,
                          role: e.target.value,
                        }))
                      }
                      placeholder="Super Admin"
                      className={`border-none bg-transparent p-0 text-xl placeholder:text-gray-400 focus-visible:ring-0 focus-visible:ring-offset-0 dark:bg-transparent `}
                    />
                  </div>
                </div>
                <div className="space-y-1">
                  <Label className="text-xs font-normal tracking-wide text-[#D1D1D1]">Password</Label>
                  <div
                    className={`flex items-center gap-2 py-2 rounded-[12px] border border-[#3A3A3A] px-3 shadow-sm  bg-[#18181B]`}
                  >
                    <User className="h-5 w-5 text-gray-400" />
                    <Input
                      value={profileInfo.password}
                      onChange={(e) =>
                        setProfileInfo((prev) => ({
                          ...prev,
                          password: e.target.value,
                        }))
                      }
                      placeholder="********"
                      className={`border-none bg-transparent p-0 text-xl placeholder:text-gray-400 focus-visible:ring-0 focus-visible:ring-offset-0 dark:bg-transparent `}
                    />
                  </div>
                </div>
                <div className="space-y-1">
                  <Label className="text-xs font-normal tracking-wide text-[#D1D1D1]">Phone No.</Label>
                  <div
                    className={`flex items-center gap-2 py-2 rounded-[12px] border border-[#3A3A3A] px-3 shadow-sm  bg-[#18181B]`}
                  >
                    <User className="h-5 w-5 text-gray-400" />
                    <Input
                      value={profileInfo.blanck}
                      onChange={(e) =>
                        setProfileInfo((prev) => ({
                          ...prev,
                          blanck: e.target.value,
                        }))
                      }
                      placeholder="+91 03490334"
                      className={`border-none bg-transparent p-0 text-xl placeholder:text-gray-400 focus-visible:ring-0 focus-visible:ring-offset-0 dark:bg-transparent `}
                    />
                  </div>
                </div>
              </div>

            </TabsContent>
            <TabsContent value="Notification Preference" className="space-y-4">
              {/* header */}

              <div className="space-y-1">
                <h1 className="text-[18px] font normal">Notification Preferences</h1>
                <p className="text-xs text-muted-foreground">
                  Configure how and when you receive notifications.
                </p>
              </div>


              <div className="space-y-2">
                <h1 className="text-xl font-bold text-[#F3F4F6]">
                  Notification Preferences
                </h1>
                <p className="text-[#99A1AF] text-sm">
                  Configure how and when you receive notifications.
                </p>
              </div>
              {/* activate notification */}

              <div className="space-y-2">
                <h1 className="text-xl font-semibold text-[#F3F4F6]">
                  Activity Notifications
                </h1>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex justify-between items-center p-4 bg-[#1A1A1A] border border-border rounded-[10px]">
                    <div className="flex items-center max-w-2xl gap-4">
                      <Calendar className="h-5 w-5 text-ghost-text" />
                      <div className="space-y-1">
                        <h1 className="text-lg text-[#F3F4F6]">New Booking</h1>
                        <p className="text-sm text-[#99A1AF]">
                          Get notified when a new session is booked
                        </p>
                      </div>
                    </div>

                    <Switch className="scale-150 mr-2" checked={notificationInfo.newBooking} onCheckedChange={(val) => setNoficationInfo((prevState) => ({ ...prevState, newBooking: val }))} />
                  </div>

                  <div className="flex justify-between items-center p-4 bg-[#1A1A1A] border border-border rounded-[10px]">
                    <div className="flex items-center max-w-2xl gap-4">
                      <DollarSign className="h-5 w-5 text-ghost-text" />
                      <div className="space-y-1">
                        <h1 className="text-lg text-[#F3F4F6]">
                          Payment Received
                        </h1>
                        <p className="text-sm text-[#99A1AF]">
                          Alerts for successful payments
                        </p>
                      </div>
                    </div>

                    <Switch className="scale-150 mr-2" checked={notificationInfo.paymentReceived} onCheckedChange={(val) => setNoficationInfo((prevState) => ({ ...prevState, paymentReceived: val }))} />
                  </div>

                  <div className="flex justify-between items-center p-4 bg-[#1A1A1A] border border-border rounded-[10px]">
                    <div className="flex items-center max-w-2xl gap-4">
                      <FileWarningIcon className="h-5 w-5 text-ghost-text" />
                      <div className="space-y-1">
                        <h1 className="text-lg text-[#F3F4F6]">
                          Session Cancellation
                        </h1>
                        <p className="text-sm text-[#99A1AF]">
                          Alerts when sessions are cancelled
                        </p>
                      </div>
                    </div>

                    <Switch className="scale-150 mr-2" checked={notificationInfo.sessionCencellation} onCheckedChange={(val) => setNoficationInfo((prevState) => ({ ...prevState, sessionCencellation: val }))} />
                  </div>
                  <div className="flex justify-between items-center p-4 bg-[#1A1A1A] border border-border rounded-[10px]">
                    <div className="flex items-center max-w-2xl gap-4">
                      <CreditCard className="h-5 w-5 text-ghost-text" />
                      <div className="space-y-1">
                        <h1 className="text-lg text-[#F3F4F6]">
                          Promotion Purchase
                        </h1>
                        <p className="text-sm text-[#99A1AF]">
                          When customers buy promotional packages
                        </p>
                      </div>
                    </div>

                    <Switch className="scale-150 mr-2" checked={notificationInfo.promotionPerchase} onCheckedChange={(val) => setNoficationInfo((prevState) => ({ ...prevState, promotionPerchase: val }))} />
                  </div>
                </div>
              </div>
              {/* payment method */}
              <div className="space-y-2">
                <h1 className="text-xl font-semibold text-[#F3F4F6]">
                  Delivery Methods
                </h1>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex justify-between items-center p-4 bg-[#1A1A1A] border border-border rounded-[10px]">
                    <div className="flex items-center max-w-2xl gap-4">
                      <MessageSquare className="h-5 w-5 text-ghost-text" />
                      <div className="space-y-1">
                        <h1 className="text-lg text-[#E5E7EB]">
                          Email Notifications
                        </h1>
                        <p className="text-sm text-[#99A1AF]">
                          Receive updates via email
                        </p>
                      </div>
                    </div>

                    <Switch className="scale-150 mr-2" checked={notificationInfo.emailNotification} onCheckedChange={(val) => setNoficationInfo((prevState) => ({ ...prevState, emailNotification: val }))} />
                  </div>

                  <div className="flex justify-between items-center p-4 bg-[#1A1A1A] border border-border rounded-[10px]">
                    <div className="flex items-center max-w-2xl gap-4">
                      <MessageCircle className="h-5 w-5 text-ghost-text" />
                      <div className="space-y-1">
                        <h1 className="text-lg text-[#E5E7EB]">
                          SMS Notifications
                        </h1>
                        <p className="text-sm text-[#99A1AF]">
                          Receive updates via text message
                        </p>
                      </div>
                    </div>

                    <Switch className="scale-150 mr-2" checked={notificationInfo.smsNotification} onCheckedChange={(val) => setNoficationInfo((prevState) => ({ ...prevState, smsNotification: val }))} />
                  </div>

                  <div className="flex justify-between items-center p-4 bg-[#1A1A1A] border border-border rounded-[10px]">
                    <div className="flex items-center max-w-2xl gap-4">
                      <Bell className="h-5 w-5 text-ghost-text" />
                      <div className="space-y-1">
                        <h1 className="text-lg text-[#E5E7EB]">
                          Push Notifications
                        </h1>
                        <p className="text-sm text-[#99A1AF]">
                          Browser push notifications
                        </p>
                      </div>
                    </div>

                    <Switch className="scale-150 mr-2" checked={notificationInfo.pushNotification} onCheckedChange={(val) => setNoficationInfo((prevState) => ({ ...prevState, pushNotification: val }))} />
                  </div>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="Role Permission" className="space-y-4">
             
              <div className="space-y-1">
                <h1 className="text-[18px] font normal">Role Permissions</h1>
                <p className="text-xs text-muted-foreground">
                 View permissions associated with your role.
                </p>
              </div>

              <Card className="bg-info-bg/40 p-3 border-info-text/30">
                <CardContent className="p-0">
                  <div className="flex gap-4 items-start">
                    <Info size={14} className="text-info-text" />
                    <div className="font-normal space-y-1">
                      <Label className="text-info-text text-[14px] leading-none">Current Role: Super Admin</Label>
                      <p className="text-muted-foreground text-xs">These permissions apply to your account</p>
                    </div>
                  </div>
                </CardContent>
              </Card>


              <div className="grid grid-cols-2 gap-4">
                <div className="flex justify-between bg-[#1A1A1A] border border-[#3A3A3A] rounded-[10px] p-4">
                  <div className="flex items-center gap-2">
                    <Users className="text-gray-400" size={16}/>
                    <h1 className="text-[#E5E7EB] text-sm">Manage Users</h1>
                  </div>
                  <CardStatus value={"Enabled"} type="active" />
                </div>
                <div className="flex justify-between bg-[#1A1A1A] border border-[#3A3A3A] rounded-[10px] p-4">
                  <div className="flex items-center gap-2">
                    <User className="text-gray-400 " size={16}/>
                    <h1 className="text-[#E5E7EB] text-sm">Manage Players</h1>
                  </div>
                  <CardStatus value={"Enabled"} type="active" />
                </div>
                <div className="flex justify-between bg-[#1A1A1A] border border-[#3A3A3A] rounded-[10px] p-4">
                  <div className="flex items-center gap-2">
                    <Shield className="text-gray-400 " size={16}/>
                    <h1 className="text-[#E5E7EB] text-sm">Manage Coaches </h1>
                  </div>
                  <CardStatus value={"Enabled"} type="active" />
                </div>
                <div className="flex justify-between bg-[#1A1A1A] border border-[#3A3A3A] rounded-[10px] p-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="text-gray-400 " size={16} />
                    <h1 className="text-[#E5E7EB] text-sm">Manage Sessions</h1>
                  </div>
                  <CardStatus value={"Enabled"} type="active" />
                </div>
                <div className="flex justify-between bg-[#1A1A1A] border border-[#3A3A3A] rounded-[10px] p-4">
                  <div className="flex items-center gap-2">
                    <CreditCard className="text-gray-400" size={16} />
                    <h1 className="text-[#E5E7EB] text-sm">Manage Payments</h1>
                  </div>
                  <CardStatus value={"Enabled"} type="active" />
                </div>
                <div className="flex justify-between bg-[#1A1A1A] border border-[#3A3A3A] rounded-[10px] p-4">
                  <div className="flex items-center gap-2">
                    <DollarSign className="text-gray-400 " size={16} />
                    <h1 className="text-[#E5E7EB] text-sm">Manage Promotions</h1>
                  </div>
                  <CardStatus value={"Enabled"} type="active" />
                </div>
                <div className="flex justify-between bg-[#1A1A1A] border border-[#3A3A3A] rounded-[10px] p-4">
                  <div className="flex items-center gap-2">
                    <GearIcon className="text-gray-400 h-4 w-4" />
                    <h1 className="text-[#E5E7EB] text-sm">System Settings</h1>
                  </div>
                  <CardStatus value={"Enabled"} type="active" />
                </div>
                <div className="flex justify-between bg-[#1A1A1A] border border-[#3A3A3A] rounded-[10px] p-4">
                  <div className="flex items-center gap-2">
                    <GearIcon className="text-gray-400 h-4 w-4" />
                    <h1 className="text-[#E5E7EB] text-sm">View Reports</h1>
                  </div>
                  <CardStatus value={"Enabled"} type="active" />
                </div>
              </div>
            </TabsContent>
            <TabsContent value="Square Integration" className="space-y-4">
              {/* header */}
              <div className=" flex justify-between gap-2">
                <div className="space-y-2">
                  <h1 className="font-semibold text-xl text-[#F3F4F6]">
                    Square Integration
                  </h1>
                  <p className="text-sm text-[#99A1AF]">
                    Manage your Square payment integration settings.
                  </p>
                </div>
                <div>
                  <CardStatus value={"Connected"} type="active" icon={<GoDotFill />} className="gap-0" />
                </div>

              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <Label className="text-[#D1D1D1]">Merchant ID</Label>

                  <div
                    className={`flex items-center gap-2 h-16 rounded-[12px] border border-[#3A3A3A] px-3 shadow-sm  bg-[#18181B]`}
                  >
                    <Input
                      value={squareIntigration.merchantId}
                      onChange={(e) =>
                        setSquareIntigration((prev) => ({
                          ...prev,
                          merchantId: e.target.value,
                        }))
                      }
                      placeholder="MLSQ1234567890"
                      className={`border-none bg-transparent p-0 text-xl placeholder:text-gray-400 focus-visible:ring-0 focus-visible:ring-offset-0 dark:bg-transparent `}
                    />
                  </div>
                </div>
                <div className="space-y-1">
                  <Label className="text-[#D1D1D1]">Location ID</Label>

                  <div
                    className={`flex items-center gap-2 h-16 rounded-[12px] border border-[#3A3A3A] px-3 shadow-sm  bg-[#18181B]`}
                  >
                    <Input
                      value={squareIntigration.LocationId}
                      onChange={(e) =>
                        setSquareIntigration((prev) => ({
                          ...prev,
                          LocationId: e.target.value,
                        }))
                      }
                      placeholder="L1234567890"
                      className={`border-none bg-transparent p-0 text-xl placeholder:text-gray-400 focus-visible:ring-0 focus-visible:ring-offset-0 dark:bg-transparent `}
                    />
                  </div>
                </div>
                <div className="space-y-1">
                  <Label className="text-[#D1D1D1]">API Key</Label>

                  <div
                    className={`flex items-center gap-2 h-16 rounded-[12px] border border-[#3A3A3A] px-3 shadow-sm  bg-[#18181B]`}
                  >
                    <Input
                      value={squareIntigration.apiKey}
                      onChange={(e) =>
                        setSquareIntigration((prev) => ({
                          ...prev,
                          apiKey: e.target.value,
                        }))
                      }
                      placeholder="••••••••••••••••"
                      className={`border-none bg-transparent p-0 text-xl placeholder:text-gray-400 focus-visible:ring-0 focus-visible:ring-offset-0 dark:bg-transparent `}
                    />
                  </div>
                </div>
                <div className="space-y-1">
                  <Label className="text-[#D1D1D1]">Webhook URL</Label>

                  <div
                    className={`flex items-center gap-2 h-16 rounded-[12px] border border-[#3A3A3A] px-3 shadow-sm  bg-[#18181B]`}
                  >
                    <Input
                      value={squareIntigration.webHookUrl}
                      onChange={(e) =>
                        setSquareIntigration((prev) => ({
                          ...prev,
                          webHookUrl: e.target.value,
                        }))
                      }
                      placeholder="https://ap2t.com/api/square/webhook"
                      className={`border-none bg-transparent p-0 text-xl placeholder:text-gray-400 focus-visible:ring-0 focus-visible:ring-offset-0 dark:bg-transparent `}
                    />
                  </div>
                </div>

                <div className="flex justify-between items-center p-4 bg-[#1A1A1A] border border-border rounded-[10px]">
                  <div className="flex items-center max-w-2xl gap-4">
                    <MessageSquare className="h-5 w-5 text-ghost-text" />
                    <div className="space-y-1">
                      <h1 className="text-lg text-[#E5E7EB]">Test Modes</h1>
                      <p className="text-sm text-[#99A1AF]">
                        Use Square sandbox for testing
                      </p>
                    </div>
                  </div>

                  <Switch className="scale-150 mr-2" checked={squareIntigration.testModes} onCheckedChange={(val) => setSquareIntigration((prevState) => ({ ...prevState, testModes: val }))} />
                </div>

                <div className="flex justify-between items-center p-4 bg-[#1A1A1A] border border-border rounded-[10px]">
                  <div className="flex items-center max-w-2xl gap-4">
                    <MessageSquare className="h-5 w-5 text-ghost-text" />
                    <div className="space-y-1">
                      <h1 className="text-lg text-[#E5E7EB]">
                        Auto-Sync Catalog
                      </h1>
                      <p className="text-sm text-[#99A1AF]">
                        Automatically sync promotions with Square catalog
                      </p>
                    </div>
                  </div>

                  <Switch className="scale-150 mr-2" checked={squareIntigration.autoSyncCatalog} onCheckedChange={(val) => setSquareIntigration((prevState) => ({ ...prevState, autoSyncCatalog: val }))} />
                </div>
              </div>
              <div className="space-x-4 mt-8">
                <Button className="gap-2 bg-[#1A1A1A] text-[#E5E7EB]">
                  <Check /> Test Connection
                </Button>
                <Button className="gap-2 bg-danger-bg text-danger-text">
                  <Trash /> Disconnect
                </Button>
              </div>
            </TabsContent>
            <TabsContent value="Security" className="space-y-4">
              <div className=" space-y-2">
                <h1 className="font-semibold text-xl text-[#F3F4F6]">
                  Security
                </h1>
                <p className="text-sm text-[#99A1AF]">
                  Keep your account secure with extra authentication
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex justify-between items-center p-4 bg-[#1A1A1A] border border-border rounded-[10px]">
                  <div className="flex items-center max-w-2xl gap-4">
                    <div className="space-y-1">
                      <h1 className="text-lg text-[#E5E7EB]">Two-Factor Authentication</h1>
                      <p className="text-sm text-[#99A1AF]">
                        Add an extra layer of protection to your account.
                      </p>
                    </div>
                  </div>

                  <Switch className="scale-150 mr-2" checked={securityInfo.twoFactorAuth} onCheckedChange={(val) => setSecurityInfo((prevState) => ({ ...prevState, twoFactorAuth: val }))} />
                </div>
                <div className="flex justify-between items-center p-4 bg-[#1A1A1A] border border-border rounded-[10px]">
                  <div className="flex items-center max-w-2xl gap-4">
                    <div className="space-y-1">
                      <h1 className="text-lg text-[#E5E7EB]">Login Alert Notification</h1>
                      <p className="text-sm text-[#99A1AF]">
                        Get notified when your account is accessed from a new device.
                      </p>
                    </div>
                  </div>

                  <Switch className="scale-150 mr-2" checked={securityInfo.loginAlert} onCheckedChange={(val) => setSecurityInfo((prevState) => ({ ...prevState, loginAlert: val }))} />
                </div>
              </div>

              <div className="space-y-4">
                <h1 className="text-xl text-[#E5E7EB]">Password Management</h1>
                <div className="grid grid-cols-2">
                  <div className="space-y-1">
                    <Label className="text-[#D1D1D1]">Old Password</Label>

                    <div
                      className={`flex items-center gap-2 h-16 rounded-[12px] border border-[#3A3A3A] px-3 shadow-sm  bg-[#18181B]`}
                    >
                      <Input
                        value={securityInfo.oldPass}
                        onChange={(e) =>
                          setSecurityInfo((prev) => ({
                            ...prev,
                            oldPass: e.target.value,
                          }))
                        }
                        placeholder="*********"
                        className={`border-none bg-transparent p-0 text-xl placeholder:text-gray-400 focus-visible:ring-0 focus-visible:ring-offset-0 dark:bg-transparent `}
                      />
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <Label className="text-[#D1D1D1]">New Password</Label>

                    <div
                      className={`flex items-center gap-2 h-16 rounded-[12px] border border-[#3A3A3A] px-3 shadow-sm  bg-[#18181B]`}
                    >
                      <Input
                        value={securityInfo.newPass}
                        onChange={(e) =>
                          setSecurityInfo((prev) => ({
                            ...prev,
                            newPass: e.target.value,
                          }))
                        }
                        placeholder="*********"
                        className={`border-none bg-transparent p-0 text-xl placeholder:text-gray-400 focus-visible:ring-0 focus-visible:ring-offset-0 dark:bg-transparent `}
                      />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <Label className="text-[#D1D1D1]">Confirm New Password</Label>

                    <div
                      className={`flex items-center gap-2 h-16 rounded-[12px] border border-[#3A3A3A] px-3 shadow-sm  bg-[#18181B]`}
                    >
                      <Input
                        value={securityInfo.confirmNewPass}
                        onChange={(e) =>
                          setSecurityInfo((prev) => ({
                            ...prev,
                            confirmNewPass: e.target.value,
                          }))
                        }
                        placeholder="*********"
                        className={`border-none bg-transparent p-0 text-xl placeholder:text-gray-400 focus-visible:ring-0 focus-visible:ring-offset-0 dark:bg-transparent `}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </CardContent>
        </Tabs>
      </Card>
    </div>
  );
}

const Header = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex w-full gap-4 justify-between flex-wrap items-center">
      <div className="space-y-1">
        <p className="text-xl">Settings</p>
        <span className="text-xs text-muted-foreground flex items-center">
          <span>Manage your account, preferences and integration</span>
        </span>
      </div>

      {children}
    </div>
  );
};
