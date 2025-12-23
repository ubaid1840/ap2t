import { FileWarning } from "lucide-react"
import GradientIcon from "./icon-container"
import { Facebook, Apple,Github } from "lucide-react"


export default function SignUpForm(){
    return(
        <div className="flex flex-col">
            <div className="bg-[#CBFD0026] flex justify-center items-center p-1 w-full h-12 gap-2 rounded-[10px]">
                <FileWarning className="text-primary"/>
                <p className="text-xs text-muted">EVERY ACCOUNT NEEDS A CREDIT CARD ON FILE & TO SIGN WAIVER FORM</p>
            </div>

            <form className="bg-[#131313] ">
                
            </form>

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



        </div>
    )
}
