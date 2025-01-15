import { PaymentStatus } from '@/components/PaymentStatus'

export default async function Home({
                                     searchParams,
                                   }: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const resolvedSearchParams = await searchParams;

  return (
      <main className="flex h-screen flex-col items-center justify-center p-4 bg-white">
        <PaymentStatus searchParams={resolvedSearchParams} />
      </main>
  )
}

