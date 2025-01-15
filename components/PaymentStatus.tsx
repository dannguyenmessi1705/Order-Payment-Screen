import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle, CheckCircle } from 'lucide-react'

interface PaymentStatusProps {
  searchParams: { [key: string]: string | string[] | undefined }
}

interface PaymentInfo {
  errorCode: string;
  merchantCode: string;
  orderId: string;
  otherInfo: string;
  transAmount: string;
  transactionStatus: string;
  signature: string;
}

const requiredParams: (keyof PaymentInfo)[] = ['errorCode', 'merchantCode', 'orderId', 'transAmount', 'transactionStatus'];

export function PaymentStatus({ searchParams }: PaymentStatusProps) {
  const paymentInfo: Partial<PaymentInfo> = {
    errorCode: searchParams.errorCode as string,
    merchantCode: searchParams.merchantCode as string,
    orderId: searchParams.orderId as string,
    otherInfo: searchParams.otherInfo as string,
    transAmount: searchParams.transAmount as string,
    transactionStatus: searchParams.transactionStatus as string,
    signature: searchParams.signature as string,
  };

  const missingParams = requiredParams.filter(param => !paymentInfo[param]);

  if (missingParams.length > 0) {
    return (
        <Card className="w-full max-w-2xl shadow-2xl transition-all duration-300 hover:shadow-3xl">
          <CardHeader className="bg-red-500 text-white">
            <CardTitle className="text-3xl sm:text-4xl flex items-center">
              <AlertCircle className="mr-2 h-8 w-8 sm:h-10 sm:w-10" />
              Lỗi
            </CardTitle>
            <CardDescription className="text-white text-xl sm:text-2xl">
              Thiếu thông tin cần thiết
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <p className="text-xl sm:text-2xl text-gray-700 mb-4">
              Không thể xử lý yêu cầu do thiếu các tham số sau:
            </p>
            <p className="text-lg sm:text-xl text-red-600 font-semibold">
              {missingParams.join(', ')}
            </p>
          </CardContent>
        </Card>
    )
  }

  const isSuccess = paymentInfo.transactionStatus === process.env.SUCCESS_CODE;

  const cardStyle = isSuccess
      ? "bg-gradient-to-r from-green-400 to-green-600 text-white"
      : "bg-gradient-to-r from-red-400 to-red-600 text-white";

  return (
      <Card className="w-full max-w-2xl shadow-2xl transition-all duration-300 hover:shadow-3xl">
        <CardHeader className={cardStyle}>
          <CardTitle className="text-3xl sm:text-4xl flex items-center">
            {isSuccess ? <CheckCircle className="mr-2 h-8 w-8 sm:h-10 sm:w-10" /> : <AlertCircle className="mr-2 h-8 w-8 sm:h-10 sm:w-10" />}
            {isSuccess ? 'Thanh toán thành công' : 'Thanh toán thất bại'}
          </CardTitle>
          <CardDescription className="text-white text-xl sm:text-2xl">
            {isSuccess ? 'Cảm ơn quý khách' : 'Vui lòng thử lại'}
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6 space-y-4">
          <p className="text-2xl sm:text-3xl text-gray-700">
            {isSuccess ? 'Quý khách đã thanh toán thành công' : 'Thanh toán thất bại'}
          </p>
          <p className="text-xl sm:text-2xl text-gray-600">
            Đơn hàng: <span className="font-bold">{paymentInfo.orderId}</span>
          </p>
          <p className="text-xl sm:text-2xl text-gray-600">
            Số tiền: <span className="font-bold">{parseInt(paymentInfo.transAmount || '0').toLocaleString('vi-VN')} VND</span>
          </p>
          <div className="mt-6 text-lg sm:text-xl text-gray-500 space-y-2">
            <p>Mã giao dịch: <span className="font-semibold">{paymentInfo.orderId}</span></p>
            <p>Mã lỗi: <span className="font-semibold">{paymentInfo.errorCode}</span></p>
          </div>
        </CardContent>
      </Card>
  )
}

