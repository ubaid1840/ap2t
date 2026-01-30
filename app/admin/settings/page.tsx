"use client";
import CardStatus from "@/components/card-status";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Scrollbar } from "@radix-ui/react-scroll-area"
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useIsMobile } from "@/hooks/use-mobile";
import { GearIcon } from "@radix-ui/react-icons";
import {
  Bell,
  Calendar,
  CircleCheckBig,
  CreditCard,
  DollarSign,
  Info,
  MessageCircle,
  MessageSquare,
  Phone,
  Shield,
  Trash,
  User,
  Users
} from "lucide-react";
import { ReactNode, useEffect, useState } from "react";
import { FaBell, FaCreditCard, FaLock, FaUser } from "react-icons/fa";
import { FaFloppyDisk } from "react-icons/fa6";
import { GoDotFill } from "react-icons/go";
import { RiShieldKeyholeLine } from "react-icons/ri";
import axios from "@/lib/axios";
export default function Page() {
  const [loading,setLoading]=useState(false)
  const [profileInfo, setProfileInfo] = useState({
    adminUser: "",
    email: "",
    phoneNo: "",
    role: "",
    password: "",
    blanck: "",
  });

  const [squareIntigration, setSquareIntigration] = useState([
    {
      title: "Merchant ID",
      type: "input",
      value: "",
      placeholder: "MLSQ12345678"
    },

    {
      title: "Location ID",
      type: "input",
      value: "",
      placeholder: "L12345689",
    },

    {
      title: "API Key",
      type: "input",
      value: "",
      placeholder: "**********"
    },

    {
      title: "Webhook URL",
      type: "input",
      value: "",
      placeholder: "https:/ap2t.com/api/square/webhook"
    },

    {
      title: "Test Mode",
      type: "switch",
      value: false,
      description: "Use Square sandbox for testing"
    },

    {
      title: "Auto Sync Catalog",
      type: "switch",
      description: "Automatically sync promotions with square catalog",
      value: false
    },
  ])



  const [securityInfo, setSecurityInfo] = useState({
    twoFactorAuth: false,
    loginAlert: false,
    oldPass: "",
    newPass: "",
    confirmNewPass: ""
  })

  const [notificationInfo, setNoficationInfo] = useState([
    {
      title: "New Booking",
      description: "Get notified when a new session is booked",
      value: false,
      icon: <Calendar className="text-muted-foreground" size={20} />
    },

    {
      title: "Payment Received",
      description: "Alerts for successful payments",
      value: false,
      icon: <DollarSign className="text-muted-foreground" size={20} />
    },

    {
      title: "Session Cancellation",
      description: "Alerts when sessions are cancelled",
      value: false,
      icon: <Info className="text-muted-foreground" size={20} />
    },

    {
      title: "Promotion Purchase",
      description: "When customers buy promotional packages",
      value: false,
      icon: <CreditCard className="text-muted-foreground" size={20} />
    },

    {
      title: "Email Notifications",
      description: "Receive updates via email",
      value: false,
      icon: <MessageSquare className="text-muted-foreground" size={20} />
    },

    {
      title: "SMS Notifications",
      description: "Receive updates via text message",
      value: false,
      icon: <MessageCircle className="text-muted-foreground" size={20} />
    },

    {
      title: "Push Notifications",
      description: "Browser push notifications",
      value: false,
      icon: <Bell className="text-muted-foreground" size={20} />
    },
  ])

useEffect(() => {
  const fetchData = async () => {
    try {
      setLoading(true);

      const res = await axios.get("/api/settings");

     
      const result = res.data;

      setProfileInfo({
        adminUser: result.user?.first_name || "",
        email: result.user?.email || "",
        phoneNo: result.user?.phone_no || "",
        role: result.user?.role || "",
        password: "", // ❌ never set password from backend
        blanck: "",
      });

      const settings = result.settings;


      setSquareIntigration([
        {
          title: "Merchant ID",
          type: "input",
          value: settings?.merchant_id || "",
          placeholder: "MLSQ12345678",
        },
        {
          title: "Location ID",
          type: "input",
          value: settings?.location_id || "",
          placeholder: "L12345689",
        },
        {
          title: "API Key",
          type: "input",
          value: settings?.api_key || "",
          placeholder: "**********",
        },
        {
          title: "Webhook URL",
          type: "input",
          value: settings?.webhook_url || "",
          placeholder: "https:/ap2t.com/api/square/webhook",
        },
        {
          title: "Test Mode",
          type: "switch",
          value: settings?.test_mode ?? false,
          description: "Use Square sandbox for testing",
        },
        {
          title: "Auto Sync Catalog",
          type: "switch",
          value: settings?.auto_sync_catalog ?? false,
          description:
            "Automatically sync promotions with square catalog",
        },
      ]);

     
      setSecurityInfo({
        twoFactorAuth: settings?.two_factor_auth ?? false,
        loginAlert: settings?.login_alert ?? false,
        oldPass: "",
        newPass: "",
        confirmNewPass: "",
      });

    
      setNoficationInfo([
        {
          title: "New Booking",
          description: "Get notified when a new session is booked",
          value: settings?.new_booking ?? false,
          icon: <Calendar className="text-muted-foreground" size={20} />,
        },
        {
          title: "Payment Received",
          description: "Alerts for successful payments",
          value: settings?.payment_received ?? false,
          icon: <DollarSign className="text-muted-foreground" size={20} />,
        },
        {
          title: "Session Cancellation",
          description: "Alerts when sessions are cancelled",
          value: settings?.session_cancellation ?? false,
          icon: <Info className="text-muted-foreground" size={20} />,
        },
        {
          title: "Promotion Purchase",
          description:
            "When customers buy promotional packages",
          value: settings?.promotion_purchase ?? false,
          icon: <CreditCard className="text-muted-foreground" size={20} />,
        },
        {
          title: "Email Notifications",
          description: "Receive updates via email",
          value: settings?.email_notifications ?? false,
          icon: <MessageSquare className="text-muted-foreground" size={20} />,
        },
        {
          title: "SMS Notifications",
          description: "Receive updates via text message",
          value: settings?.sms_notifications ?? false,
          icon: <MessageCircle className="text-muted-foreground" size={20} />,
        },
        {
          title: "Push Notifications",
          description: "Browser push notifications",
          value: settings?.push_notifications ?? false,
          icon: <Bell className="text-muted-foreground" size={20} />,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  fetchData();
}, []);



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
            <Scrollbar orientation="horizontal" />
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
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <LocalInput title="Full Name" Icon={<FaUser className="h-4 w-4 text-gray-400" />} value={profileInfo.adminUser}
                  placeholder="Admin User"
                  onChange={(e) =>
                    setProfileInfo((prev) => ({
                      ...prev,
                      adminUser: e,
                    }))
                  } />

                <LocalInput title="Email"
                  Icon={<MessageSquare className="h-4 w-4 text-gray-400" />} value={profileInfo.email}
                  placeholder="admin@ap2t.com"
                  onChange={(e) =>
                    setProfileInfo((prev) => ({
                      ...prev,
                      email: e,
                    }))
                  } />

                <LocalInput title="Phone Number"
                  Icon={<Phone className="h-5 w-5 text-gray-400" />} value={profileInfo.phoneNo}
                  placeholder="+91 3948392"
                  onChange={(e) =>
                    setProfileInfo((prev) => ({
                      ...prev,
                      phoneNo: e,
                    }))
                  } />

                <LocalInput title="Role"
                  Icon={<User className="h-4 w-4 text-gray-400" />} value={profileInfo.role}
                  placeholder="Super Admin"
                  onChange={(e) =>
                    setProfileInfo((prev) => ({
                      ...prev,
                      role: e,
                    }))
                  } />

                <LocalInput title="Password"
                  Icon={<FaUser className="h-4 w-4 text-gray-400" />} value={profileInfo.password}
                  placeholder="********"
                  onChange={(e) =>
                    setProfileInfo((prev) => ({
                      ...prev,
                      password: e,
                    }))
                  } />

                <LocalInput title="Phone Number"
                  Icon={<Phone className="h-4 w-4 text-gray-400" />} value={profileInfo.blanck}
                  placeholder="+91 03490334"
                  onChange={(e) =>
                    setProfileInfo((prev) => ({
                      ...prev,
                      blanck: e,
                    }))
                  } />

              </div>

            </TabsContent>
            <TabsContent value="Notification Preference" className="space-y-4">
              <div className="space-y-1">
                <h1 className="text-[18px] font normal">Notification Preferences</h1>
                <p className="text-xs text-muted-foreground">
                  Configure how and when you receive notifications.
                </p>
              </div>

              <div className="space-y-2">
                <h1 className="text-lg font-semibold text-[#F3F4F6]">
                  Activity Notifications
                </h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {notificationInfo.map((item, i) => (
                    <div key={i} className="flex justify-between items-center py-3 px-4 bg-[#1A1A1A] border border-border rounded-lg">
                      <div className="flex items-center gap-4">
                        {item.icon}
                        <div className="space-y-0">
                          <h1 className="text-[14px] text-[#F3F4F6]">{item.title}</h1>
                          <p className="text-xs text-[#99A1AF]">
                            {item.description}
                          </p>
                        </div>
                      </div>

                      <Switch className="mr-2" checked={item.value} onCheckedChange={(val) => setNoficationInfo((prevState) => {
                        const newState = [...prevState]
                        newState[i].value = val
                        return newState
                      })} />
                    </div>
                  ))}



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


              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex justify-between bg-[#1A1A1A] border border-[#3A3A3A] rounded-[10px] p-4">
                  <div className="flex items-center gap-2">
                    <Users className="text-gray-400" size={16} />
                    <h1 className="text-[#E5E7EB] text-sm">Manage Users</h1>
                  </div>
                  <CardStatus value={"Enabled"} type="active" />
                </div>
                <div className="flex justify-between bg-[#1A1A1A] border border-[#3A3A3A] rounded-[10px] p-4">
                  <div className="flex items-center gap-2">
                    <User className="text-gray-400 " size={16} />
                    <h1 className="text-[#E5E7EB] text-sm">Manage Players</h1>
                  </div>
                  <CardStatus value={"Enabled"} type="active" />
                </div>
                <div className="flex justify-between bg-[#1A1A1A] border border-[#3A3A3A] rounded-[10px] p-4">
                  <div className="flex items-center gap-2">
                    <Shield className="text-gray-400 " size={16} />
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

              <div className=" flex justify-between gap-2">
                <div className="space-y-1">
                  <h1 className="text-[18px] font normal">Square Integration</h1>
                  <p className="text-xs text-muted-foreground">
                    Manage your Square payment integration settings.
                  </p>
                </div>
                <div>
                  <CardStatus value={"Connected"} type="active" icon={<GoDotFill />} className="gap-0" />
                </div>

              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                { squareIntigration.map((item, i) => {
                  if (item.type === "input") {
                    return (
                      <LocalInput key={i}
                        placeholder={item.placeholder as string}
                        title={item.title} value={item.value as string} onChange={(val) => {
                          setSquareIntigration((prevState) => {
                            const newState = [...prevState]
                            newState[i].value = val
                            return newState
                          })
                        }}
                      />

                    )
                  } else {
                    return (
                      <LocalSwitch key={i} title={item.title} description={item.description} value={item.value as boolean} onChange={(val) => {
                        setSquareIntigration((prevState) => {
                          const newState = [...prevState]
                          newState[i].value = val
                          return newState
                        })
                      }} />
                    )
                  }
                })}






              </div>
              <div className="space-x-4 mt-8">
                <Button variant={"outline"} className="leading-none">
                  <CircleCheckBig /> Test Connection
                </Button>
                <Button className="bg-danger-bg text-danger-text border-danger-text/32 border hover:bg-danger-bg/50">
                  <Trash /> Disconnect
                </Button>
              </div>
            </TabsContent>
            <TabsContent value="Security" className="space-y-4">
              <div className="space-y-1">
                <h1 className="text-[18px] font normal">Security</h1>
                <p className="text-xs text-muted-foreground">
                  Keep your account secure with extra Authentication.
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <LocalSwitch
                  title="Two-Factor Authentication"
                  description="Add an extra layer of protection to your account."

                  value={securityInfo.twoFactorAuth}
                  onChange={(val) => setSecurityInfo((prevState) => ({ ...prevState, twoFactorAuth: val }))}
                />

                <LocalSwitch
                  title="Login Alert Notification"
                  description="Get notified when your account is accessed from a new device."

                  value={securityInfo.loginAlert}
                  onChange={(val) => setSecurityInfo((prevState) => ({ ...prevState, loginAlert: val }))}
                />


              </div>

              <div className="space-y-4">
                <h1 className="text-[18px] font normal">Password Management</h1>
                <div className="grid grid-cols-2">

                  <LocalInput
                    title="Old Password"
                    value={securityInfo.oldPass}
                    onChange={(e) =>
                      setSecurityInfo((prev) => ({
                        ...prev,
                        oldPass: e,
                      }))
                    }
                    placeholder="*********"
                  />



                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                  <LocalInput
                    title="New Password"
                    value={securityInfo.newPass}
                    onChange={(e) =>
                      setSecurityInfo((prev) => ({
                        ...prev,
                        newPass: e,
                      }))
                    }
                    placeholder="*********"
                  />

                  <LocalInput
                    title="Confirm New Password"
                    value={securityInfo.confirmNewPass}
                    onChange={(e) =>
                      setSecurityInfo((prev) => ({
                        ...prev,
                        confirmNewPass: e,
                      }))
                    }
                    placeholder="*********"
                  />
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

const LocalSwitch = ({ value, title, description, onChange }: { title: string, description?: string | undefined, value: boolean, onChange: (val: boolean) => void }) => {

  return (
    <div className="flex justify-between items-center py-2 px-4 bg-[#1A1A1A] border border-border rounded-[10px]">
      <div className="flex items-center gap-4">
        <div className="space-y-0">
          <h1 className="text-sm text-[#E5E7EB]">{title}</h1>
          {description && <p className="text-xs text-muted-foreground">
            {description}
          </p>
          }
        </div>
      </div>

      <Switch className="mr-2" checked={value} onCheckedChange={onChange}
      />
    </div>
  )
}

const LocalInput = ({ Icon, title, placeholder = "Type here...", value, onChange }: { placeholder: string, Icon?: ReactNode, title: string, value: string, onChange: (val: string) => void }) => {

  return (
    <div className="space-y-1">
      <Label className="text-xs font-normal tracking-wide text-[#D1D1D1]">{title}</Label>
      <div
        className={`flex items-center gap-2 py-2 rounded-[12px] border border-[#3A3A3A] px-3 shadow-sm  bg-[#18181B]`}
      >
        {Icon}
        <Input
          value={value}
          onChange={(e) => onChange(e.target.value)
          }
          placeholder={placeholder}
          className={`border-none bg-transparent p-0 text-md placeholder:text-gray-400 focus-visible:ring-0 focus-visible:ring-offset-0 dark:bg-transparent `}
        />
      </div>
    </div>
  )
}
