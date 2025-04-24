import Link from "next/link";
import { redirect } from "next/navigation";
import { auth, signOut } from "@/auth";
import ClientAuthComponent from "@/ui/client-auth-component";

export default async function ProfilePage() {
  const session = await auth();

  // This check is redundant with middleware, but it's a good practice
  if (!session?.user) {
    redirect("/auth/login");
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <div
        className="w-full max-w-md space-y-8 rounded-lg border border-gray-200 bg-white p-6 shadow-md dark:border-gray-700 dark:bg-gray-800">
        <div>
          <h1 className="text-center text-3xl font-bold">Profile</h1>
          <p className="mt-4 text-center text-gray-600 dark:text-gray-400">
            Welcome to your profile page!
          </p>
        </div>

        <ClientAuthComponent/>

        <div className="mt-8 space-y-4">
          <div className="rounded-md bg-gray-50 p-4 dark:bg-gray-700/30">
            <h2 className="text-lg font-medium">User Information</h2>
            <div className="mt-2">
              <p className="text-sm text-gray-600 dark:text-gray-400">Email:</p>
              <p className="font-medium">{session.user.email}</p>
            </div>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row">
            <Link
              href="/"
              className="rounded-md border border-gray-300 bg-white px-4 py-2 text-center text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
            >
              Back to Home
            </Link>

            <form
              action={async () => {
                "use server";
                await signOut({ redirectTo: "/" });
              }}
              className="flex-1"
            >
              <button
                type="submit"
                className="w-full rounded-md border border-transparent bg-red-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 dark:bg-red-700 dark:hover:bg-red-800"
              >
                Sign Out
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
