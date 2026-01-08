import { Button } from "./ui/button";
import { Card, CardContent, CardHeader } from "./ui/card";
import { TabsList, TabsTrigger } from "./ui/tabs";


export function DailyCheckins(){
    return(<Card>
        <CardHeader>
            <div>
                <h1>Daily Check-ins</h1>
                <p>Track attendance patterns over time</p>
            </div>
            <TabsList>
                <TabsTrigger value="Today"><Button>Today</Button></TabsTrigger>
                <TabsTrigger value="Today"><Button>Weekly</Button></TabsTrigger>
                <TabsTrigger value="Today"><Button>Monthly</Button></TabsTrigger>
            </TabsList>
        </CardHeader>
        <CardContent>
            {/* Bar chart with vertical axes true */}
        </CardContent>
    </Card>)
}