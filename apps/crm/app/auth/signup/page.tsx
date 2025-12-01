import { SignUpForm } from "@/modules/admin/processes"

export default function SignupPage() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full justify-center ">
        <SignUpForm />
      </div>
    </div>
  )
}
