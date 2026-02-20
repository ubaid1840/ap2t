"use client";
import AppCalendar from "@/components/app-calendar";
import CardStatus from "@/components/card-status";
import RenderAvatar from "@/components/render-avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Spinner } from "@/components/ui/spinner";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/contexts/auth-context";
import { useIsMobile } from "@/hooks/use-mobile";
import axios from "@/lib/axios";
import { auth, storage } from "@/lib/firebase";
import { EncryptString, joinNames } from "@/lib/functions";
import { uploadProfileImage } from "@/lib/upload-profile-image";
import { GearIcon } from "@radix-ui/react-icons";
import { Scrollbar } from "@radix-ui/react-scroll-area";
import { EmailAuthProvider, reauthenticateWithCredential, updatePassword } from "firebase/auth";
import { deleteObject, ref } from "firebase/storage";
import {
  Calendar,
  CircleCheckBig,
  CreditCard,
  DollarSign,
  Info,
  Loader2,
  MapPin,
  MessageCircle,
  MessageSquare,
  Phone,
  Plus,
  Shield,
  User,
  Users
} from "lucide-react";
import { ReactNode, useEffect, useRef, useState } from "react";
import { FaBell, FaCreditCard, FaLock, FaUser } from "react-icons/fa";
import { FaFloppyDisk } from "react-icons/fa6";
import { RiShieldKeyholeLine } from "react-icons/ri";
import { toast } from "sonner";


type SquareMode = "test" | "live";

type SquareCredentials = {
  merchantId: string;
  locationId: string;
  apiKey: string;
};

type SquareIntegrationState = {
  mode: SquareMode;
  credentials: {
    test: SquareCredentials;
    live: SquareCredentials;
  };
};

type SquareFieldKey = keyof SquareCredentials;

export default function Page() {

  const [loading, setLoading] = useState(false);
  const isMobile = useIsMobile();
  const [savingChanges, setSavingChanges] = useState(false);
  const [tab, setTab] = useState("Profile info");
  const [profileImage, setProfileImage] = useState<string | null>();
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [connected, setConnected] = useState(false)
  const [connectionLoading, setConnectionLoading] = useState(false)
  const [profileInfo, setProfileInfo] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone_no: "",
    location: "",
    birth_date: undefined,
  });
  const { user } = useAuth();
  const [passwordLoading, setPasswordLoading] = useState(false)



  const [squareIntegration, setSquareIntegration] = useState<SquareIntegrationState>({
    mode: "test",

    credentials: {
      test: {
        merchantId: "",
        locationId: "",
        apiKey: "",
      },
      live: {
        merchantId: "",
        locationId: "",
        apiKey: "",
      },
    },
  });

  const [securityInfo, setSecurityInfo] = useState({
    oldPass: "",
    newPass: "",
    confirmNewPass: "",
  });

  const [notificationInfo, setNoficationInfo] = useState([
    {
      title: "New Booking",
      description: "Get notified when a new session is booked",
      value: false,
      icon: <Calendar className="text-muted-foreground" size={20} />,
    },

    {
      title: "Payment Received",
      description: "Alerts for successful payments",
      value: false,
      icon: <DollarSign className="text-muted-foreground" size={20} />,
    },

    {
      title: "Session Cancellation",
      description: "Alerts when sessions are cancelled",
      value: false,
      icon: <Info className="text-muted-foreground" size={20} />,
    },

    {
      title: "Promotion Purchase",
      description: "When customers buy promotional packages",
      value: false,
      icon: <CreditCard className="text-muted-foreground" size={20} />,
    },

    {
      title: "Email Notifications",
      description: "Receive updates via email",
      value: false,
      icon: <MessageSquare className="text-muted-foreground" size={20} />,
    },

    {
      title: "SMS Notifications",
      description: "Receive updates via text message",
      value: false,
      icon: <MessageCircle className="text-muted-foreground" size={20} />,
    },

    // {
    //   title: "Push Notifications",
    //   description: "Browser push notifications",
    //   value: false,
    //   icon: <Bell className="text-muted-foreground" size={20} />,
    // },
  ]);

  const [rolePermissions, setRolePermissions] = useState(
    {
      manage_users: true,
      manage_players: true,
      manage_coaches: true,
      manage_sessions: true,
      manage_payments: true,
      manage_promotions: true,
      system_settings: true,
      view_reports: true
    }
  )

  useEffect(() => {

    fetchData();
  }, [user]);

  const fetchData = async () => {
    if (!user?.id) return;

    try {
      setLoading(true);

      const res = await axios.get(`/settings?user_id=${user.id}`);
      const result = res.data;

      setProfileInfo({
        first_name: result.user?.first_name || "",
        last_name: result?.last_name || "",
        email: result.user?.email || "",
        phone_no: result.user?.phone_no || "",
        location: result.user?.location,
        birth_date: result.user?.birth_date || undefined,
      });
      setProfileImage(result.user?.picture || null);
      const settings = result.settings;
      setSquareIntegration(
        {
          mode: settings.mode ? "test" : "live",

          credentials: {
            test: {
              merchantId: settings?.test_merchant_id || "",
              locationId: settings?.test_location_id || "",
              apiKey: settings?.test_api_key || "",
            },
            live: {
              merchantId: settings?.live_merchant_id || "",
              locationId: settings?.live_location_id || "",
              apiKey: settings?.live_api_key || "",
            },
          },
        }
      )
      setRolePermissions({
        manage_users: settings.manage_users,
        manage_coaches: settings.manage_coaches,
        manage_players: settings.manage_players,
        manage_payments: settings.manage_payments,
        manage_promotions: settings.manage_promotions,
        manage_sessions: settings.manage_sessions,
        system_settings: settings.system_settings,
        view_reports: settings.view_reports
      })

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
          value: settings?.payment_receive ?? false,
          icon: <DollarSign className="text-muted-foreground" size={20} />,
        },
        {
          title: "Session Cancellation",
          description: "Alerts when sessions are cancelled",
          value: settings?.session_cancel ?? false,
          icon: <Info className="text-muted-foreground" size={20} />,
        },
        {
          title: "Promotion Purchase",
          description: "When customers buy promotional packages",
          value: settings?.promotion_purchase ?? false,
          icon: <CreditCard className="text-muted-foreground" size={20} />,
        },
        {
          title: "Email Notifications",
          description: "Receive updates via email",
          value: settings?.email_notification ?? false,
          icon: <MessageSquare className="text-muted-foreground" size={20} />,
        },
        {
          title: "SMS Notifications",
          description: "Receive updates via text message",
          value: settings?.sms_notification ?? false,
          icon: <MessageCircle className="text-muted-foreground" size={20} />,
        },
        // {
        //   title: "Push Notifications",
        //   description: "Browser push notifications",
        //   value: settings?.push_notification ?? false,
        //   icon: <Bell className="text-muted-foreground" size={20} />,
        // },
      ]);
    } catch (error) {
      console.error("Error fetching settings:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateSettings = async () => {
    setSavingChanges(true);

    try {

      const payload = {
        id: user?.id,
        new_booking: notificationInfo[0].value,
        payment_receive: notificationInfo[1].value,
        session_cancel: notificationInfo[2].value,
        promotion_purchase: notificationInfo[3].value,
        email_notification: notificationInfo[4].value,
        sms_notification: notificationInfo[5].value,
        // push_notification: notificationInfo[6].value,
        live_merchant_id: squareIntegration.credentials.live.merchantId,
        live_location_id: squareIntegration.credentials.live.locationId,
        live_api_key: squareIntegration.credentials.live.apiKey,
        test_merchant_id: squareIntegration.credentials.test.merchantId,
        test_location_id: squareIntegration.credentials.test.locationId,
        test_api_key: squareIntegration.credentials.test.apiKey,
        mode: squareIntegration.mode === 'test',
      }
      await axios.put(`/user`, {
        id: user?.id,
        ...profileInfo
      })

      await axios.put("/admin/settings", payload)

      toast.success("Settings saved...")

    } finally {
      setSavingChanges(false);
    }
  };

  const handleSelectFile = () => {
    fileInputRef.current?.click();
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user?.id) return;

    setUploading(true);
    try {
      const path = `ap2t/user/picture/${user.id}.png`;

      await uploadProfileImage(file, path);

      await axios.put("/user", {
        id: user.id,
        picture: path,
      });
    } finally {
      setUploading(false);
    }
  };

  const handleDeleteImage = async () => {
    if (!user?.id) return;

    try {
      const storageRef = ref(storage, `ap2t/user/picture/${user.id}.png`);
      await deleteObject(storageRef);

      await axios.put("/user", {
        id: user.id,
        picture: null,
      });

      setProfileImage(null);
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  const activeMode: SquareMode = squareIntegration.mode;
  const squareFields: {
    key: SquareFieldKey;
    title: string;
    placeholder: string;
  }[] = [
      {
        key: "merchantId",
        title: "Merchant ID",
        placeholder: "MLSQ12345678",
      },
      {
        key: "locationId",
        title: "Location ID",
        placeholder: "L12345689",
      },
      {
        key: "apiKey",
        title: "API Key",
        placeholder: "**********",
      },
    ];


  const handlePasswordUpdate = async () => {
    if (!securityInfo.newPass || !securityInfo.confirmNewPass) {
      return;
    }
    if (securityInfo.newPass !== securityInfo.confirmNewPass) {
      toast.error("Passwords do not match")
      return;
    }

    const fbuser = auth.currentUser;
    if (fbuser && user?.email) {
      setPasswordLoading(true);
      const credential = EmailAuthProvider.credential(
        user.email,
        securityInfo.oldPass
      );

      reauthenticateWithCredential(fbuser, credential)
        .then(async () => {
          await updatePassword(fbuser, securityInfo.newPass)
          setSecurityInfo({ confirmNewPass: "", newPass: "", oldPass: "" })
          toast.success("Password changed...");
        })
        .catch((error) => {
          toast.error(error?.message || "Error changing password")
          console.log(error);
        })
        .finally(() => {
          setPasswordLoading(false);
        });
    }
  };

  async function handleTestConnection() {
    try {
      setConnectionLoading(true)

      const query = `?mode=${squareIntegration.mode}&token=${EncryptString(squareIntegration.credentials[squareIntegration.mode].apiKey)}`
      await axios.get(`/square/test${query}`)
      setConnected(true)
    } catch (error) {
      console.log(error)
      setConnected(false)
    } finally {
      setConnectionLoading(false)
    }
  }



  return (

    <div className="flex flex-col w-full gap-4">
      <Header>
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
          <Button disabled={savingChanges} onClick={() => updateSettings()}>
            {savingChanges ? (
              <>
                <Spinner className="text-black" />
                Saving...
              </>
            ) : (
              <>
                <FaFloppyDisk className="h-4 w-4" />
                Save Changes
              </>
            )}
          </Button>

        </div>
      </Header>
      {loading ? <Skeleton className="h-[300px] w-full bg-secondary rounded-sm" /> :
        <Card className="bg-[#282828] p-0 overflow-hidden">
          <Tabs value={tab} onValueChange={setTab} className="gap-0">
            <ScrollArea
              className={`overflow-x-auto ${isMobile && "max-w-[calc(100vw-64px)]"}`}
            >
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
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleUpload}
                  />

                  <div className="relative w-24 h-24">
                    <RenderAvatar img={user?.picture} fallback={joinNames([user?.first_name, user?.last_name])} className="w-full h-full bg-[#1A1A1A]" fallbackClassName="bg-[#1A1A1A] text-white" />

                    <button
                      onClick={handleSelectFile}
                      className="absolute bottom-0 right-0 bg-primary p-2 rounded-full"
                    >
                      {uploading ? (
                        <Loader2 size={14} className="animate-spin text-black" />
                      ) : profileImage ? (
                        <User size={14} className="text-black" />
                      ) : (
                        <Plus size={14} className="text-black" />
                      )}
                    </button>
                  </div>

                  <div className="space-y-1">
                    <h1 className="text-md font-semibold">
                      {user?.first_name} {user?.last_name}
                    </h1>
                    <p className="text-sm text-muted-foreground">{user?.role}</p>

                    <div className="flex gap-2">
                      {profileImage && (
                        <Button
                          variant="link"
                          className="p-0 font-normal"
                          onClick={handleDeleteImage}
                        >
                          Delete
                        </Button>
                      )}

                      <Button
                        variant="link"
                        className="p-0 font-normal"
                        onClick={handleSelectFile}
                      >
                        Update
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <LocalInput
                    title="First Name"
                    Icon={<FaUser className="h-4 w-4 text-gray-400" />}
                    value={profileInfo.first_name}
                    placeholder="Admin User"
                    onChange={(e) =>
                      setProfileInfo((prev) => ({
                        ...prev,
                        first_name: e,
                      }))
                    }
                  />

                  <LocalInput
                    title="Last Name"
                    Icon={<FaUser className="h-4 w-4 text-gray-400" />}
                    value={profileInfo.last_name}
                    placeholder="Admin User"
                    onChange={(e) =>
                      setProfileInfo((prev) => ({
                        ...prev,
                        last_name: e,
                      }))
                    }
                  />

                  <LocalInput
                    disabled
                    title="Email"
                    Icon={<MessageSquare className="h-4 w-4 text-gray-400" />}
                    value={profileInfo.email}
                    placeholder="email@example.com"
                    onChange={(e) =>
                      setProfileInfo((prev) => ({
                        ...prev,
                        email: e,
                      }))
                    }
                  />

                  <LocalInput
                    title="Phone Number"
                    Icon={<Phone className="h-5 w-5 text-gray-400" />}
                    value={profileInfo.phone_no}
                    placeholder="+91 3948392"
                    onChange={(e) =>
                      setProfileInfo((prev) => ({
                        ...prev,
                        phoneNo: e,
                      }))
                    }
                  />

                  <LocalInput
                    title="Location"
                    Icon={<MapPin className="h-4 w-4 text-gray-400" />}
                    value={profileInfo.location}
                    placeholder="********"
                    onChange={(e) =>
                      setProfileInfo((prev) => ({
                        ...prev,
                        password: e,
                      }))
                    }
                  />
                  <div className="space-y-2">
                    <Label className="text-xs text-muted">
                      Birth Date
                    </Label>
                    <AppCalendar
                      className="h-12"
                      date={
                        profileInfo.birth_date
                      }
                      onChange={(date) =>
                        setProfileInfo((prevState) => ({
                          ...prevState,
                          birth_date: date,
                        }))
                      }
                    />
                  </div>

                </div>
              </TabsContent>
              <TabsContent value="Notification Preference" className="space-y-4">
                <div className="space-y-1">
                  <h1 className="text-[18px] font normal">
                    Notification Preferences
                  </h1>
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
                      <div
                        key={i}
                        className="flex justify-between items-center py-3 px-4 bg-[#1A1A1A] border border-border rounded-lg"
                      >
                        <div className="flex items-center gap-4">
                          {item.icon}
                          <div className="space-y-0">
                            <h1 className="text-[14px] text-[#F3F4F6]">
                              {item.title}
                            </h1>
                            <p className="text-xs text-[#99A1AF]">
                              {item.description}
                            </p>
                          </div>
                        </div>

                        <Switch
                          className="mr-2"
                          checked={item.value}
                          onCheckedChange={(val) =>
                            setNoficationInfo((prevState) => {
                              const newState = [...prevState];
                              newState[i].value = val;
                              return newState;
                            })
                          }
                        />
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
                        <Label className="text-info-text text-[14px] leading-none">
                          Current Role: Super Admin
                        </Label>
                        <p className="text-muted-foreground text-xs">
                          These permissions apply to your account
                        </p>
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
                    <CardStatus value={rolePermissions.manage_users ? "enabled" : "disabled"} />
                  </div>
                  <div className="flex justify-between bg-[#1A1A1A] border border-[#3A3A3A] rounded-[10px] p-4">
                    <div className="flex items-center gap-2">
                      <User className="text-gray-400 " size={16} />
                      <h1 className="text-[#E5E7EB] text-sm">Manage Players</h1>
                    </div>
                    <CardStatus value={rolePermissions.manage_players ? "enabled" : "disabled"} />
                  </div>
                  <div className="flex justify-between bg-[#1A1A1A] border border-[#3A3A3A] rounded-[10px] p-4">
                    <div className="flex items-center gap-2">
                      <Shield className="text-gray-400 " size={16} />
                      <h1 className="text-[#E5E7EB] text-sm">Manage Coaches </h1>
                    </div>
                    <CardStatus value={rolePermissions.manage_coaches ? "enabled" : "disabled"} />
                  </div>
                  <div className="flex justify-between bg-[#1A1A1A] border border-[#3A3A3A] rounded-[10px] p-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="text-gray-400 " size={16} />
                      <h1 className="text-[#E5E7EB] text-sm">Manage Sessions</h1>
                    </div>
                    <CardStatus value={rolePermissions.manage_sessions ? "enabled" : "disabled"} />
                  </div>
                  <div className="flex justify-between bg-[#1A1A1A] border border-[#3A3A3A] rounded-[10px] p-4">
                    <div className="flex items-center gap-2">
                      <CreditCard className="text-gray-400" size={16} />
                      <h1 className="text-[#E5E7EB] text-sm">Manage Payments</h1>
                    </div>
                    <CardStatus value={rolePermissions.manage_payments ? "enabled" : "disabled"} />
                  </div>
                  <div className="flex justify-between bg-[#1A1A1A] border border-[#3A3A3A] rounded-[10px] p-4">
                    <div className="flex items-center gap-2">
                      <DollarSign className="text-gray-400 " size={16} />
                      <h1 className="text-[#E5E7EB] text-sm">
                        Manage Promotions
                      </h1>
                    </div>
                    <CardStatus value={rolePermissions.manage_promotions ? "enabled" : "disabled"} />
                  </div>
                  <div className="flex justify-between bg-[#1A1A1A] border border-[#3A3A3A] rounded-[10px] p-4">
                    <div className="flex items-center gap-2">
                      <GearIcon className="text-gray-400 h-4 w-4" />
                      <h1 className="text-[#E5E7EB] text-sm">System Settings</h1>
                    </div>
                    <CardStatus value={rolePermissions.system_settings ? "enabled" : "disabled"} />
                  </div>
                  <div className="flex justify-between bg-[#1A1A1A] border border-[#3A3A3A] rounded-[10px] p-4">
                    <div className="flex items-center gap-2">
                      <GearIcon className="text-gray-400 h-4 w-4" />
                      <h1 className="text-[#E5E7EB] text-sm">View Reports</h1>
                    </div>
                    <CardStatus value={rolePermissions.view_reports ? "enabled" : "disabled"} />
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="Square Integration" className="space-y-4">
                <div className=" flex justify-between gap-2">
                  <div className="space-y-1">
                    <h1 className="text-[18px] font normal">
                      Square Integration
                    </h1>
                    <p className="text-xs text-muted-foreground">
                      Manage your Square payment integration settings.
                    </p>
                  </div>
                  <div>
                    <CardStatus
                      value={connected ? "connected" : "disconnected"}
                      icon={true}
                      className="gap-0"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {squareFields.map((field) => (
                    <LocalInput
                      key={field.key}
                      title={field.title}
                      placeholder={field.placeholder}
                      value={
                        squareIntegration.credentials[activeMode][field.key]
                      }
                      onChange={(val) => {
                        setSquareIntegration((prev) => ({
                          ...prev,
                          credentials: {
                            ...prev.credentials,
                            [activeMode]: {
                              ...prev.credentials[activeMode],
                              [field.key]: val,
                            },
                          },
                        }));
                      }}
                    />
                  ))}
                  <LocalSwitch
                    title="Test Mode"
                    description="Use Square sandbox for testing"
                    value={squareIntegration.mode === "test"}
                    onChange={(val) => {
                      setSquareIntegration((prev) => ({
                        ...prev,
                        mode: val ? "test" : "live",
                      }));
                    }}
                  />
                  {/* {squareIntigration.map((item, i) => {
                  if (item.type === "input") {
                    return (
                      <LocalInput
                        key={i}
                        placeholder={item.placeholder as string}
                        title={item.title}
                        value={item.value as string}
                        onChange={(val) => {
                          setSquareIntigration((prevState) => {
                            const newState = [...prevState];
                            newState[i].value = val;
                            return newState;
                          });
                        }}
                      />
                    );
                  } else {
                    return (
                      <LocalSwitch
                        key={i}
                        title={item.title}
                        description={item.description}
                        value={item.value as boolean}
                        onChange={(val) => {
                          setSquareIntigration((prevState) => {
                            const newState = [...prevState];
                            newState[i].value = val;
                            return newState;
                          });
                        }}
                      />
                    );
                  }
                })} */}
                </div>
                <div className="space-x-4 mt-8">
                  <Button disabled={connectionLoading} onClick={handleTestConnection} variant={"outline"} className="leading-none">
                    <CircleCheckBig />   {connectionLoading ? "Testing..." : "Test Connection"}
                  </Button>
                  {/* <Button className="bg-danger-bg text-danger-text border-danger-text/32 border hover:bg-danger-bg/50">
                    <Trash /> Disconnect
                  </Button> */}
                </div>
              </TabsContent>
              <TabsContent value="Security" className="space-y-4">
                <div className="flex flex-wrap gap-2 justify-between">
                  <div className="space-y-1">
                    <h1 className="text-[18px] font normal">Security</h1>
                    <p className="text-xs text-muted-foreground">
                      Keep your account secure with extra Authentication.
                    </p>
                  </div>
                  <Button onClick={handlePasswordUpdate} disabled={passwordLoading}>{passwordLoading && <Spinner className="text-black" />}Save Password</Button>
                </div>
                {/* <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <LocalSwitch
                  title="Two-Factor Authentication"
                  description="Add an extra layer of protection to your account."
                  value={securityInfo.twoFactorAuth}
                  onChange={(val) =>
                    setSecurityInfo((prevState) => ({
                      ...prevState,
                      twoFactorAuth: val,
                    }))
                  }
                /> */}

                {/* <LocalSwitch
                  title="Login Alert Notification"
                  description="Get notified when your account is accessed from a new device."
                  value={securityInfo.loginAlert}
                  onChange={(val) =>
                    setSecurityInfo((prevState) => ({
                      ...prevState,
                      loginAlert: val,
                    }))
                  }
                />
              </div> */}

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
        </Card>}
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

const LocalSwitch = ({
  value,
  title,
  description,
  onChange,
}: {
  title: string;
  description?: string | undefined;
  value: boolean;
  onChange: (val: boolean) => void;
}) => {
  return (
    <div className="flex justify-between items-center py-2 px-4 bg-[#1A1A1A] border border-border rounded-[10px]">
      <div className="flex items-center gap-4">
        <div className="space-y-0">
          <h1 className="text-sm text-[#E5E7EB]">{title}</h1>
          {description && (
            <p className="text-xs text-muted-foreground">{description}</p>
          )}
        </div>
      </div>

      <Switch className="mr-2" checked={value} onCheckedChange={onChange} />
    </div>
  );
};

const LocalInput = ({
  Icon,
  title,
  placeholder = "Type here...",
  value,
  onChange,
  disabled = false,
}: {
  placeholder: string;
  Icon?: ReactNode;
  title: string;
  value: string;
  onChange: (val: string) => void;
  disabled?: boolean;
}) => {
  return (
    <div className="space-y-1">
      <Label className="text-xs font-normal tracking-wide text-[#D1D1D1]">
        {title}
      </Label>
      <div
        className={`flex items-center gap-2 py-2 rounded-[12px] border border-[#3A3A3A] px-3 shadow-sm  bg-[#18181B]`}
      >
        {Icon}
        <Input
          disabled={disabled}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={`border-none bg-transparent p-0 text-md placeholder:text-gray-400 focus-visible:ring-0 focus-visible:ring-offset-0 dark:bg-transparent `}
        />
      </div>
    </div>
  );
};
