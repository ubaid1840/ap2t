import { Card, CardContent } from "@/components/ui/card"
import { Calendar, Clock, Users } from "lucide-react"

export default function Page() {
    return (
        <div className="flex flex-col gap-30">
            <section className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 sm:py-2 ">
                <div className="relative mt-40 flex flex-col items-center bg-[#090909]">

                    {/* blurry blob */}
                    <div className="absolute top-0 left-30% bg-primary h-60 w-50 rounded-full blur-[220px] z-0"></div>



                    <div className="z-10 gap-8 px-10 w-full flex flex-col items-center">
                        <div className="flex flex-col w-full items-center gap-4 Web/letter-spacing/0">
                            <h1 className="text-5xl ">Camps & Clinics</h1>
                            <p className="text-sm text-muted">
                                Enhance your reaction time, coordination, and move
                            </p>
                        </div>

                        <img
                            src="./contact.jpg"
                            alt=""
                            className="w-full h-80 object-fit rounded"
                        />
                    </div>
                </div>
            </section>
            <section className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 sm:py-2 ">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
                    {campsData.map((camp, i) => {
                        return (
                            <Card key={i} className="bg-[#131313] rounded-[6px]">
                                <CardContent className="space-y-3">
                                    <h1 className="text-xl font-semibold">{camp.title}</h1>
                                    <div className="flex items-center gap-2"><span className="text-primary">{camp.date.icon}</span> <span className="text-sm text-muted">{camp.date.text}</span></div>
                                    <div className="flex items-center gap-2"><span className="text-primary">{camp.time.icon}</span>  <span className="text-sm text-muted">{camp.time.text}</span></div>
                                    <div className="flex items-center gap-2"><span className="text-primary">{camp.ages.icon}</span>  <span className="text-sm text-muted">{camp.ages.text}</span></div>
                                    <div className="flex items-center gap-2"><span className="text-primary">{camp.ages.icon}</span>  <span className="text-sm text-muted">{camp.ages.text}</span></div>
                                    <h1 className="text-primary text-xl font-semibold">{camp.priceDuration}</h1>
                                    <p className="text-sm text-muted">{camp.description}</p>
                                    <h1>What's included:</h1>
                                    <ul className="list-disc space-y-3 pl-5 marker:text-primary text-sm text-muted ">

                                        {camp.WhatsIncluded.map((offer, i) => {
                                            return (

                                                <li key={i}>{offer}</li>


                                            )
                                        })}</ul>




                                </CardContent>
                            </Card>
                        )
                    })}
                </div>
            </section>
        </div>

    )
}

const campsData = [{
    title: "Winter Break Camp",
    date: {
        icon: <Calendar />,
        text: "9:00 AM - 3:00 PM"
    },
    time: {
        icon: <Clock />,
        text: "9:00 AM - 3:00 PM"
    },
    ages: {
        icon: <Users />,
        text: "Ages 7-16"
    },
    priceDuration: "$160 (4 days)",
    description: "Full day intensive training camp during winter break, Focus on technical skills, small-side games,and fitness",
    WhatsIncluded: ["4 full days of training", "Technical skill development", "Imall-sided games",
        "lunch break included (bring lunch)", "Indoor facility"]


},


{
    title: "Winter Break Camp",
    date: {
        icon: <Calendar />,
        text: "9:00 AM - 3:00 PM"
    },
    time: {
        icon: <Clock />,
        text: "9:00 AM - 3:00 PM"
    },
    ages: {
        icon: <Users />,
        text: "Ages 7-16"
    },
    priceDuration: "$160 (4 days)",
    description: "Full day intensive training camp during winter break, Focus on technical skills, small-side games,and fitness",
    WhatsIncluded: ["4 full days of training", "Technical skill development", "Imall-sided games",
        "lunch break included (bring lunch)", "Indoor facility"]


},
{
    title: "Winter Break Camp",
    date: {
        icon: <Calendar />,
        text: "9:00 AM - 3:00 PM"
    },
    time: {
        icon: <Clock />,
        text: "9:00 AM - 3:00 PM"
    },
    ages: {
        icon: <Users />,
        text: "Ages 7-16"
    },
    priceDuration: "$160 (4 days)",
    description: "Full day intensive training camp during winter break, Focus on technical skills, small-side games,and fitness",
    WhatsIncluded: ["4 full days of training", "Technical skill development", "Imall-sided games",
        "lunch break included (bring lunch)", "Indoor facility"]


},
{
    title: "Winter Break Camp",
    date: {
        icon: <Calendar />,
        text: "9:00 AM - 3:00 PM"
    },
    time: {
        icon: <Clock />,
        text: "9:00 AM - 3:00 PM"
    },
    ages: {
        icon: <Users />,
        text: "Ages 7-16"
    },
    priceDuration: "$160 (4 days)",
    description: "Full day intensive training camp during winter break, Focus on technical skills, small-side games,and fitness",
    WhatsIncluded: ["4 full days of training", "Technical skill development", "Imall-sided games",
        "lunch break included (bring lunch)", "Indoor facility"]


},
{
    title: "Winter Break Camp",
    date: {
        icon: <Calendar />,
        text: "9:00 AM - 3:00 PM"
    },
    time: {
        icon: <Clock />,
        text: "9:00 AM - 3:00 PM"
    },
    ages: {
        icon: <Users />,
        text: "Ages 7-16"
    },
    priceDuration: "$160 (4 days)",
    description: "Full day intensive training camp during winter break, Focus on technical skills, small-side games,and fitness",
    WhatsIncluded: ["4 full days of training", "Technical skill development", "Imall-sided games",
        "lunch break included (bring lunch)", "Indoor facility"]


},
]