import Link from "next/link";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

export default function LoginForm({ onClickSignup }: { onClickSignup: () => void }) {
    const handlesubmit = () => {
        console.log("submitting")
    }
    return (
        <form className="space-y-5">
            <div className="flex flex-col justify-center items-center gap-5">
                <Input required className="rounded" type="email" placeholder="Email" />
                <Input required className="rounded" type="password" placeholder="Password" />
                <Link href="#">Forgot Password?</Link>
            </div>

            <div className="flex flex-col gap-2">
                <Button type="submit" className="bg-primary text-secondary w-full"> Log In</Button>
                <Button onClick={() => onClickSignup()} className="bg-secondary text-white w-full">Sign up</Button>
            </div>




        </form>
    )
}