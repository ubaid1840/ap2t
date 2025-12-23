import { Form } from "@base-ui/react";
import { Input } from "./ui/input";
import Link from "next/link";
import { Button } from "./ui/button";
import GradientIcon from "./icon-container";
import { Facebook,Apple, Twitter, Github } from "lucide-react";
export default function LoginForm(){
    const handlesubmit=()=>{
        console.log("submitting")
    }
return(
    <form  className="space-y-5">
        <div className="flex flex-col justify-center items-center gap-5">
        <Input className="rounded-[10px] h-12" type="email" placeholder="Email"/>
        <Input className="rounded-[10px] h-12" type="password" placeholder="Password"/>
        <Link href="#">Forgot Password?</Link>
        </div>

        <div className="flex flex-col gap-2">
            <Button type="submit" className="bg-primary text-secondary w-full"> Log In</Button>
            <Button className="bg-secondary text-white w-full">Sign up</Button>
        </div>

    <div className="flex items-center gap-4">
        <span className="h-px flex-1 bg-border" />
        <span className="text-xs text-muted-foreground uppercase">
          or continue with
        </span>
        <span className="h-px flex-1 bg-border" />
      </div>

        <div className="flex justify-center items-center gap-10">
            <button><GradientIcon><Facebook/></GradientIcon></button>
            <button><GradientIcon><Apple/></GradientIcon></button>
            <button><GradientIcon><Github/></GradientIcon></button>
        </div>


        
    </form>
)
}