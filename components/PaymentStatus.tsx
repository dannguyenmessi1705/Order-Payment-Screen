import Image from 'next/image'


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
  errMsg: string;
  errType: string;
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
    errMsg: searchParams.errMsg as string,
    errType: searchParams.errType as string,
  };

  const missingParams = requiredParams.filter(param => !paymentInfo[param]);

  if (missingParams.length > 0) {
    return (
        <div className="w-full mx-auto bg-white h-screen flex flex-col">
          <header className="flex justify-between items-center p-3 border-b">
            <Image
                src="/VTM.png"
                alt="Viettel Money"
                width={120}
                height={40}
            />
          </header>

          <main className="flex-1 flex flex-col items-center px-auto lg:mx-96 pt-8">
            <div className="w-48 h-48 mb-6">
              <Image
                  src="/Fail.jpg"
                  alt="Error Illustration"
                  width={200}
                  height={200}
                  priority
              />
            </div>
            <h1 className="text-red-500 text-2xl font-semibold mb-2">
              Có lỗi xảy ra
            </h1>
            <p className="text-gray-500 mb-4 text-center">
              Thiếu các tham số: {missingParams.join(', ')}
            </p>
          </main>
        </div>
    );
  }

  const isSuccess = paymentInfo.transactionStatus === process.env.SUCCESS_CODE;
  const amount = parseInt(paymentInfo.transAmount ?? '0').toLocaleString('vi-VN');
  let customMessage = paymentInfo.errMsg ?? "";
  const errorType = paymentInfo.errType ?? "";
  if (!customMessage) {
    if (errorType === process.env.OTP_ERROR_CODE) {
      customMessage = "Giao dịch thất bại do khách hàng nhập sai OTP quá số lần quy định";
    } else if (errorType === process.env.CANCEL_TRANSACTION_CODE) {
      customMessage = "Bạn đã hủy giao dịch thành công. Bạn có thể tiếp tục mua sắm và thực hiện lại giao dịch";
    }
  }

  return (
      <div className="w-full mx-auto bg-white h-screen flex flex-col">
        <header className="flex justify-between items-center p-3 border-b">
          <Image
              src="/VTM.png"
              alt="Viettel Money"
              width={120}
              height={40}
          />
        </header>

        <main className="flex-1 flex flex-col px-auto lg:mx-96">
          <div className="text-center pt-8">
            <div className="w-48 h-48 mx-auto mb-6">
              <Image
                  src={isSuccess ? "/Success.jpg" : "/Fail.jpg"}
                  alt={isSuccess ? "Success Illustration" : "Error Illustration"}
                  width={200}
                  height={200}
                  priority
              />
            </div>
            <h1 className="text-2xl font-semibold mb-4">
              {isSuccess ? 'Thanh toán thành công' : 'Thanh toán thất bại'}
            </h1>
            {isSuccess ? (
                <p className="text-4xl font-bold mb-8">
                  {amount}đ
                </p>
            ) : (
                <p className="text-xl mb-8 text-gray-500">
                  {customMessage}
                </p>
            )}

            <div className="space-y-4 text-left border-t border-b py-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-500">Số tiền thanh toán</span>
                <span className="font-medium">{amount}đ</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-500">Mã đơn hàng</span>
                <span className="font-medium">{paymentInfo.orderId}</span>
              </div>
            </div>
          </div>
        </main>
      </div>
  );
}

