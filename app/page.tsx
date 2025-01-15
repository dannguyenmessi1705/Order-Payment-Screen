import { PaymentStatus } from "@/components/PaymentStatus"

export default function Home({
                               searchParams,
                             }: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  return (
      <main className="flex min-h-screen flex-col items-center justify-center p-4 sm:p-8 bg-gradient-to-br from-gray-100 to-gray-200">
        <PaymentStatus searchParams={searchParams} />
      </main>
  )
}