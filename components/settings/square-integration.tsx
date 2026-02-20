import { CircleCheckBig } from "lucide-react";
import CardStatus from "../card-status";
import { Button } from "../ui/button";
import { TabsContent } from "../ui/tabs";
import { LocalInput, LocalSwitch } from "./button-and-switch";
import { memo, useState } from "react";
import { EncryptString } from "@/lib/functions";
import axios from "@/lib/axios";
import { SquareFieldKey, SquareIntegrationState, SquareMode } from "@/app/portal/admin/settings/page";


const SquareIntegration = ({ squareIntegration, setSquareIntegration }: { squareIntegration: SquareIntegrationState, setSquareIntegration: (val: any) => void }) => {

    const [connected, setConnected] = useState(false)

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


    return (
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
                            setSquareIntegration((prev: any) => ({
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
                        setSquareIntegration((prev: any) => ({
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
                <SquareTestingButton
                    mode={squareIntegration.mode} token={squareIntegration.credentials[squareIntegration.mode].apiKey} setConnected={setConnected} />
                {/* <Button className="bg-danger-bg text-danger-text border-danger-text/32 border hover:bg-danger-bg/50">
                    <Trash /> Disconnect
                  </Button> */}
            </div>
        </TabsContent>
    )
}



const SquareTestingButton = ({ mode, token, setConnected }: { mode: string, token: string, setConnected: (v: boolean) => void }) => {

    const [connectionLoading, setConnectionLoading] = useState(false)

    async function handleTestConnection(m: string, t: string) {

        if (!m || !t) return
        setConnectionLoading(true)
        const et = EncryptString(token)
        try {
            const query = `?mode=${m}&token=${et}`
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
        <Button disabled={connectionLoading} onClick={async () => {
            await handleTestConnection(mode, token)
        }} variant={"outline"} className="leading-none" >
            <CircleCheckBig />   {connectionLoading ? "Testing..." : "Test Connection"}
        </Button >
    )
}



export default memo(SquareIntegration) 